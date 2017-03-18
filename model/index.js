"use strict"
const fs = require('fs')
const path = require('path')

function walk(p) {
    var dirList = fs.readdirSync(p);
    dirList.forEach(function(item) {
        var _p = path.join(p, item)
        if (fs.statSync(_p).isDirectory()) {
            walk(_p);
        } else {
            fileList.push(_p);
        }
    });
}
let fileList = []
walk(path.join(__dirname, 'lib'))
let _dict = {}
let namelist = fileList.map(v=>path.basename(v))
    .filter(v=>!v.startsWith('_')).map(v=>{
    var d = require('./lib/'+v)
    console.log('model::',d.modelName,d)
    exports[d.modelName] = d
})

let _db
exports.getDb = ()=>{
    return _db
}

const mongo = require('mongodb');

let MongoClient = _dict.MongoClient = mongo.MongoClient

exports.connect = mstr => {
    MongoClient.connect(mstr,function(err,db){
        _db = db
        console.log('connect ok',mstr,err)
    })
}
const Grid = require('gridfs-stream');
exports.fileSave = file =>{
    console.log("model:: fileSave",file)
    return new Promise((resolve, reject)=>{
        var gfs = Grid(_db,mongo);
        let filename = file.filename+'____'+Date.now()
        var writestream = gfs.createWriteStream({filename:filename});
        let r = fs.createReadStream(file.path)
        .pipe(writestream)
        .on("finish",()=>{
          console.log('model::fileSave finish')
          gfs.files.find({filename:filename}).toArray(function (err, files) {
            console.log({err:err,files:files});
            if(files.length === 0){
              console.log("some wrong")
              reject()
            }else{
                resolve(files[0].md5)
            }
          })
        })
    }).catch(e=>console.log(e))
}
exports.fileRead = strmd5 =>{
    console.log("model:: fileRead ",strmd5)
    var gfs = Grid(_db,mongo);
    let opt ={md5:strmd5}
    return new Promise((resolve,reject) => {
        gfs.findOne(opt, function (err, file) {
            console.log(file)
          let readstream = gfs.createReadStream({_id:file._id})
          resolve(readstream)
        })
    }).catch(e=>console.log(e))
}
