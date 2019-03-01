const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/init',async (ctx,next)=>{
//	let res=await db.find('user',{_id:{$gt:0}});
//  ctx.body=res;

})



module.exports = router;