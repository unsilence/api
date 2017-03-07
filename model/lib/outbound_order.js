"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   outboundNum:{                  
       type:String,                 //���ⵥ��
       default:''
    },
    warehouse:{
        type:String,                //�����ֿ�
        default:''
    },
    deliveryAt:{
        type:Date,                //�ƻ��ͻ�����
        default:Date.now()
    },
    sellNum:{
        type:String,                //���۶�����
        default:''
    },
    name:{
        type:String,                //�ͻ�����
        default:''
    },
    address:{
        type:String,                //�ͻ���ַ
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
export var PRE = 'OU'
Base._getThis(exports,keys,__filename)