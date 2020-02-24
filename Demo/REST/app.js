const Koa = require("koa");
const bodyParse = require("koa-bodyparser");
const controller = require("./controller");

const app = new Koa();

app.use(async (ctx, next) => {
    await next();
});

app.use(bodyParse());

app.use(controller());


app.listen(3000,function(){
    console.log("The server is running at http://127.0.0.1:3000");
});