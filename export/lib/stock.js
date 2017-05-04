const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;
const model = require('../../model')
const sharp = require('sharp')
const BufferHelper = require('bufferhelper');


const cols = [
{key:'cnum',name:'现货编号',width:20}
,{key:'pic',name:'图片',width:20}
,{key:'warehouse_num',name:'展厅/库房',width:20}
,{key:'product_num',name:'商品编号',width:20}
,{key:'product_supplier',name:'品牌',width:20}
,{key:'product_model',name:'型号',width:20}
,{key:'product_name',name:'名字',width:20}
,{key:'componnents',name:'部件',width:20}
,{key:'status_sale',name:'销售属性',width:20}
,{key:'status',name:'库房属性',width:20}]
const names = {sold:'已售',waitout:'未出库',out:'已出库',may:'未销售',waitin:'等待入库'}

const stream2buffer = (readStream) => {
	return new Promise((resv,rejc)=>{
		let buffers = [];
		readStream.on("data",chunk => buffers.push(chunk) )
		readStream.on("end", ()=>{
			resv(Buffer.concat(buffers))
		})
	})
}
const buffer2resize = (buf,nname)=>{
	return new Promise((resv,rejc)=>{
	 	sharp(buf)
		.resize(300, 150)
		.toFile(nname, (err, info) => {
			console.log('info',{err,info})
			resv(info)
		});
	})
}
exports.middle = async (ctx, next) => {
	let item = await model.Session.getById({_id:ctx.query.token})
	let sessionData
	if(item){
			sessionData = Object.assign({},JSON.parse(item.data))
			ctx.body = {status:'success',data:{item:sessionData.user}}
	}else{
			ctx.body = {status:'wrong',msg:'请使用/auth/login接口登录'}
			return
	}

	var wb = new xl.Workbook();
	var ws = wb.addWorksheet('现货');
	var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
	let flt
	if(sessionData.user.role == 'warehouse_manager'){
		flt ={}
	}else {
		flt = {ownByUser:sessionData.user.cnum}
	}
	let stocks = await model.Stock.fetch(flt,'-_id',10000*10000,0)  //filter,orderBy,limit,startPos
	console.log('stocks.length',stocks.list.length)
	let line = 1 ;
	let col = 1;
	for(let d of cols){
			ws.column(col).setWidth(d.width);
			ws.cell(line,col++).string(d.name).style(style)
	}
	for (let st of stocks.list){
		ws.row(++line).setHeight(50);
		col=1
		for(let d of cols){
				let v = names[st[d.key]]||st[d.key]
				ws.cell(line,col++).string(v).style(style)
		}
		if(st.pic.length == 32){
			try{
				let readStream = await model.fileRead(st.pic)
				let buf = await stream2buffer(readStream)
				let nname = '/tmp/100_'+st.pic+'.png'
				await buffer2resize(buf,nname)
				console.log('save',nname)
				ws.addImage({
						path: nname,
						type: 'picture',
						position: {
								type: 'twoCellAnchor',
								from: {col: 2,colOff: 0,row: line,rowOff: 0},
								to: {col: 3,colOff: 0,row: line+1,rowOff: 0}
						}
				});
				console.log('pic add ',st.cnum,'ok')
			}catch(e){
				console.log(e)
			}
		}

	}
  ctx.body = await  wb.writeToBuffer()
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=xianhuo.xlsx');


}
