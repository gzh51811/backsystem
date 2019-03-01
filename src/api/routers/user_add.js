const Router = require('koa-router');
const md5=require('md5');
const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/insert',async (ctx,next)=>{
    // 解构
    let {username,nickname,password,phone,gender,birsthday,email,text} = ctx.request.body;
	password=md5(password);
    let data = {username,nickname,password,phone,gender,birsthday,email,text,regtime:Date.now()}
    let res = await db.insert('user',data);

    ctx.body = res;

    // 存入数据库

})

// 判断用户名是否存在
router.get('/username',async (ctx,next)=>{
    let {username} = ctx.query;

    let res = await db.find('user',{username});
    if(res.length>0){
        ctx.body = 'no'
    }else{
        ctx.body = 'yes'
    }
})
// 判断手机号是否存在
router.get('/phone',async (ctx,next)=>{
    let {phone} = ctx.query;

    let res = await db.find('user',{phone});

    if(res.length>0){
        ctx.body = 'no'
    }else{
        ctx.body = 'yes'
    }
})
module.exports = router;