const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router(); 

// 引入页面路由

const loginRouter = require('./login');
const userAddRouter = require('./user_add');
const userEidtRouter = require('./user_eidt');
const userListRouter = require('./user_list');
const goodsAddRouter = require('./goods_add');
const tokenRouter = require('./tokenverify');
const goodsListRouter = require('./goods_list');
const orderListRouter = require('./order_list');
router.use(koaBody({
    // 支持formdata
    multipart:true,

    // 文件支持
    formidable:{
        // 指定保存路径
        uploadDir:'./uploads',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));


router.use('/login',loginRouter.routes());
router.use('/user_list',userListRouter.routes());
router.use('/user_add',userAddRouter.routes());
router.use('/user_edit',userEidtRouter.routes());
router.use('/goods_add',goodsAddRouter.routes());
router.use('/tokenverify',tokenRouter.routes());
router.use('/goods_list',goodsListRouter.routes());
router.use('/order_list',orderListRouter.routes());


module.exports = router;