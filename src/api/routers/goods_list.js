const Router = require('koa-router');
const db = require('../db');
const qs = require('querystring');

var mongoose = require('mongoose');

// 创建路由
var router = new Router();


/**
 * ctx
 */
//	goods_list数据渲染
router.get('/find',async (ctx,next)=>{
    let str = (ctx.request.url).split('?')[1];
    let params = qs.parse(str);
    let {username,page,limit} = params;
    let res = await db.find('goods',{},0,0);
    let res1 = await db.find1('goods',{"username":username},limit*1,page*1);
    let database = {
    	"code":0,
    	"count": res.length,
    	"data":res1
    }
    ctx.body = database;
})

//	goods_add数据渲染
router.get('/find2',async (ctx,next)=>{
	let data = ctx.query;
	let {_id} = data;
	_id = mongoose.Types.ObjectId(_id);
	let res = await db.find('goods',{"_id":_id},0,0);
	ctx.body = res;

})

router.get('/delete',async (ctx,next)=>{
	let {_id} = ctx.query;
	_id = mongoose.Types.ObjectId(_id);
	let res = await db.delete('goods',{"_id":_id});
	ctx.body =res ;
})
router.post('/updata',async (ctx,next)=>{
	let data = ctx.request.body;
	let {_id} = data
	_id = mongoose.Types.ObjectId(_id);
	delete data._id;
	let res = await db.update('goods',{"_id":_id},{$set : data});
	ctx.body = res;
})
module.exports = router;