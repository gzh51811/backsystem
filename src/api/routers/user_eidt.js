const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

// 判断用户名是否存在
router.get('/init',async (ctx,next)=>{
    let {username} = ctx.query;
    let res = await db.find('user',{username});
    ctx.body = res;
    
})


router.post('/update',async (ctx,next)=>{
    let {user,username,admin,nickname,password,phone,gender,birsthday,email,text} = ctx.request.body;
    let data = {username,admin,nickname,password,phone,gender,birsthday,email,text,regtime:Date.now()}
    let res = await db.update('user',{username:user},{$set:data});
    ctx.body = res;
    
})

module.exports = router;