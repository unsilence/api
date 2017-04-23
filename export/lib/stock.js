const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;
const model = require('../../model')

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

exports.middle = async (ctx, next) => {
	var wb = new xl.Workbook();
	var ws = wb.addWorksheet('现货');
	var style = wb.createStyle({font: {color: '#000000',size: 12},numberFormat: '$#,##0.00; ($#,##0.00); -'});
	let stocks = await model.Stock.fetch({},'-_id',10000*10000,0)  //filter,orderBy,limit,startPos
	console.log('stocks.length',stocks.list.length)
	let line = 1 ;
	let col = 1;
	for(let d of cols){
			ws.column(col).setWidth(d.width);
			ws.cell(line,col++).string(d.name).style(style)
	}
	stocks.list.map(st=>{
		ws.row(++line).setHeight(50);
		col=1
		for(let d of cols){
				let v = names[st[d.key]]||st[d.key]
				ws.cell(line,col++).string(v).style(style)
		}
		if(line<10){
			ws.addImage({
			    path: '/root/im-api/text.jpg',
			    type: 'picture',
			    position: {
			        type: 'twoCellAnchor',
			        from: {col: 2,colOff: 0,row: line,rowOff: 0},
							to: {col: 3,colOff: 0,row: line+1,rowOff: 0}
			    }
			});
		}


	})
  ctx.body = await  wb.writeToBuffer()
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=xianhuo.xlsx');
}
