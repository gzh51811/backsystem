$(function(){
		let user = localStorage.getItem('user');
        if(!user){
            user = {}
        }else{
            user = JSON.parse(user);
        }
        let admin=user.admin;
	  layui.use('table', function(){
	  var table = layui.table;
	  table.render({
	    elem: '#test'
	    ,url:'/order_list/init?shangjia='+user.username
	    ,toolbar: '#toolbarDemo'
	    ,title: '用户数据表'
	    ,cols: [[
	      {type: 'checkbox', fixed: 'left'}
	      ,{field:'bianhao', title:'订单编号', width:150, fixed: 'left', unresize: true}
	      ,{field:'username', title:'收货人', width:80}
	      ,{field:'yingfu', title:'应付金额', width:80, sort: true}
	      ,{field:'zhifu', title:'支付状态', width:100}
	      ,{field:'fahuo', title:'发货状态',width:100}
	      ,{field:'qianshou', title:'签收状态', width:100}
	      ,{field:'time', title:'下单时间', width:100, sort: true}
	      ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
	    ]]
	    ,page: true
	  });
	  
	  //头工具栏事件
	   table.on('toolbar(test)', function(obj){
		    var checkStatus = table.checkStatus(obj.config.id)
		    ,data = checkStatus.data; //获取选中的数据
			 if(obj.event=='delete'){
			 	if(data.length === 0){
			          layer.msg('请选择一行');
			    } else {
			       	var arr=[];
		    for(var i=0;i<data.length;i++){
		    	arr.push(data[i].bianhao);
		    }
   			$.ajax({
	   			type:"post",
	   			url:"/order_list/delAll",
	   			async:false,
	   			data:{
	   				arr
	   			},
	   			success:function(now){
	   				if(now.ok){
	   					layer.alert('删除成功');
	   					location.href='order_list.html';
	   				};
	   			}
	   		});	          
			    }
			 }   
		  });

	  
	  //监听行工具事件
	  table.on('tool(test)', function(obj){
	    var data = obj.data;
	    if(obj.event === 'del'){	
	      layer.confirm('真的删除行么', function(index){	
	       			 obj.del();
	        		layer.close(index);
	        		$.ajax({
							type: 'get',
							url: '/order_list/del',
							data:{
								bianhao:data.bianhao
							},
							success: function(now) {
								if(now.ok){
				   					layer.alert('删除成功');
				   					location.href='order_list.html';
				   				};			
							}
						});
	   	});
	    }else if(obj.event === 'edit'){
	    	 var old=[data.zhifu,data.fahuo,data.qianshou]
	       	layer.prompt({
	        formType: 2
	        ,value: old
	      }, function(value, index){
	      	var arr=value.split(',');
	        obj.update({
	          zhifu: arr[0],
	          fahuo: arr[1],
	          qianshou: arr[2]
	        });
	        layer.close(index);
	        if(old!=arr){
	        	$.ajax({
					type: 'post',
					url: '/order_list/insert',
					data: {
						zhifu: arr[0],
			         	 fahuo: arr[1],
			          	qianshou: arr[2],
			          	username:data.username,
			          	shangjia:user.username
					},
					success: function(now) {
						
						if(now.ok==1){
							alert('更改成功');		
						}else{
							alert('更改失败');	
						}
					}
				});
	        }
	      });
	    }
	
	  });
	});
});