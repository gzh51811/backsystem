const path = require('path');
const fs = require("fs");
const express = require("express");
// const bodyParser = require('body-parser');//urlencoded,json
const multer = require('multer');
const Router = require('koa-router');
var router = new Router();
// 创建磁盘存储引擎（自定义存储方式）
//var storage = multer.diskStorage({
//  // 设置存储目录，// 如果目录不存在，则报错
//  destination: function (req, file, cb) {
//  console.log(req);
//      try{
//      	fs.accessSync('../../img')
//      }catch(err){
//          fs.mkdir('../../img')
//      }
////      
//  cb(null, '../../img')
//},
//	// 自定义文件名
//	       filename: function (req, file, cb) {
//	           console.log('file',file);
//	           let ext = path.extname(file.originalname)
//	           cb(null, file.fieldname + '-' + Date.now() + ext)
//	       }
//	   })
// //加载配置
//var upload = multer({ storage: storage })
//router.post('/',upload.single('goods'),async (ctx,next)=>{
//  // 解构
////  let {username} = ctx.req.body;
////	ctx.body = "666";
//   ctx.body = {
//      filename: ctx.req.file.filename,//返回文件名
//      body:ctx.req.body
//  }
////  console.log(ctx.req);
//
// 
//})

//const multer = require('koa-multer');
//配置    
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, '../../img')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})


//加载配置
var upload = multer({ storage: storage });

router.post('/upload', upload.single('goods',5), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename,//返回文件名
        body:ctx.req.body
    }
})
router.post('/upload', upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'aaa', maxCount: 1 }]),async (ctx)=>{

    console.log(ctx.req.files);
})

module.exports = router;



       

// // 配置参数
// const upload = multer({
//     // 上传文件的保存路径,路径不存在会自动创建
//     // dest: 'uploads/' 
//     storage
// });


// const app = express();

// // 静态资源服务器
// app.use(express.static('./'));

// // 引入配置文件中的端口
// // const {PORT} = require('./config.json');


   // 路由
// app.post('/upload',upload.array('goods', 5),(req,res)=>{
//     res.send('上传文件成功');
// })

// 监听端口
// app.listen(10086,()=>{
//     console.log('server is running on port %s',PORT);
// });