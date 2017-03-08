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
    orderMessage:{type:[{
        productNum:{type:String,default:''},            //产品型号
        productName:{type:String,default:''},           //产品名称
        productCount:{type:String,default:''},          //产品数量
        purchasePrice:{type:String,default:''},         //产品采购单价
        purchaseAmount:{type:String,default:''},        //采购金额（原币）
        rate:{type:String,default:''},                  //计划汇率
        purchaseTotal:{type:String,default:''},         //产品采购金额（人民币）
        sellPrice:{type:String,default:''},              //产品销售单价
        salesAmount:{type:String,default:''},            //产品销售总金额 
        part:{type:[{
            partNum:{type:String,default:''},             //部件型号
            partCount:{type:Number,default:0},            //部件数量
            suitcaseNum:{type:String,default:''},         //提箱单号
            boxOrderNum:{type:String,default:''},         //箱单号
            boxNum:{type:String,default:''},              //箱号
            boxCount:{type:Number,default:0}              //箱数
        }],default:[]},
        supplierName:{type:String,default:''},          //供应商名称
        brand:{type:String,default:''},                 //品牌
        salesmanName:{type:String,default:''},          //销售员姓名
        sellOrderNum:{type:String,default:''},          //销售订单号
        customerName:{type:String,default:''},          //客户姓名
        address:{type:String,default:''},               //客户地址
        state:{type:String,default:''}                  //货品状态
    }],default:[]},
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