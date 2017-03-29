"use strict"
var _ = require('underscore')
var Base = require('./_base')

//关于商品的方案 案例 展示 等
var keys = exports.keys = Object.assign({},Base.keys,{

        //在想想...
        products: {
            type: [
                {
                    product_num: {
                        type: String,
                        default: ''
                    },
                    quantity: {
                        type: String,
                        default: ''
                    }
                }
            ],
            default: []
        },
      pic: {
          type: String,
          default: ''
      },
      figures:{
          type: [
              {
                  pic: {
                      type: String,
                      default: ''
                  }
              }
          ],
          default: []
      }
    })
exports. PRE = 'PS'
Base._getThis(exports,keys,__filename)
