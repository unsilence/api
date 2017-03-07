"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   outboundNum:{                  
       type:String,                 //出库单号
       default:''
    },
    warehouse:{
        type:String,                //调出仓库
        default:''
    },
    deliveryAt:{
        type:Date,                //计划送货日期
        default:Date.now()
    },
    sellNum:{
        type:String,                //销售订单号
        default:''
    },
    name:{
        type:String,                //客户名称
        default:''
    },
    address:{
        type:String,                //送货地址
        default:''
    },
    note:{
        type:String,
        default:''                  //备注
    },
    sellPrice:{
        type:String,                //产品销售单价
        default:''  
    },
    salesAmount:{
        type:String,                //产品销售总金额
        default:''  
    },
    examine:{
        type:Boolean,
        default:false               //审核，默认未审核
    },
    cancelExamine:{
        type:Boolean,
        default:false               //取消审核，默认未取消
    }
    
    
})
export var PRE = 'OU'
Base._getThis(exports,keys,__filename)