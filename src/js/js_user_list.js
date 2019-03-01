
$(function(){
		
//		$.ajax({
//			type: 'post',
//			url: '/user_list/init',
//			success: function(now) {
//				console.log(now)
//			}
//			});
	  layui.use('table', function(){
	  var table = layui.table;
	  table.render({
	    elem: '#test'
	    ,url:'../json/user.json'
	    ,toolbar: '#toolbarDemo'
	    ,title: '用户数据表'
	    ,cols: [[
	      {type: 'checkbox', fixed: 'left'}
	      ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
	      ,{field:'username', title:'用户名', width:80, edit: 'text'}
	      ,{field:'gender', title:'性别', width:80, edit: 'text', sort: true}
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
	    //console.log(obj)
	    if(obj.event === 'del'){
	      layer.confirm('真的删除行么', function(index){
	        obj.del();
	        layer.close(index);
	      });
	    } else if(obj.event === 'edit'){
	      layer.prompt({
	        formType: 2
	        ,value: data.email
	      }, function(value, index){
	        obj.update({
	          email: value
	        });
	        layer.close(index);
	      });
	    }
	  });
	});
	  
});

