"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({},Base.keys,{
      clt_name : {type: String,default: ''},
      record_num: {type: String,default: ''},
      action : {type: String,default: ''},
      note : {type: String,default: ''},
      to_users : {type:[{user_num: {type: String,default: ''}}]
                ,default:[]}
    })
exports.PRE = 'MG'
Base._getThis(exports,keys,__filename)
