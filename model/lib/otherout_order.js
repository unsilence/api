"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   outboundNum:{                  
       type:String,                 //���ⵥ��
       default:''
    },
   outType:{
        type:String,                //������������
        default:''
    },
    warehouse:{
        type:String,                //�����ֿ�����
        default:''
    },
    note:{
        type:String,
        default:''                  //��ע
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