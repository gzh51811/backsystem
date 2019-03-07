const Router = require('koa-router');
const md5=require('md5');
const db = require('../db');
const token = require('../utils/token');
// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    
    let {username,password,mdl} = ctx.request.body;
//  password=md5(password);
    let res = await db.find('user',{username,password});
    res = res[0];
    if(res){
    	let time='';
    	if(mdl){
    		time='7d';
    	}else{
    		time='2h';	
    	}
        let _token = token.create(username,expiresIn=time);
        ctx.body = {
            _id:res._id,
            username:res.username,
            admin:res.admin,
			code:200,
            regtime:res.regtime,
            token:_token,
            nickname:res.nickname
            
        }
    }else{
        ctx.body = {
            code:100,
            msg:'fail'
        }
    }

    



})

module.exports = router;