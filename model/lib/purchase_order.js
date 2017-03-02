"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   takegoods_num:{                  
       type:String,                 //提货单号
       default:''
    },
    purchase_name:{
        type:String,
        default:''                 //采购专员
    },
    arriveAt:{
        type:String,                //计划到货日期
        default:''
    },
    currency:{
        type:String,                //币种
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
    cancel_examine:{
        type:Boolean,
        default:false               //取消审核，默认未取消
    },
    untread:{
        type:Boolean,
        default:false               //退回
    }
    
    
})
Base._getThis(exports,keys,__filename)