const Router = require('koa-router');
const db = require('../db');
const path = require('path');
const fs = require("fs");
const multer = require('multer');
// 创建路由
var router = new Router();

// 创建磁盘存储引擎（自定义存储方式）
var storage = multer.diskStorage({
    // 设置存储目录，// 如果目录不存在，则报错
    destination: function (req, file, cb) {
        try{
            fs.accessSync('./uploads')
        }catch(err){
            fs.mkdir('./uploads')
        } 
        cb(null, './uploads')
    },

    // 自定义文件名
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})
// 配置参数
const upload = multer({
    storage
});
/**
 * ctx
 */
router.post('/',async (ctx,next)=>{	
//	ctx.body=;
//	upload.array('goods', 5);
	ctx.body=ctx.request.body;
  
})

module.exports = router;