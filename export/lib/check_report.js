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
,{key:'order_type',name:'订单类型',width:20}
,{key:'product_type',name:'产品类型',width:20}
,{key:'contract_money',name:'订单金额',width:20}
,{key:'order_at',name:'下单时间',width:20}
,{key:'supplier_name',name:'供应商',width:20}
,{key:'brand_num',name:'品牌',width:20},
{key:'currency_num',name:'结算币种',width:20},
{key:'AntRate',name:'预估汇率',width:20},
{key:'SpayBatch',name:'实际应付供应商款项（原币）',width:20},
{key:'payOriginMoney',name:'已付供应商款项（原币）',width:20},
{key:'payChinaMoney',name:'已付供应商款项（人民币）',width:20},
{key:'noPay',name:'尚未支付供应商款项（原币）',width:20},
{key:'AntnoPay',name:'预估尚未支付供应商款项（人民币）',width:20},
{key:'profit',name:'毛利率',width:20}]

let  sum = dl=> dl.length > 1 ? dl.pop()+sum(dl) : dl[0]
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
  var ws = wb.addWorksheet('结算报表');
  var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
  let flt
  if(sessionData.user.role == 'accountant_manager'){
    flt ={}
  }else {
    flt = {ownByUser:sessionData.user.cnum}
  }

  // let stocks = await model.Stock.fetch(flt,'-_id',10000*10000,0) //filter,orderBy,limit,startPos

    let ordRes = await model.Purchase.fetch(
        flt,
        10000*10000,
        0
    )
    let _filter={cnum:{$in:ordRes.list.map(v=>v.customer_num)}}
    let cusRes = await model.Customer.fetch(
      _filter,
      66666*66666,
      0
    )
    _filter = {order_num:{$in:ordRes.list.map(d=>d.cnum)}}
    let payRes = await model.Pay.fetch(
       _filter,
        10000*10000,
        0
    )
    let cusArr=[]
    cusRes.list.map(d => {
        let cust={}
        ordRes.list.map(v=>{
          if(d.cnum==v.customer_num){
            cust=Object.assign(cust,{name:d.name,address:d.address,customer:d.cnum,center_num:d.center_num},v)
            cusArr.push(cust);
          }
        })
    })
    let payArr=[]
    let cmap = {'人民币':1,'欧元':7.5,'美元':6.5}
    payRes.list.map(p=>{
      let payObj={}
       cusArr.map(c=>{
         if(c.cnum==p.purchase_num){
           payObj=Object.assign({},c,
             {
              payType:p.itype,AntRate:cmap[p.itype],SpayBatch:p.origin_sum,
              payBatch:p.batch,payOriginMoney:sum(p.batch.map(b=>parseFloat(b.origin_money))).toFixed(2),
              payChinaMoney:sum(p.batch.map(b=>parseFloat(b.china_money))).toFixed(2),noPay:((p.origin_sum)- sum(p.batch.map(b=>parseFloat(b.origin_money)))).toFixed(2),
              AntnoPay:cmap[p.itype]*((p.origin_sum)- sum(p.batch.map(b=>parseFloat(b.origin_money)))).toFixed(2),
              profit:(parseFloat(c.money-p.origin_sum*cmap[p.itype])/c.money).toFixed(2)})
              payArr.push(payObj)
         }
       })
    })
    for(let i=0;i<payArr.length;i++){
      payArr[i].index=i
    }
   payRes.list=payArr

  console.log('payRes.length',payRes.list.length)
  let line = 1 ;
  let col = 1;
  for(let d of cols){
      ws.column(col).setWidth(d.width);
      ws.cell(line,col++).string(d.name).style(style)
  }
  for (let st of payRes.list){
    ws.row(++line).setHeight(50);
    col=1
    for(let d of cols){
        let v = st[d.key] 
        try{ws.cell(line,col++).string(v).style(style)}catch(err){console.log(err)}
    }


  }
  ctx.body = await  wb.writeToBuffer()
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=jiesuan.xlsx');


}
