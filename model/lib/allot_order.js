"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   allotNum:{                  
       type:String,                 //��������
       default:''
    },
    outWarehouse:{
        type:String,                //�����ֿ�
        default:''
    },
    inWarehouse:{
        type:String,                //����ֿ�
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
export var PRE = 'AL'
Base._getThis(exports,keys,__filename)