import Koa from 'koa';
import koaBody from 'koa-body';
import routes from './routes/routes.js';
const views = require('koa-views');
const path = require('path')
const app = new Koa();
const cors = require('@koa/cors');

app.use(cors());
app.use(
    views(path.join(__dirname, "views"), {
        extension: "ejs",
    })
)
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(3000);
