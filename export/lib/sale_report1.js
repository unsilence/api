const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;
const model = require('../../model')
const sharp = require('sharp')
const BufferHelper = require('bufferhelper');


const cols = [
{key:'cnum',name:'编号',width:20}
,{key:'name',name:'名字',width:20}
,{key:'address',name:'地址',width:20}
,{key:'channel_type',name:'业务渠道',width:20}
,{key:'channel_name',name:'渠道姓名',width:20}
,{key:'market_master',name:'客源/网销部主管',width:20}
,{key:'center_num',name:'部门',width:20}
,{key:'customer_manager',name:'客户经理',width:20}
,{key:'designer',name:'设计师',width:20}
,{key:'center_manager',name:'中心经理',width:20},
{key:'operator_master',name:'运营总监',width:20},
{key:'city_master',name:'城市总监',width:20},
{key:'itype',name:'业绩类型',width:20},
{key:'perItype',name:'业绩性质',width:20},
{key:'pkind',name:'订单类型',width:20},
{key:'money',name:'收款金额',width:20},
{key:'receive_at',name:'收款时间',width:20},
{key:'integrate_discount',name:'首期集成系数',width:20},
{key:'ag1money',name:'业绩金额',width:20}]

 var  getReciveRate = (_item) => {
    let aglrate = '---'
		if (_item.itype == "设计费") {
			   aglrate = 1
		} else if (_item.itype == '施工款') {
			if (parseFloat(_item.real_discount) >= 9.5) {
				aglrate = 1
			} else {
				aglrate = 0
			}
		} else if (_item.itype == '直采配饰款') {
			if (parseFloat(_item.ag_discount) / parseFloat(_item.standard_discount) >= 1) {
				aglrate = 1
			} else {
				aglrate = parseFloat(_item.ag_discount) / parseFloat(_item.standard_discount)
			}
		} else if (_item.itype == "配饰款") {
			aglrate = 0.9
		} else if (_item.itype == "主材款") {
			aglrate = 0.9
		}
	return aglrate
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
  var ws = wb.addWorksheet('业务报表1');
  var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
  let flt
  if(sessionData.user.role == 'accountant_manager'){
    flt ={}
  }else {
    flt = {ownByUser:sessionData.user.cnum}
  }
  // let stocks = await model.Stock.fetch(flt,'-_id',10000*10000,0)  //filter,orderBy,limit,startPos
    let recRes = await model.Receive.fetch(flt,'-_id',10000*10000,0)
    let cusRes = await model.Customer.fetch(flt,'-_id',10000*10000,0)
    let cusMap = {}
    cusRes.list.map(d=>cusMap[d.cnum]=d)
    recRes.list.map(d=>{
        let cus = cusMap[d.customer_num]||{}
        d.name = cus.name
        d.address = cus.address
        d.channel_name = cus.channel_name
        d.channel_type = cus.channel_type
        d.market_master = cus.market_master
        d.center_num = cus.center_num
        d.customer_manager = cus.customer_manager
        d.designer = cus.designer
        d.center_manager = cus.center_manager
        d.operator_master = cus.operator_master
        d.city_master = cus.city_master
        d.perItype = "首期业绩"
        d.pkind = " "
        d.rec_Rate = getReciveRate(d)
      })
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
       try{ws.cell(line,col++).string(v).style(style)}catch(err){console.log(err)}
    }


  }
  ctx.body = await  wb.writeToBuffer()
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=yewu1.xlsx');


}
