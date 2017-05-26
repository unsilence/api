var model = require('../model');
var request = require('request');
var auth = require('../auth');
var should = require('should');

var _ = require( 'underscore');

const colors = require('colors');
colors.setTheme({silly: 'rainbow',input: 'grey',verbose: 'cyan',prompt: 'red',
    info: 'green',data: 'blue',help: 'cyan',warn: 'yellow',debug: 'magenta',error: 'red'});

var serverPath = 'http://172.60.1.216:8899';

let colls = ['Brand','Center','City','Currency','Warehouse',
    'Pay','Customer','Contract','Receive',
    'Component','Product','Productraw','Proposal','Purchase',
    'Input','Output','Stock',
    'Question'
];
let buyColls =['Component','Product','Productraw','Proposal','Purchase','Brand'];
let accColls =['Pay','Customer','Contract','Receive'];
let warColls =['Input','Output','Stock'];
let cusColls =['Question'];
let opeColls;

var phone,token, code;
describe('--auth登录接口', () => {
    describe('#get_token()', () =>{
        it('获取24个字符token值',  async () =>{
            let res = await requestServer('/auth/get_token');
            console.info("-------get_token".info,res)
            res.should.match(/{"status":"success","token":"\S{24}/);
            token = JSON.parse(res).token;
        });
    });
    describe('#get_code()', () =>{
        it('获取4位数字的手机验证码 ',  async () =>{
            let body = {phone: '18910119323'};
            let res = await requestServer('/auth/get_code', token, body );
            console.log("-------get_code".info,res)
            res.should.match(/"code":"\d{4}"/);
            code = JSON.parse(res).code;
        });
    });
    describe('#login()', () =>{
        it('登录返回用户信息',  async () =>{
            let body = {phone: '18910119323',code: code};
            let res = await requestServer('/auth/login', token, body );
            let role = JSON.parse(res).data.item.role;
            switch (role){
                case "buyer":
                case "buyer_manager":
                case "designer":
                    opeColls = buyColls;
                    break;
                case "accountant":
                case "accountant_manager":
                    opeColls = accColls;
                    break;
                case "customer":
                case "customer_manager":
                    opeColls = cusColls;
                    break;
                case "warehouse":
                case "warehouse_manager":
                    opeColls = warColls;
                    break;
                case "super":
                    opeColls = colls;
                    break;
            }
            console.log("-------login,你的角色是".info,role)
            res.should.match(/{"status":"success"/);
        });
    });
});

//采购权限
describe('--model数据接口', () => {
    let id,cnum;
    for(let col of colls){
        describe('#fetch_'+col, () => {
            it('获取'+col+'表数据', async () => {
                let body = {};
                let res = await requestServer('/'+col+'/fetch', token, body);
                let resData = JSON.parse(res);
                if(resData.data.list.length>0){
                    id = JSON.parse(res).data.list[0]._id;
                    cnum = JSON.parse(res).data.list[0].cnum;
                }else{
                    id,cnum="";
                }
                console.log(("-------fetch_"+col+"成功").info)
                res.should.match(/{"status":"success"/);
            });
        });

        describe('#addItem_'+col, () => {
            it(col+'添加一条数据', async () => {
                let body = {item:{name:"测试addItem"}};
                let res = await requestServer('/'+col+'/addItem', token, body);
                if(_.contains(opeColls, col)){
                    res.should.match(/{"status":"success"/);
                    id = JSON.parse(res).data.item._id;
                    cnum = JSON.parse(res).data.item.cnum;
                    console.log(("-------addItem_"+col+"成功").info)
                }else{
                    res.should.match(/{"status":"wrong"/);
                    console.log(("-------addItem_"+col+"失败").error,res)
                }
            });
        });

        describe('#getById_'+col, () => {
            it('通过id获取'+col+'一条数据', async () => {
                let body = {id: id};
                let res = await requestServer('/'+col+'/getById', token, body);
                res.should.match(/{"status":"success"/);
                console.log(("-------getById_"+col+"成功").info)
            });
        });
        describe('#getByNum_'+col, () => {
            it('通过cnum获取'+col+'一条数据', async () => {
                let body = {cnum: cnum};
                let res = await requestServer('/'+col+'/getByNum', token, body);
                res.should.match(/{"status":"success"/);
                console.log(("-------getByNum_"+col+"成功").info)
            });
        });


        describe('#updateById_'+col, () => {
            it('通过id更新'+col+'一条数据', async () => {
                let body = {id: id, item:{name: '修改数据id'}};
                let res = await requestServer('/'+col+'/updateById', token, body);
                if(_.contains(opeColls, col)){
                    res.should.match(/{"status":"success"/);
                    console.log(("-------updateById_"+col+"成功").info)
                }else{
                    res.should.match(/{"status":"wrong"/);
                    console.log(("-------updateById_"+col+"失败").error,res)
                }
            });
        });
        describe('#updateByNum_'+col, () => {
            it('通过cnum更新'+col+'一条数据', async () => {
                let body = {cnum: cnum, item:{name: '修改数据cnum'}};
                let res = await requestServer('/'+col+'/updateByNum', token, body);
                if(_.contains(opeColls, col)){
                    res.should.match(/{"status":"success"/);
                    console.log(("-------updateByNum_"+col+"成功").info)
                }else{
                    res.should.match(/{"status":"wrong"/);
                    console.log(("-------updateByNum_"+col+"失败").error,res)
                }
            });
        });
        describe('#deleteById_'+col, () => {
            it('通过id删除'+col+'一条数据', async () => {
                let body = {id: id};
                let res = await requestServer('/'+col+'/deleteById', token, body);
                if(_.contains(opeColls, col)){
                    res.should.match(/{"status":"success"/);
                    console.log(("-------deleteById_"+col+"成功").info)
                }else{
                    res.should.match(/{"status":"wrong"/);
                    console.log(("-------deleteById_"+col+"失败").error,res)
                }
            });
        });
        describe('#deleteByNum_'+col, () => {
            it('通过cnum删除'+col+'一条数据', async () => {
                let body = {cnum: cnum};
                let res = await requestServer('/'+col+'/deleteByNum', token, body);
                if(_.contains(opeColls, col)){
                    res.should.match(/{"status":"success"/);
                    console.log(("-------deleteByNum_"+col+"成功").info)
                }else{
                    res.should.match(/{"status":"wrong"/);
                    console.log(("-------deleteByNum_"+col+"失败").error,res)
                }
            });
        });


    }


});


function requestServer(url, token, body){
    return new Promise(function(resolv, reject) {
        url = token ? serverPath+url+"?token="+token : serverPath+url;
        request.post({ uri: url, body: JSON.stringify(body) }, function (error, response, body) {
            resolv(body);
        });
    })

}


