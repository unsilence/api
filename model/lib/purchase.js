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
  sale_originalPrice: {
    type: String,
    default: ''
  }, //销售原价
  sale_discount: {
    type: String,
    default: ''
  }, //销售折扣
  visit: {
    type: String,
    enum: [
      '未回访', '送货回访', '阶段回访', '竣工回访'
    ],
    default: '未回访'
  }, //客户回访
  products: {
    type: [
      {
        stock_num: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          enum: [
            'waitAudit', 'waitInput', 'inStock'
          ],
          default: ''
        }, //物流状态
        state: {
          type: String,
          enum: [
            'good', 'bad'
          ],
          default: ''
        }, //到货后的货品状态 完整 or 有损
        product_identity: {
          type: String,
          default: ''
        }, // PI
        product_num: {
          type: String,
          default: ''
        }, //产品型号
        product_name: {
          type: String,
          default: ''
        }, //产品名称
        product_quantity: {
          type: String,
          default: ''
        }, //产品数量
        product_price: {
          type: String,
          default: ''
        }, //采购金额（原币）
        currency_rate: {
          type: String,
          default: ''
        }, //计划汇率
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
