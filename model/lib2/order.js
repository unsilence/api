"use strict"
import _ from 'underscore'
import * as Base from './_base'

// 设计师为顾客下的订单 可以是现货单 也可以是采购单  又可能财务角色 或者 采购角色代劳
export var keys = Object.assign({},Base.keys,{

        customer_num: {
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        },
        contract_num: {
            type: String,
            default: ''
        }

    })
export var PRE = 'RC'
Base._getThis(exports,keys,__filename)
