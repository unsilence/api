"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({}, Base.keys, {
    takeNum: {
        type: String, //提货单号
        default: ''
    },
    by: {
        type: String,
        default: '' //采购专员
    },
    planArriveAt: {
        type: String, //计划到货日期
        default: ''
    },
    currency_num: {
        type: String, //币种
        default: ''
    },
    note: {
        type: String,
        default: '' //备注
    },
    status: {
        type: String,
        enum: [
            'waitAudit', 'waitInput', 'inStock'
        ], //
        default: '' //备注
    },
    orders: {
        type: [
            {
                orderNum: {
                    type: String,
                    default: ''
                },
                stocks:{
                    type:[{
                      stock_num:{
                          type: String,
                          default: ''
                      },
                      buyAt:{
                          type: String,
                          default: ''
                      },
                      planArriveAt:{
                        type: String,
                        default: ''
                      },
                      state: {
                          type: String,
                          default: ''
                      }, //货品状态
                      productIdentity: {
                          type: String,
                          default: ''
                      }, // PI
                      productNum: {
                          type: String,
                          default: ''
                      }, //产品型号
                      productName: {
                          type: String,
                          default: ''
                      }, //产品名称
                      productCount: {
                          type: String,
                          default: ''
                      }, //产品数量
                      productPrice: {
                          type: String,
                          default: ''
                      }, //采购金额（原币）
                      currencyRate: {
                          type: String,
                          default: ''
                      }, //计划汇率
                      components: {
                          type: [
                              {
                                  componentNum: {
                                      type: String,
                                      default: ''
                                  },
                                  quantity: {
                                      type: String,
                                      default: ''
                                  },
                                  suitcaseNum: {
                                      type: String,
                                      default: ''
                                  }, //提箱单号
                                  boxOrderNum: {
                                      type: String,
                                      default: ''
                                  }, //箱单号
                                  boxNum: {
                                      type: String,
                                      default: ''
                                  }, //箱号
                                  boxCount: {
                                      type: Number,
                                      default: 0
                                  } //箱数
                              }
                          ],
                          default: []
                      },
                      supplierName: {
                          type: String,
                          default: ''
                      }, //供应商名称
                      brandName: {
                          type: String,
                          default: ''
                      }, //品牌

                    }],
                    default:[]
                },

            }
        ],
        default: []
    }
})

exports. PRE = 'PC'
Base._getThis(exports, keys, __filename)
