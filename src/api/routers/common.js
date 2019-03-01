const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

// 判断用户名是否存在
router.get('/',async (ctx,next)=>{
    let {username} = ctx.query;
    let res = await db.find('user',{username});
    ctx.body = res;
    
})

module.exports = router;