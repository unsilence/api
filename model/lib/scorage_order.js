"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   scorageNum:{                  
       type:String,                 //��ⵥ��
       default:''
    },
    purchaseId:{
        type:String,                //�������
        default:''
    },
    warehouse:{
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
export var PRE = 'SC'
Base._getThis(exports,keys,__filename)