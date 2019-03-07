const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    let date = new Date();
    Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	s = date.getSeconds();
    let {username,goodName,goodTile,goodPrice,goodSellprice,goodCate,goodKucun,goodAttr,sellOn,goodDes} = ctx.request.body;
    let data = {username,goodName,goodTile,goodPrice,goodSellprice,goodCate,goodKucun,goodAttr,sellOn,goodDes,regtime:Y+M+D+h+m+s};
    console.log(ctx.request.body);
    let res = await db.insert('goods',data);
    ctx.body = res;
    // 存入数据库
})
//router.post('/insertImg',async (ctx,next)=>{
//	
//})
module.exports = router;