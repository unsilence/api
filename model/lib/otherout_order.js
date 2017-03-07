"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   outboundNum:{                  
       type:String,                 //出库单号
       default:''
    },
   outType:{
        type:String,                //其他出库类型
        default:''
    },
    warehouse:{
        type:String,                //调出仓库名称
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
export var PRE = 'OU'
Base._getThis(exports,keys,__filename)