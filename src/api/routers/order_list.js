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
let {page,limit,shangjia}=param;
let res=await db.find1('order',{shangjia},limit*1,page*1);
let res1=await db.find('order',{shangjia});
	let data={	
    "code": 0
    ,"msg": ""
    ,"count": res1.length
    ,"data": res
	}
    ctx.body=data;

})

router.get('/del',async (ctx,next)=>{
let bianhao=ctx.query;
console.log(bianhao)
let res=await db.delete('order',bianhao);
ctx.body=res;

})
router.post('/delAll',async (ctx,next)=>{
	let {arr}=ctx.request.body;
	for(var i=0;i<arr.length;i++){
	var res=await db.delete('order',{bianhao:arr[i]});	
	}

ctx.body=res;

})
router.post('/insert',async (ctx,next)=>{
    // 解构
    let {zhifu,fahuo,qianshou,shangjia,username} = ctx.request.body;
//	password=md5(password);	
    let data ={zhifu,fahuo,qianshou,regtime:Date.now()}
    let res = await db.update('order',{shangjia,username},{$set:data});
    ctx.body = res;

    // 存入数据库

})
module.exports = router;