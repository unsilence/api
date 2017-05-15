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
  purchase_user: {
    type: String,
    default: ''
  }, //采购专员
  purchase_master: {
    type: String,
    default: ''
  }, //采购专员
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
  },
  contract_num: {
    type: String,
    default: ''
  }, //保存 合同号
  contract_money: {
    type: String,
    default: ''
  }, //合同金额
  project_master: {
    type: String,
    default: ''
  }, //项目主管 【仅限财务系统显示】
  order_at: {
    type: String,
    default: ''
  }, //下单日期
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
  }, //基准折扣 【仅限财务系统显示】
  base_discount: {
    type: String,
    default: ''
  }, //标准折扣 【仅限财务系统显示】
  real_profit_rate: {
    type: String,
    default: ''
  }, //实际利润率 【仅限财务系统显示】
  products: {
    type: [
      {
        order_type: {
          type: String,
          default: ''
        }, //订单类型
        contract_num: {
          type: String,
          default: ''
        }, // 合同编号
        product_quantity: {
          type: String,
          default: ''
        }, //产品数量
        product_type: {
            type: String,
            default: ''
        }, //产品类型
        order_money: {
          type: String,
          default: ''
        }, //订单金额
         order_at: {
           type: String,
           default: ''
         }, //下单时间
        components: {
          type: [
            {
              component_num: {
                type: String,
                default: ''
              }, //组件名字
              component_quantity: {
                type: String,
                default: ''
              }, //组件数量
              suitcase_num: {
                type: String,
                default: ''
              }, //提箱单号
              box_order_num: {
                type: String,
                default: ''
              }, //箱单号
              box_num: {
                type: String,
                default: ''
              }, //箱号
              box_quantity: {
                type: String,
                default: ''
              } //箱数
            }
          ],
          default: []
        }
      }
    ],
    default: []
  }
})

exports.PRE = 'PC'
Base._getThis(exports, keys, __filename)
