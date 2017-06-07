const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;
const model = require('../../model')
const sharp = require('sharp')
const BufferHelper = require('bufferhelper');


const cols = [
{key:'cnum',name:'编号',width:20}
,{key:'name',name:'名字',width:20}
,{key:'address',name:'地址',width:20}
,{key:'brand_user1',name:'品牌专员1（询价）',width:20}
,{key:'brand_user2',name:'品牌专员2（下单）',width:20}
,{key:'purchase_master',name:'采购经理',width:20}
,{key:'project_manager',name:'项目经理',width:20}
,{key:'project_master',name:'项目部经理',width:20}
,{key:'brand_num',name:'品牌',width:20}
,{key:'product_type',name:'业绩类型',width:20},
{key:'首期业绩',name:'业绩性质',width:20},
{key:'order_type',name:'订单类型',width:20},
{key:'money',name:'订单金额',width:20},
{key:'order_at',name:'下单时间',width:20},
{key:'integrate_num',name:'集成系数',width:20},
{key:'performance_money',name:'业绩金额',width:20}]


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
	var ws = wb.addWorksheet('业务报表2');
	var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
	let flt
	if(sessionData.user.role == 'accountant_manager'){
		flt ={}
	}else {
		flt = {ownByUser:sessionData.user.cnum}
	}
	// let stocks = await model.Stock.fetch(flt,'-_id',10000*10000,0)  //filter,orderBy,limit,startPos


  //国内的
    let purchasecnRes = await model.Purchasecn.fetch(flt,'-_id',10000*10000,0)
    let _filter={cnum:{$in:purchasecnRes.list.map(v=>v.customer_num)}}
	let cusRes = await model.Customer.fetch(_filter,'-_id',10000*10000,0)
    let cusArr=[]
    cusRes.list.map(d => {
        let cust={}
        purchasecnRes.list.map(v=>{
          if(d.cnum==v.customer_num){
              var cust={}
            cust=Object.assign({},
							{name:d.name,address:d.address,customer:d.cnum},v)
            cusArr.push(cust);
          }
        })
    })
    for(let i=0;i<cusArr.length;i++){
			cusArr[i].index=i
		}
   //国外的
   let purchaseRes = await model.Purchase.fetch(flt,'-_id',10000*10000,0)
   let _filter1={cnum:{$in:purchaseRes.list.map(v=>v.customer_num)}}
   let cus1Res = await model.Customer.fetch(_filter1,'-_id',10000*10000,0)
   let cusArr1=[]
   cus1Res.list.map(d => {
       let cust1={}
       purchaseRes.list.map(v=>{
         if(d.cnum==v.customer_num){
             var cust1={}
           cust1=Object.assign({},
            {name:d.name,address:d.address,customer:d.cnum},v)
           cusArr1.push(cust1);
         }
       })
   })
   for(let i=0;i<cusArr1.length;i++){
    cusArr1[i].index=i
   }
   purchaseRes.list = cusArr1

   purchasecnRes.list=cusArr
   let arr =  purchasecnRes.list.concat(purchaseRes.list);
   console.log('arrr',arr)

    purchaseRes.list=arr
	   //将国内国外的数据按照下单时间进行排序
   function quickSort(arr,name,snum){
          //如果数组<=1,则直接返回
          if(arr.length<=1){return arr;}
          var pivotIndex=Math.floor(arr.length/2);
          //找基准，并把基准从原数组删除
          var pivot=arr.splice(pivotIndex,1)[0];
          var middleNum=pivot[name];
          // 定义左右数组
          var left=[];
          var right=[];
          //比基准小的放在left，比基准大的放在right
          if(snum){
              for(var i=0;i<arr.length;i++){
                  if(arr[i][name]>middleNum){
                  left.push(arr[i]);
                  }else{
                  right.push(arr[i]);
                  }
              }
          }else{
              for(var i=0;i<arr.length;i++){
                  if(arr[i][name]<=middleNum){
                  left.push(arr[i]);
                  }else{
                  right.push(arr[i]);
                  }
              }
          }
          //递归,返回所需数组
          return quickSort(left,name,snum).concat([pivot],quickSort(right,name,snum));
  }
     purchaseRes.list = quickSort(arr,"order_at",true)
    console.log('purchaseRes======',purchaseRes)
	let line = 1 ;
	let col = 1;
	for(let d of cols){
			ws.column(col).setWidth(d.width);
			ws.cell(line,col++).string(d.name).style(style)
	}
	for (let st of purchaseRes.list){
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
