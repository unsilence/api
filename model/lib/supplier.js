"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 供货商  代替原来的品牌 品牌意思太单薄了
var keys = exports.keys = Object.assign({},Base.keys,{
        brand_name:{
          type: String, // 品牌名字
          default: ''
        },
        name: { //生产商名字
            type: String,
            default: ''
        },
        country: { //国家
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        }

    })
exports. PRE = 'SP'
Base._getThis(exports,keys,__filename)
