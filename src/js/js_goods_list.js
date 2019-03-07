$(function () {
	layui.use('element', function () {
      var element = layui.element;
    });
    layui.use(['form', 'layedit', 'laydate'], function () {
    });
	init();
	function init() {
		
		layui.use('table', function(){
			let user = localStorage.getItem('user');

        if(!user){
            user = {}
        }else{
            user = JSON.parse(user);
        }
     var username=user.username;
		
	  var table = layui.table;
	  
	  table.render({
	    elem: '#test'
	    ,url:'/goods_list/find?username='+username
	    ,toolbar: '#toolbarDemo'
	    ,title: '用户数据表'
	    ,cols: [[
	      {type: 'checkbox', fixed: 'left'}
	      ,{field:'_id', title:'ID', width:100, fixed: 'left', unresize: true}
	      ,{field:'goodName', title:'商品名称', width:180}
	      ,{field:'goodCate', title:'分类', width:100, sort: true, templet: function(res){
	        return '<em>'+ res.goodCate +'</em>'
	      }}
	      ,{field:'goodPrice', title:'价格（原价）', width:120}
	      ,{field:'goodSellprice', title:'价格（现价）', width:120}
	      ,{field:'goodKucun', title:'库存', width:120}
	      ,{field:'sellOn', title:'状态', width:100, sort: true}
	  	  ,{field:'regtime', title:'添加时间', width:180, sort: true}
	      ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
	    ]]
	    ,page: true
	    ,done: function(res, curr, count){
	    	let sell_ele = $('.layui-table-main .laytable-cell-1-0-7');
	    	let sell_length = sell_ele.length;
		    for(let i=0;i<sell_length;i++){
		    	if(sell_ele.eq(i).html()=="上架"){
		    		$('.layui-table-fixed-r .on_sell').eq(i).html('下架');
		    	}else if(sell_ele.eq(i).html()=="下架"){
		    		$('.layui-table-fixed-r .on_sell').eq(i).html('上架');
		    	}
		    }
		  }
	  });
	  
	  //头工具栏事件
	  table.on('toolbar(test)', function(obj){
	    var checkStatus = table.checkStatus(obj.config.id);
	    switch(obj.event){
	      case 'getCheckData':
	        var data = checkStatus.data;
	        layer.alert(JSON.stringify(data));
	      break;
	      case 'getCheckLength':
	        var data = checkStatus.data;
	        layer.msg('选中了：'+ data.length + ' 个');
	      break;
	      case 'isAll':
	        layer.msg(checkStatus.isAll ? '全选': '未全选');
	      break;
	    };
	  });
	  
	  //监听行工具事件
	  table.on('tool(test)', function(obj){
	    var data = obj.data;
	    let {_id} = data;
	    if(obj.event === 'del'){
	      layer.confirm('真的删除行么', function(index){
	      	$.ajax({
	      		type:"get",
	      		url:"/goods_list/delete",
	      		async:true,
	      		data:data,
	      		success:function (res) {
	      			if(res.ok){
	      				obj.del();
	        			layer.close(index);
	        			init();
	      			}
	      		}
	      	});
	      });
	    } 
	    else if(obj.event === 'edit'){
	      location.href = 'goods_add.html?_id='+_id;
	    }
	    else if(obj.event==='on_sell'){
	    	let goodsdata = {};
	    	let sell_ele = $('.layui-table-main .laytable-cell-1-0-7');
	    	let str = obj.tr.selector;
	    	var idx = str.replace(/[^\d]/g, '')*1;
	    	if($(this).html()=='上架'){
	    		$(this).html('下架');
	    		sell_ele.eq(idx).html('上架');
	    	}else{
	    		$(this).html('上架');
	    		sell_ele.eq(idx).html('下架');
	    	};
	    	goodsdata._id = _id;
	    	goodsdata.sellOn = sell_ele.eq(idx).html();	
	    	$.ajax({
				type:"post",
				url:"/goods_list/updata",
				async:true,
				data:goodsdata
			});
	    }
	  });
	  $('.goods_delete').click(function () {
	    	let goods_length = $('.layui-table-fixed-l .layui-table-body tr').length;
		    	for(let i=goods_length;i>=0;i--){
		    		let tr = $('.layui-table-fixed-l .layui-table-body tr');
		    		if(tr.eq(i).find('.layui-unselect').hasClass('layui-form-checked')){
		    			let data = tr.eq(i).find('.laytable-cell-1-0-1').html();
				      	$('.layui-table-main tr').eq(i).remove();
				      	$('.layui-table-fixed-l .layui-table-body tr').eq(i).remove();
				      	$('.layui-table-fixed-r .layui-table-body tr').eq(i).remove();
		
		    			$.ajax({
				      		type:"get",
				      		url:"/goods_list/delete",
				      		async:true,
				      		data:{
				      			"_id":data
				      		},
				      		success:function(res){
//				      			let goods_length = $('.layui-table-fixed-l .layui-table-body tr').length;
				      			if(res.ok){
				      				init();
				      			}
				      		}
				      	});
		    		};
		    	}
		   })
		});
	}
	
})
