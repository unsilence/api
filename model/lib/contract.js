"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 设计师为顾客下的订单 可以是现货单 也可以是采购单  又可能财务角色 或者 采购角色代劳
var keys = exports.keys =Object.assign({},Base.keys,{
  off_num: { // 线下的合同号
      type: String,
      default: ''
  },
  customer_num: {
      type: String,
      default: ''
  },
  plan_arrive_at: { type: String,default: ''} ,  //计划到货日期
  products: { //商品SKU清单
      type: [
          {
              product_num: {
                  type: String,
                  default: ''
              },
              room: { // 位置名称
                  type: String,
                  default: ''
              },
              pic: { // 款型图片
                  type: String,
                  default: ''
              },
              brand: { // 品牌
                  type: String,
                  default: ''
              },
              name: { // 产品名称
                  type: String,
                  default: ''
              },
              country: { // 产地
                  type: String,
                  default: ''
              },
              model: { // 型号
                  type: String,
                  default: ''
              },
              size: { // 规格/尺寸
                  type: String,
                  default: ''
              },
              material: { // 材质
                  type: String,
                  default: ''
              },
              crafts: { // 工艺/面料
                  type: String,
                  default: ''
              },
              quantity: { // 数量
                  type: String,
                  default: ''
              },
              unit: { // 单位
                  type: String,
                  default: ''
              },
              price: { // 单价（元）
                  type: String,
                  default: ''
              },
              discount: { // 折扣
                  type: String,
                  default: ''
              },
              note: { // 备注
                  type: String,
                  default: ''
              }
          }
      ],
      default: []
  }
})

exports.PRE = 'CO'
Base._getThis(exports,keys,__filename)
