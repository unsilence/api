"use strict"
import _ from 'underscore'
import * as Base from './_base'

export var keys = Object.assign({},Base.keys,{
        name: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
         department: {
            type: String,
            enum: ['����', '�ɹ�1', '�ɹ�1','����','�ۺ�'],
            default: ''
        },                                                      //���ڲ���
        itype:{
            type: String,
             enum: ['����', 'רԱ'],
            default: ''
        },
        city:{
            type: String,
             enum: ['ȫ��', '����','�人',' �Ϻ� ','����'],
            default: ''
        },
        note: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['enable', 'disabled'],
            default: 'enable'
        },
       
    })
export var PRE = 'US'
Base._getThis(exports,keys,__filename)
