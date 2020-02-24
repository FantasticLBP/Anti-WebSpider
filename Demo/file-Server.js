var path = require("path"),
    http = require("http"),
    url = require("url"),
    fs = require("fs");


var root = path.resolve(process.argv[2] || ".");

var server = http.createServer(function (request, response) {
    console.log("url->" + request.url);
    //获取url的path
    var pathname = url.parse(request.url).pathname;
    //根据当前时间返回字体文件
    if (pathname.indexOf("analysis") > -1) {
        var second = new Date().getTime();
        var seed = second % 4;
        if (seed == 0) {
            pathname = "/Util/ddv1cj99i19c7t4eh.ttf";
        } else if (seed == 1) {
            pathname = "/Util/appearance1.ttf";
        } else if (seed == 2) {
            pathname = "/Util/ddv1cj99i1882d7n3.ttf";
        }
        else if (seed == 3) {
            pathname = "/Util/my_webfont.ttf";
        }

        //将生成的字体文件的类型记录下来，等前端拿到字体文件后，后端再根据字体文件的Map规则去生成对应的数据.
        var fontRuleJson = {
            "code": 200,
            "message": "success",
            "data": { "rule": seed }
        };

        fs.writeFileSync("rule.json", JSON.stringify(fontRuleJson));
    }


    if (pathname.indexOf("map") > -1) {
        //单独汉字加密处理的话，rule:4

        //将生成的字体文件的类型记录下来，等前端拿到字体文件后，后端再根据字体文件的Map规则去生成对应的数据.
        var fontRuleJson = {
            "code": 200,
            "message": "success",
            "data": { "rule": 4 }
        };
        pathname = "/Util/chinese.ttf";
        fs.writeFileSync("rule.json", JSON.stringify(fontRuleJson));
        console.log("文件为" + path.join(root, pathname));
    }


    //获得对应本地文件路径
    var filepath = path.join(root, pathname);

    //获取文件状态
    fs.stat(filepath, function (err, stats) {

        //没有出错并且文件存在
        if (!err && stats.isFile()) {
            if (pathname.indexOf("analysis") > -1) {
                response.writeHead("Access-Control-Allow-Origin", "*");
                response.writeHead(200, { "Content-Type": "application/octet-stream" });
            }
            else if (pathname.indexOf("map") > -1) {
                response.writeHead("Access-Control-Allow-Origin", "*");
                response.writeHead(200, { "Content-Type": "application/octet-stream" });
            }

            else {
                response.writeHead(200);
            }
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);

        } else {
            console.log('404 ' + require.url);
            response.writeHead(404);
        }

    });

});


server.listen(8080);
console.log('Server is runnig at http://127.0.0.1:8080/');