const LBPEncode = require('./DataManager');
var path = require('path');
var fs = require('fs');


var rule;
var pathname =  path.join(__dirname,"../../rule.json");
//数据
var products = [
    { name: "iPhone", "price": 6999 },
    { "name": "kindler", "price": 999 }
];


module.exports = {
    "GET /api/products": async (ctx, next) => {
        ctx.response.type = "application/json";
        ctx.response.body = {
            products: products
        };
    },

    "GET /api/solution1": async (ctx, next) => {

        try {
            var data = fs.readFileSync(pathname, "utf-8");
            ruleJson = JSON.parse(data);
            rule = ruleJson.data.rule;
        } catch (error) {
            console.log("fail: " + error);
        }

        var data = {
            code: 200,
            message: "success",
            data: {
                name: "@杭城小刘",
                year: LBPEncode("1995", rule),
                month: LBPEncode("02", rule),
                day: LBPEncode("20", rule),
                analysis : rule
            }
        }

        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.response.type = "application/json";
        ctx.response.body = data;
    },


    "GET /api/solution2": async (ctx, next) => {
        try {
            var data = fs.readFileSync(pathname, "utf-8");
            ruleJson = JSON.parse(data);
            rule = ruleJson.data.rule;
        } catch (error) {
            console.log("fail: " + error);
        }

        var data = {
            code: 200,
            message: "success",
            data: {
                name: LBPEncode("建造师",rule),
                birthday: LBPEncode("1995年02月20日",rule),
                company: LBPEncode("中天公司",rule),
                address: LBPEncode("浙江省杭州市拱墅区石祥路",rule),
                bidprice: LBPEncode("2万元",rule),
                negative: LBPEncode("2018年办事效率太高、负面基本没有",rule),
                title: LBPEncode("建造师",rule),
                honor: LBPEncode("最佳奖",rule),
                analysis : rule
            }
        }
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.response.type = "application/json";
        ctx.response.body = data;
    },

    "POST /api/products": async (ctx, next) => {
        var p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = "application/json";
        ctx.response.body = p;
    }
};
