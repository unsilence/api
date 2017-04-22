const xl = require('excel4node');
const PassThrough = require('stream').PassThrough;

exports.middle = async (ctx, next) => {
// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');

// Create a reusable style
var style = wb.createStyle({
	font: {
		color: '#FF0800',
		size: 12
	},
	numberFormat: '$#,##0.00; ($#,##0.00); -'
});

// Set value of cell A1 to 100 as a number type styled with paramaters of style
ws.cell(1,1).number(100).style(style);

// Set value of cell B1 to 300 as a number type styled with paramaters of style
ws.cell(1,2).number(200).style(style);

// Set value of cell C1 to a formula styled with paramaters of style
ws.cell(1,3).formula('A1 + B1').style(style);

// Set value of cell A2 to 'string' styled with paramaters of style
ws.cell(2,1).string('string').style(style);
ws.addImage({
    path: '/root/im-api/text.jpg',
    type: 'picture',
    position: {
        type: 'twoCellAnchor',
        from: {
            col: 1,
            colOff: 0,
            row: 10,
            rowOff: 0
        },
        to: {
            col: 4,
            colOff: 0,
            row: 13,
            rowOff: 0
        }
    }
});
// Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
ws.cell(3,1).bool(true).style(style).style({font: {size: 14}});
  let n = await  wb.writeToBuffer()
  ctx.body = n
  ctx.type = 'application/vnd.ms-excel';
  ctx.set('Content-disposition','attachment;filename=abc.xlsx');
  console.log('return ...')
}
