"use strict"
var _ = require('underscore')
var Base = require('./_base')

// 入库信息  可以分多钟情况入库 如 集装箱到货  调库入库
var keys = exports.keys =Object.assign({},Base.keys,{
        itype:{ //调拨入库 采购入库 或者 退货入库
            type: String,
            default: ''
        },
        record_num: { //采购单号 or output_num
            type: String,
            default: ''
        },
		stocks: {
			type: [
				{
					stock_num: {
						type: String,
						default: ''
					}
				}
			],
			default: []
		},
        orders: {
            type: [
                {
                    productIdentity: {
                        type: String,
                        default: ''
                    }, //PI
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
                    orderNum: {
                        type: String,
                        default: ''
                    },
                    state: {
                        type: String,
                        default: ''
                    } //货品状态
                }
            ],
            default: []
        },
        note: {
            type: String,
            default: ''
        }
        ,
        status:{
            type: String,
            enum: [
                'unfinish', 'finish' // 进行中 已完成
            ],
            default: 'unfinish'
        }
    })
exports.PRE = 'IP'
Base._getThis(exports,keys,__filename)
