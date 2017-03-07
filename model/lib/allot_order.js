"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   allotNum:{                  
       type:String,                 //调拨单号
       default:''
    },
    outWarehouse:{
        type:String,                //调出仓库
        default:''
    },
    inWarehouse:{
        type:String,                //调入仓库
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
export var PRE = 'AL'
Base._getThis(exports,keys,__filename)