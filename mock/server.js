var express = require("express")
var cors = require('express-cors')
var Mock = require('mockjs'); //引入mock模块
var path = require("path"); //引入path模块 核心模块不许要npm
var fs = require('fs'); // 引入fs模块 核心模块不许要npm
var app = express();

// 配置跨域
app.use(cors({
    allowedOrigins: [
        'localhost:3001', 'localhost:3000'
    ]
}))




// 读取配置文件 将路由和文件对应上
fs.readFile(__dirname + '/conf.json', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        let dataObject = JSON.parse(data);
        for (let key in dataObject) {
            dataObject[key].forEach(function(value, key) {
                // 注册全部路由
                app.all(value.url, function (req, res) {
                    fs.readFile(path.join(__dirname, value.path), 'utf-8', function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(Mock.mock(JSON.parse(data)));
                        }
                    })
                });
            })
        }
    }
});

app.listen(3001);
