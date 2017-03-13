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
    orderMessage:{type:[{
        productNum:{type:String,default:''},            //��Ʒ�ͺ�
        productName:{type:String,default:''},           //��Ʒ����
        productCount:{type:String,default:''},          //��Ʒ����
        purchasePrice:{type:String,default:''},         //��Ʒ�ɹ�����
        purchaseAmount:{type:String,default:''},        //�ɹ���ԭ�ң�
        rate:{type:String,default:''},                  //�ƻ�����
        purchaseTotal:{type:String,default:''},         //��Ʒ�ɹ�������ң�
        sellPrice:{type:String,default:''},              //��Ʒ���۵���
        salesAmount:{type:String,default:''},            //��Ʒ�����ܽ�� 
        part:{type:[{
            partNum:{type:String,default:''},             //�����ͺ�
            partCount:{type:Number,default:0},            //��������
            suitcaseNum:{type:String,default:''},         //���䵥��
            boxOrderNum:{type:String,default:''},         //�䵥��
            boxNum:{type:String,default:''},              //���
            boxCount:{type:Number,default:0}              //����
        }],default:[]},
        supplierName:{type:String,default:''},          //��Ӧ������
        brand:{type:String,default:''},                 //Ʒ��
        salesmanName:{type:String,default:''},          //����Ա����
        sellOrderNum:{type:String,default:''},          //���۶�����
        customerName:{type:String,default:''},          //�ͻ�����
        address:{type:String,default:''},               //�ͻ���ַ
        state:{type:String,default:''}                  //��Ʒ״̬
    }],default:[]},
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