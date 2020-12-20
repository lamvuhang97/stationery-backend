const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize')
let express = require('express');
let nodeXlsx = require('node-xlsx');
let fs = require('fs');
const { create } = require('domain');
const Op = sequelize.Op;
class ExportexcelController {
    async getExportProduct(req, res) {
        try {
            
            var product = await models.Product.findAll({
                where: {
                    ownerId: Number(req.params.userId)
                }
            })
            // console.log(product);
            var key =  Object.keys(product[0].dataValues)
            var value = product.map((item) => {
                var tmp =[]
                for ( var i in item.dataValues) {
                    if(i == 'createdAt' || i == 'updatedAt') {
                        tmp.push((item[i]).toString().slice(0, 24))
                    } else {
                        tmp.push(item[i])
                    }
                }
                return tmp
                // return Object.values(item.dataValues)
            })
        
            value.unshift(key)
            console.log(value);
            // console.log(map);
            // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
            var buffer = nodeXlsx.build([{name: "mySheetName", data: value}]); 
            res.attachment('product.xlsx');
            res.send(buffer);
        } catch (error) {
            return res.status(400).json(error.message)
          }
        
    }


}
module.exports = new ExportexcelController()