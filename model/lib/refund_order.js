"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   refundNum:{                  
       type:String,                 //退货单号
       default:''
    },
    outboundId:{
        type:String,                //销售出库单号
        default:''
    },
    inWarehouse:{
        type:String,                //退货收入仓库
        default:''
    },
    note:{
        type:String,
        default:''                  //备注
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
export var PRE = 'RE'
Base._getThis(exports,keys,__filename)