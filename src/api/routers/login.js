const Router = require('koa-router');
const md5=require('md5');
const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    let {username,password,mdl} = ctx.request.body;
    password=md5(password);
    console.log(password);
    console.log(md5('a12345'));
    let res = await db.find('user',{username,password});
    res = res[0];
    if(res){
        ctx.body = {
            _id:res._id,
            username:res.username,
			code:200,
            regtime:res.regtime
        }
    }else{
        ctx.body = {
            code:100,
            msg:'fail'
        }
    }

    



})

module.exports = router;