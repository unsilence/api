"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({},Base.keys,{
      user_num: {type: String,default: ''}, //发送消息
      clt_name : {type: String,default: ''},
      record_num: {type: String,default: ''},
      action : {type: String,default: ''},
      note : {type: String,default: ''},
      to_user : {type: String,default: ''} //接收消息
    })
exports.PRE = 'MG'
Base._getThis(exports,keys,__filename)
