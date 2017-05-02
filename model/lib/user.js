"use strict"
var _ = require('underscore')
var Base = require('./_base')

var keys = exports.keys = Object.assign({},Base.keys,{
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
            enum: ['财务', '采购1', '采购1','物流','售后'],
            default: ''
        },
        company:{
            type: String,
             enum: ['总部', '北京', '杭州', '武汉',, '上海'],
            default: ''
        },
        job:{ // 工作岗位
            type: String,
             enum: ['主管', '专员'],
            default: ''
        },                                                     //所在部门
        itype:{
            type: String,
             enum: ['主管', '专员'],
            default: ''
        },
        city:{
            type: String,
             enum: ['全国', '北京','武汉',' 上海 ','杭州'],
            default: ''
        },
        role: {
            type: String,
            default: ''
        },
        role_data: {
            type: String,
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
exports. PRE = 'US'
Base._getThis(exports,keys,__filename)
