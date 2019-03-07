
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
	    ,url:'/user_list/init'
	    ,toolbar: '#toolbarDemo'
	    ,title: '用户数据表'
	    ,cols: [[
	      {type: 'checkbox', fixed: 'left'}
	      ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true}
	      ,{field:'username', title:'用户名', width:80}
	      ,{field:'gender', title:'性别', width:80, sort: true}
	      ,{field:'city', title:'城市', width:100}
	      ,{field:'sign', title:'签名',width:100}
	      ,{field:'zhiye', title:'职业', width:100}
	      ,{field:'experience', title:'评分', width:100, sort: true}
	      ,{field:'regtime', title:'注册时间', width:100}
	      ,{field:'admin', title:'管理员', width:100}
	      ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
	    ]]
	    ,page: true
	  });
	  
	  //头工具栏事件
	   table.on('toolbar(test)', function(obj){
		    var checkStatus = table.checkStatus(obj.config.id)
		    ,data = checkStatus.data; //获取选中的数据
		    console.log(data)
		    function same(a,b){
		    	var arr=[];
			       		for(var i=0;i<data.length;i++){
			       			if(data[i].admin==a||data[i].admin==b){
			       				
			       			}else{
			       				arr.push(data[i]['username']);
			       			}
			       			
			       		}
			       		if(arr.length){
			       			$.ajax({
			       			type:"post",
			       			url:"/user_list/delAll",
			       			async:false,
			       			data:{
			       				arr
			       			},
			       			success:function(now){
			       				if(now.ok){
			       					layer.alert('删除成功');
			       					location.href='user_list.html';
			       				};
			       			}
			       		});
			       		}else{
			       			layer.alert('权限不够');
			       		}
			       		
		    }
			 if(obj.event=='delete'){
			 	if(data.length === 0){
			          layer.msg('请选择一行');
			    } else {
			       if(admin=='big'){
			       		same('big','other');
			       		
			       }else if(admin=='small'){
			       		same('big','small');
			       		
			       		
			       		
			       }   		          
			    }
			 }
		 	

		     
		  });
  
	  
	  //监听行工具事件
	  table.on('tool(test)', function(obj){
	    var data = obj.data;
	    var adminlist=data.admin;
		var username=data.username; 
	    if(obj.event === 'del'){	
	      layer.confirm('真的删除行么', function(index){	
	        if(admin=='big'){
	        	if(adminlist=='big'){
	        		layer.alert('超级管理员不能删除超级管理员');        		
			
	        	}else{
	        		obj.del();
	        		layer.close(index);
	        		$.ajax({
							type: 'get',
							url: '/user_list/del',
							data:{
								username:username
							},
							success: function(now) {
								console.log(now);			
							}
						});
	       			         	
	        	}
	        }else if(admin=='small'){
	        	if(adminlist=='big'||adminlist=='small'){
	        		layer.alert('管理员不能删除超级管理员和管理员');	

	        	}else{
	        		$.ajax({
							type: 'get',
							url: '/user_list/del',
							data:{
								username:username
							},
							success: function(now) {
								console.log(now);			
							}
						});
	        		obj.del();
	        		layer.close(index);	        		      		
	        	}
	        }
	      });
	    } else if(obj.event === 'edit'){
	    	if(username==user.username){
	        		location.href=`user_edit.html?${username}`;
	       		}else{
		       		if(admin=='big'){
		       		
		       			if(adminlist=='big'){
			        		layer.alert('超级管理员之间不能相互编辑资料');        		
			        	}else{
			        		location.href=`user_edit.html?${data.username}`;
			        	}
		       		
		        	
				        }else if(admin=='small'){
				        	
				        	if(adminlist=='big'||adminlist=='small'){
				        		layer.alert('管理员不能编辑超级管理员和其它管理员的资料');        		
				        	}else{
				        		location.href=`user_edit.html?${data.username}`;
				        	}
			        }
	       		
	       	}
	       
	    }
	  });
	  
	});
	$('.layui-layout-body').on('click','.add',function(){
	  	location.href='user_add.html';
	 });
});

