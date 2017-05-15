"use strict"
var _ = require( 'underscore');

const STATUS = ['all','self']

var tables = exports.tables  = {
  'Component':{read:'all',write:'self'},
  'Currency':{read:'all',write:'self'},
  'Customer':{read:'self',write:'self'},
  'Input':{read:'self',write:'self'},
  'Order':{read:'self',write:'self'},
  'Output':{read:'self',write:'self'},
  'Pay':{read:'self',write:'self'},
  'Product':{read:'all',write:'self'},
  'Proposal':{read:'all',write:'self'},
  'Purchase':{read:'self',write:'self'},
  'Purchasecn':{read:'self',write:'self'},
  'Receive':{read:'self',write:'self'},
  'Remark':{read:'self',write:'self'},
  'Session':{read:'self',write:'self'},
  'Stock':{read:'all',write:'self'},
  'Supplier':{read:'all',write:'self'},
  'User':{read:'self',write:'self'},
  'Contract':{read:'self',write:'self'},
  'Warehouse':{read:'all',write:'self'},
}
