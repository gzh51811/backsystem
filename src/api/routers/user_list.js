const Router = require('koa-router');
const db = require('../db');
const qs = require('querystring');
// 创建路由
var router = new Router();


/**
 * ctx
 */
router.get('/init',async (ctx,next)=>{
let str =(ctx.request.url).split('?')[1];
let param = qs.parse(str);
let {page,limit}=param;
let res=await db.find1('user',{},limit*1,page*1);
let res1=await db.find('user',{});
	let data={	
    "code": 0
    ,"msg": ""
    ,"count": res1.length
    ,"data": res
	}
    ctx.body=data;

})

router.get('/del',async (ctx,next)=>{
let username=ctx.query;
let res=await db.delete('user',username);
ctx.body=res;

})
router.post('/delAll',async (ctx,next)=>{
	let {arr}=ctx.request.body;
	for(var i=0;i<arr.length;i++){
	var res=await db.delete('user',{username:arr[i]});	
	}

ctx.body=res;

})

module.exports = router;