const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;
const model = require('../../model')
const sharp = require('sharp')
const BufferHelper = require('bufferhelper');


const cols = [
{key:'cnum',name:'编号',width:20}
,{key:'name',name:'名字',width:20}
,{key:'address',name:'地址',width:20}
,{key:'buyer_info',name:'品牌专员1（询价）',width:20}
,{key:'buyer_order',name:'品牌专员2（下单）',width:20}
,{key:'buyer_master',name:'采购经理',width:20}
,{key:'project_master',name:'项目经理',width:20}
,{key:'depart_master',name:'项目部经理',width:20}
,{key:'brand',name:'品牌',width:20}
,{key:'product_type',name:'业绩类型',width:20},
{key:'首期业绩',name:'业绩性质',width:20},
{key:'order_type',name:'订单类型',width:20},
{key:'money',name:'订单金额',width:20},
{key:'order_at',name:'下单时间',width:20},
{key:'perItype',name:'集成系数',width:20},
{key:'ag1money',name:'业绩金额',width:20}]


exports.middle = async (ctx, next) => {
	let item = await model.Session.getById(ctx.query.token)
	let sessionData
	if(item){
			sessionData = Object.assign({},JSON.parse(item.data))
			ctx.body = {status:'success',data:{item:sessionData.user}}
	}else{
			ctx.body = {status:'wrong',msg:'请使用/auth/login接口登录'}
			return
	}

	var wb = new xl.Workbook();
	var ws = wb.addWorksheet('业务报表2');
	var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
	let flt
	if(sessionData.user.role == 'accountant_manager'){
		flt ={}
	}else {
		flt = {ownByUser:sessionData.user.cnum}
	}
	// let stocks = await model.Stock.fetch(flt,'-_id',10000*10000,0)  //filter,orderBy,limit,startPos

	let ordRes = await model.Order.fetch(flt,10000*10000,0)
	let _filter={cnum:{$in:ordRes.list.map(v=>v.customer_num)}}
	let cusRes = await model.Customer.fetch(_filter,10000*10000,0)
	let cusArr=[]
	cusRes.list.map(d => {
			let cust={}
			ordRes.list.map(v=>{
				if(d.cnum==v.customer_num){
					cust=Object.assign({},
						{name:d.name,address:d.address,customer:d.cnum},v)
					cusArr.push(cust);
				}
			})
	})
	for(let i=0;i<cusArr.length;i++){
		cusArr[i].index=i
	}
	ordRes.list=cusArr

	console.log('ordRes.length',ordRes.list.length)
	let line = 1 ;
	let col = 1;
	for(let d of cols){
			ws.column(col).setWidth(d.width);
			ws.cell(line,col++).string(d.name).style(style)
	}
	for (let st of ordRes.list){
		ws.row(++line).setHeight(50);
		col=1
		for(let d of cols){
				let v = st[d.key]
				try{ws.cell(line,col++).string(v).style(style)}catch(err){console.log(err)}
		}


	}
  ctx.body = await  wb.writeToBuffer()
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=yewu2.xlsx');


}
