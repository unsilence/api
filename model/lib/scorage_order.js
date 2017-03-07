"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   scorageNum:{                  
       type:String,                 //入库单号
       default:''
    },
    purchaseId:{
        type:String,                //提货单号
        default:''
    },
    warehouse:{
        type:String,                //收入仓库
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
export var PRE = 'SC'
Base._getThis(exports,keys,__filename)