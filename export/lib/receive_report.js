const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;
const model = require('../../model')
const sharp = require('sharp')
const BufferHelper = require('bufferhelper');


const cols = [
{key:'cnum',name:'编号',width:20}
,{key:'name',name:'名字',width:20}
,{key:'address',name:'地址',width:20}
,{key:'center_num',name:'设计中心',width:20}
,{key:'customer_manager',name:'客户经理',width:20}
,{key:'designer',name:'设计师',width:20}
,{key:'itype',name:'款项内容',width:20}
,{key:'money',name:'收款金额',width:20}
,{key:'receive_at',name:'收款时间',width:20}]


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
	var ws = wb.addWorksheet('收款报表');
	var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
	let flt
	if(sessionData.user.role == 'accountant_manager'){
		flt ={}
	}else {
		flt = {ownByUser:sessionData.user.cnum}
	}

	let recRes = await model.Receive.fetch(flt,'-_id',10000*10000,0)  //filter,orderBy,limit,startPos    filter:filter,limit:1000000,startPos:0
	let cusRes = await model.Customer.fetch(flt,'-_id',8888*8888,0) //  filter:filter,startPos:0,limit:8888
	let cusArr=[]
	recRes.list.map(v=>{
			let cust={}
			cusRes.list.map(d => {
				if(d.cnum==v.customer_num){
					cust=Object.assign(cust,
						{name:d.name,address:d.address,customer_num:v.customer_num,center_num:d.center_num,customer_manager:d.customer_manager,designer:d.designer
						},v)
					cusArr.push(cust);
				}
			})
	})
	for(let i=0;i<cusArr.length;i++){
		cusArr[i].index=i
	}
	recRes.list=cusArr
	console.log('recRes.length',recRes.list.length)

	let line = 1 ;
	let col = 1;
	for(let d of cols){
			ws.column(col).setWidth(d.width);
			ws.cell(line,col++).string(d.name).style(style)
	}
	for (let st of recRes.list){
		ws.row(++line).setHeight(50);
		col=1
		for(let d of cols){
				let v = st[d.key]
				ws.cell(line,col++).string(v).style(style)
		}

	}
  ctx.body = await  wb.writeToBuffer()
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=shoukuan.xlsx');


}
