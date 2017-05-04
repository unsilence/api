"use strict"
var path = require( 'path')
var moment = require( 'moment')
var {ObjectID} = require( 'mongodb')
var model = require( '../index')
var _ = require( 'underscore')

const keys = exports.keys  = {
    note:{type:String,default:''},
    qtext:{type:String,default:''},
    valid:{type: Boolean,default:true},
    updateAt:{type:Date,default: Date.now()},
    createAt:{type:Date,default: Date.now()},
    ownByUser:{type:String,default:''},
    lastModifyByUser:{type:String,default:''}
}

const typeEnsure = (tp,v)=>{
    // console.log('typeEnsure enter',{tp,v})
    if(_.isFunction(tp['type'])){
        return tp['type'](v||tp['default'])
    }else if(_.isArray(tp['type'])){
        console.log('enter array',{tp,v})
        v = v || []
        return v.map(i=>typeEnsure(tp['type'][0],i))
    }else if(_.isObject(tp['type'])){
        console.log('enter object ',{tp,v})
        let _o={}
        _.keys(tp['type']).map(k=>{
            _o[k] = typeEnsure(tp['type'][k],v[k])
        })
		// console.log('new object',_o)
		return _o
    }else if(_.isFunction(tp)){
        return tp(v)
    }else if(_.isArray(tp)){
        // console.log('enter array 2',{tp,v})
        v = v || []
        return v.map(i=>typeEnsure(tp[0],i))
    }else if(_.isObject(tp)){
        // console.log('enter object 2',{tp,v})
        let _o={}
        _.keys(tp).map(k=>{
            _o[k] = typeEnsure(tp[k],v[k])
        })
		// console.log('new object 2',_o)
		return _o
    }else {
        throw "wrong";
    }
}

const collectionName = exports.collectionName = 'test'

const getOne  = (ithis,flt)=>{
    return new Promise((resolve,reject)=>{
        let clt = model.getDb().collection(ithis.collectionName+'s')
        flt.valid = true
        if('_id' in flt) { flt._id = new ObjectID(flt._id)}
        clt.findOne(flt,function(err,doc){
            console.log({err})
            resolve(JSON.parse(JSON.stringify(doc)))
        })
    }).catch(e=>console.log(e))
}

const getById = exports.getById = async (ithis,flt)=>{
    console.log(`model:: ${ithis.collectionName} getById`,flt)
    return await getOne(ithis,flt)
}
const getByNum = exports.getByNum = async (ithis,flt)=>{
    console.log(`model:: ${ithis.collectionName} getByNum`,flt)
    return await getOne(ithis,flt)
}
const deleteOne =  (ithis,flt,options)=>{
    return new Promise((resolve,reject)=>{
        let clt = model.getDb().collection(ithis.collectionName+'s')
        flt.valid = true
        if('_id' in flt) { flt._id = new ObjectID(flt._id)}
        options.valid = false
        options.updateAt = new Date()
        clt.findOneAndUpdate(flt,
                            {$set:options},
                            {returnOriginal:false},
                            function(err,result){
                                console.log({err,result})
                                resolve(JSON.parse(JSON.stringify({'delete':'ok'})))
                        })
    }).catch(e=>console.log(e))
}
const deleteById = exports . deleteById = async(ithis,flt,options)=>{
    console.log(`model:: ${ithis.collectionName} deleteById`,flt,options)
    return await deleteOne(ithis,flt,options)
}
const deleteByNum = exports . deleteByNum = async(ithis,flt,options)=>{
    console.log(`model:: ${ithis.collectionName} deleteByNum`,flt,options)
    return await deleteOne(ithis,flt,options)
}
const updateOne =  (ithis,flt,options) =>{
    return new Promise((resolve,reject)=>{
        let clt = model.getDb().collection(ithis.collectionName+'s')
        //更改项预处理
        let newValues={updateAt:new Date()}
        Object.keys(ithis.keys).filter(k=>k in options).map(k=>{
            let coltype = ithis.keys[k]
            newValues[k] =typeEnsure(coltype,options[k])
        })
        flt.valid = true
        if('_id' in flt) { flt._id = new ObjectID(flt._id)}
        clt.findOneAndUpdate(flt,
                            {$set:newValues},
                            {returnOriginal:false},
                            function(err,result){
                                console.log({err,result})
                                resolve(JSON.parse(JSON.stringify(result.value)))
                        })
    }).catch(e=>console.log(e))
}
const updateById = exports.updateById = async(ithis,flt,options)=>{
    console.log(`model:: ${ithis.collectionName} updateById`,flt,options)
    return await updateOne(ithis,flt,options)
}
const updateByNum = exports.updateByNum = async(ithis,flt,options)=>{
    console.log(`model:: ${ithis.collectionName} updateByNum`,flt,options)
    return await updateOne(ithis,flt,options)
}
const fetch = exports. fetch = (ithis,filter,orderBy,limit,startPos)=>{
    console.log(`model:: ${ithis.collectionName} fetch`,filter,orderBy,limit,startPos)
    filter = filter || {}
    orderBy = orderBy || {createAt:-1}
    limit   = limit || 10
    startPos= startPos || 0
    filter.valid = true
    return new Promise((resolve,reject)=>{
        let clt = model.getDb().collection(ithis.collectionName+'s')
        let list
        clt.find(filter,{sort:{_id:-1},skip:startPos,limit:limit}).toArray(function(err,doc){
            // console.log({err})
            list = JSON.parse(JSON.stringify(doc))
            clt.count(filter,function(err,count){
                resolve({list,count})
            })
        })
    }).catch(e=>console.log(e))
}

 var addItem = exports. addItem = (ithis,options)=>{
    console.log(`model:: ${ithis.collectionName} addItem`,options)
    return new Promise((resolve,reject)=>{
        let strpre = ithis.PRE + moment().format('YYMMDD')
        let filter = {
            cnum: new RegExp(strpre, 'i')
        }
        let clt = model.getDb().collection(ithis.collectionName+'s');
        clt.find(filter,{sort:{_id:-1}}).toArray(function(err,docs){
            let item = {}
            Object.keys(ithis.keys)
            .map(k=>{
                let coltype = ithis.keys[k]
                item[k] =typeEnsure(coltype,options[k])
            })
            let cnum
            if(_.isEmpty(docs)){
                cnum = strpre+'0001'
            }else{
                let _mx = _.max(docs.map(d=>parseInt(d.cnum.slice(d.cnum.length - 4, d.cnum.length))))
                let t = '0000' + (_.isNumber(_mx)?  _mx + 1 : 1)
                cnum = strpre + t.slice(t.length - 4, t.length)
            }
            item.cnum = cnum
            item.updateAt = item.createAt = new Date()
            clt.insertOne(item,function(err,result){
                                    console.log({err,insertedId:result.insertedId})
                                    clt.findOne({_id:new ObjectID(result.insertedId),valid:true},function(err,doc){
                                        console.log({err,doc})
                                        resolve(JSON.parse(JSON.stringify(doc)))
                                    })
                            })
        })
    }).catch(e=>console.log(e))
}




const to2fu = f=>f.slice(0,1).toUpperCase()+f.slice(1,100).toLowerCase()
var _getThis = exports. _getThis = (_exports,keys,filename)=>{
    let ithis = {keys}
    ithis.collectionName = _exports.collectionName = path.basename(filename).replace('.js','')
    ithis.modelName = _exports.modelName = _exports.collectionName.split('_').map(v=>to2fu(v)).join('')
    Object.keys(exports)
    .filter(k => !k.startsWith('_') && !(k in _exports) && typeof(exports[k]) === 'function')
    .map(k => {
        // console.log(filename,'set ',k)
        _exports[k] = function(...args){
            return exports[k](_exports,...args)
        }
    })
}
