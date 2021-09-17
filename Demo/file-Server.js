var path = require("path"),
    http = require("http"),
    url = require("url"),
    fs = require("fs");


var root = path.resolve(process.argv[2] || ".");

var server = http.createServer(function (request, response) {
    //获取url的path
    var pathname = url.parse(request.url).pathname;
    //根据当前时间返回字体文件
    if (pathname.indexOf("analysis") > -1) {
        var second = new Date().getTime();
        var seed = second % 5;
        /*
        * 随机刷新，改变显示规则，增加爬虫工程师的理解成本
        * 目前随机数共5种，0～3这4种情况，按照规则针对数字加密，对汉字不加密
        * 4，则对数字不加密，对汉字加密。
        * 所做的一切策略为的是增加爬虫工程师的理解成本。所谓道高一尺，魔高一丈。
        */

        if (seed == 0) {
            pathname = "/Util/ddv1cj99i19c7t4eh.ttf";
        } else if (seed == 1) {
            pathname = "/Util/appearance1.ttf";
        } else if (seed == 2) {
            pathname = "/Util/ddv1cj99i1882d7n3.ttf";
        } else if (seed == 3) {
            pathname = "/Util/my_webfont.ttf";
        } else if (seed == 4) {
            pathname = "/Util/chinese.ttf";
        }
        console.log(`\n数据加密策略--\n${seed}`)

        //将生成的字体文件的类型记录下来，等前端拿到字体文件后，后端再根据字体文件的Map规则去生成对应的数据.
        var fontRuleJson = {
            "code": 200,
            "message": "success",
            "data": { "rule": seed }
        };

        fs.writeFileSync("rule.json", JSON.stringify(fontRuleJson));
    }


    //获得对应本地文件路径
    var filepath = path.join(root, pathname);

    //获取文件状态
    fs.stat(filepath, function (err, stats) {
        //没有出错并且文件存在
        if (!err && stats.isFile()) {
            if (pathname.indexOf("analysis") > -1 || pathname.indexOf("map") > -1) {
                response.writeHead("Access-Control-Allow-Origin", "*");
                response.writeHead(200, { "Content-Type": "application/octet-stream" });
            } else {
                response.writeHead(200);
            }
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        } else {
            response.writeHead(404);
        }

    });

});


server.listen(8080);
console.log('Server is runnig at http://127.0.0.1:8080/');