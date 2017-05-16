"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
  status: {
    type: String,
    enum: [
      'inPurchase', 'inPay', 'inStock', 'finish'
    ],
    default: 'inPurchase'
  }, //等待提交财务，正在付款，已到货，已送货安装
  take_num: {
    type: String,
    default: ''
  }, //提货单号
  purchase_user: {
    type: String,
    default: ''
  }, //采购专员
  purchase_master: {
    type: String,
    default: ''
  }, //采购经理
  plan_arrive_at: {
    type: String,
    default: ''
  }, //计划到货日期
  currency_num: {
    type: String,
    default: ''
  }, //币种
  customer_num: {
    type: String,
    default: ''
  },//客户编号
  contract_num: {
    type: String,
    default: ''
  }, //保存 合同号
  contract_money: {
    type: String,
    default: ''
  }, //订单金额
  brand_user1: {
    type: String,
    default: ''
  }, //品牌专员1
  brand_user2: {
    type: String,
    default: ''
  }, //品牌专员2
  project_manager: {
    type: String,
    default: ''
  }, //项目经理
  project_master: {
    type: String,
    default: ''
  }, //项目部经理
  order_at: {
    type: String,
    default: ''
  }, //下单日期
  order_type: {
    type: String,
    default: ''
  }, //订单类型
  quantity: {
    type: String,
    default: ''
  }, //产品数量
  product_type: {
    type: String,
    default: ''
  }, //产品类型
  supplier_name: {
    type: String,
    default: ''
  }, //供应商名称
  brand_num: {
    type: String,
    default: ''
  }, //品牌
  real_discount: {
    type: String,
    default: ''
  }, //实际折扣 【仅限财务系统显示】
  integrate_discount: {
    type: String,
    default: ''
  }, //基成折扣 【仅限财务系统显示】
  base_discount: {
    type: String,
    default: ''
  }, //标准折扣 【仅限财务系统显示】
  real_profit_rate: {
    type: String,
    default: ''
  }, //实际利润率 【仅限财务系统显示】
  integrate_num: {
    type: String,
    default: ''
  }, //集成系数 【仅限财务系统显示】
  ag1money: {
    type: String,
    default: ''
  } //业绩金额 【仅限财务系统显示】

})

exports.PRE = 'PCN'
Base._getThis(exports, keys, __filename)
