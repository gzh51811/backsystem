const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    let {goodName,goodTile,goodPrice,goodSellprice,goodCate,goodKucun,goodAttr,sellOn,goodDes} = ctx.request.body;
    let data = {goodName,goodTile,goodPrice,goodSellprice,goodCate,goodKucun,goodAttr,sellOn,goodDes};
    let res = await db.insert('goods',data);
    ctx.body = res;

   

    // 存入数据库

})
module.exports = router;