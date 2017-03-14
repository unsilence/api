"use strict"
import _ from 'underscore'
import * as Base from './_base'

//顾客 多数情况由设计师建立
export var keys = Object.assign({},Base.keys,{

        userNum: { //客户经理 or 设计师 or 销售员
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        district: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        }
        channel: {
            type: String,
            default: ''
        },
        channel_name: {
            type: String,
            default: ''
        },
        market_master: {
            type: String,
            default: ''
        },
        design_center: {
            type: String,
            default: ''
        },
        bzman: {
            type: String,
            default: ''
        },
        designer: {
            type: String,
            default: ''
        },
        center_master: {
            type: String,
            default: ''
        },
        operator_master: {
            type: String,
            default: ''
        },
        city_master: {
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: [
                'finish', 'unfinish'
            ],
            default: 'unfinish'
        },
        finishAt:{				//上传时间
			type:Date,
			default: Date.now()
			}
    })
export var PRE = 'CT'
Base._getThis(exports,keys,__filename)
