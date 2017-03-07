"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   refundNum:{                  
       type:String,                 //�˻�����
       default:''
    },
    outboundId:{
        type:String,                //���۳��ⵥ��
        default:''
    },
    inWarehouse:{
        type:String,                //�˻�����ֿ�
        default:''
    },
    note:{
        type:String,
        default:''                  //��ע
    },
    sellPrice:{
        type:String,                //��Ʒ���۵���
        default:''  
    },
    salesAmount:{
        type:String,                //��Ʒ�����ܽ��
        default:''  
    },
    examine:{
        type:Boolean,
        default:false               //��ˣ�Ĭ��δ���
    },
    cancelExamine:{
        type:Boolean,
        default:false               //ȡ����ˣ�Ĭ��δȡ��
    }
    
    
})
export var PRE = 'RE'
Base._getThis(exports,keys,__filename)