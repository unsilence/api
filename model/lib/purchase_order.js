"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
   takegoodsNum:{                  
       type:String,                 //�������
       default:''
    },
    purchaseName:{
        type:String,
        default:''                 //�ɹ�רԱ����
    },
    arriveAt:{
        type:String,                //�ƻ���������
        default:''
    },
    currency:{
        type:String,                //����
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
    },
    untread:{
        type:Boolean,
        default:false               //�˻�
    }
    
    
})
Base._getThis(exports,keys,__filename)