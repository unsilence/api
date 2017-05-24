var model = require('../model');
var request = require('request');
var auth = require('../auth');
var should = require('should');

var serverPath = 'http://172.60.1.216:8899';

var token, code;
describe('--auth登录接口', () => {
    describe('#get_token()', () =>{
        it('获取24个字符token值',  async () =>{
            let res = await requestServer('/auth/get_token');
            console.info("-------get_token",res)
            res.should.match(/{"status":"success","token":"\S{24}/);
            token = JSON.parse(res).token;

        });
    });
    describe('#get_code()', () =>{
        it('获取4位数字的手机验证码 ',  async () =>{
            let body = {phone: '18910119323'};
            let res = await requestServer('/auth/get_code', token, body );
            console.log("-------get_code",res)
            res.should.match(/"code":"\d{4}"/);
            code = JSON.parse(res).code;
        });
    });
    describe('#login()', () =>{
        it('登录返回用户信息',  async () =>{
            let body = {phone: '18910119323',code: code};
            let res = await requestServer('/auth/login', token, body );
            console.log("-------login",res)
            res.should.match(/{"status":"success"/);
        });
    });
});

//super超级用户权限
describe('--model数据接口', () => {
    let colls = ['Brand','Center','City'];
    let id,cnum;
    for(let col of colls){
        describe('#fetch_'+col, () => {
            it('获取'+col+'表数据', async () => {
                let body = {};
                let res = await requestServer('/'+col+'/fetch', token, body);
                console.log("-------fetch_"+col,res)
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#addItem_'+col, () => {
            it(col+'添加一条数据', async () => {
                let body = {item:{name:"测试addItem"}};
                let res = await requestServer('/'+col+'/addItem', token, body);
                console.log("-------addItem_"+col,res)
                id = JSON.parse(res).data.item._id;
                cnum = JSON.parse(res).data.item.cnum;
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#getById_'+col, () => {
            it('通过id获取'+col+'一条数据', async () => {
                let body = {id: id};
                let res = await requestServer('/'+col+'/getById', token, body);
                console.log("-------getById_"+col,res)
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#getByNum_'+col, () => {
            it('通过cnum获取'+col+'一条数据', async () => {
                let body = {cnum: cnum};
                let res = await requestServer('/'+col+'/getByNum', token, body);
                console.log("-------getByNum_"+col,res)
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#updateById_'+col, () => {
            it('通过id更新'+col+'一条数据', async () => {
                let body = {id: id, item:{name: '修改数据id'}};
                let res = await requestServer('/'+col+'/updateById', token, body);
                console.log("-------updateById_"+col,res)
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#updateByNum_'+col, () => {
            it('通过cnum更新'+col+'一条数据', async () => {
                let body = {cnum: cnum, item:{name: '修改数据cnum'}};
                let res = await requestServer('/'+col+'/updateByNum', token, body);
                console.log("-------updateByNum_"+col,res)
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#deleteById_'+col, () => {
            it('通过id删除'+col+'一条数据', async () => {
                let body = {id: id};
                let res = await requestServer('/'+col+'/deleteById', token, body);
                console.log("-------deleteById_"+col,res)
                res.should.match(/{"status":"success"/);
            });
        });
        describe('#deleteByNum_'+col, () => {
            it('通过cnum删除'+col+'一条数据', async () => {
                let body = {cnum: cnum};
                let res = await requestServer('/'+col+'/deleteByNum', token, body);
                console.log("-------deleteByNum_"+col,res)
                res.should.match(/{"status":"success"/);
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


