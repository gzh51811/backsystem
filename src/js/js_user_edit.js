$(function(){
	layui.use('element', function() {
	var element = layui.element;
});
let user = localStorage.getItem('user');

        if(!user){
            user = {}
        }else{
            user = JSON.parse(user);
        }
        let admin=user.admin;
layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;
	//日期
	laydate.render({
		elem: '#date'
	});
	laydate.render({
		elem: '#date1'
	});
});
	var name=(location.href).split('?')[1];
	if(name){
		
	}else{
		name=user.username;
	}
	$.ajax({
			type: 'get',
			url: '/user_edit/init',
			data: {
				username: name		
			},
			success: function(now) {

				$('#username').val(now[0]['username'])
				$('#nickname').val(now[0]['nickname'])
				$('#password').val(now[0].password);
				$('#phone').val(now[0].phone);
				$('#gender').val(now[0].gender);
				$('#date').val(now[0].birsthday);
				$('#email').val(now[0].email);
				$('#text').val(now[0].text);
				$('#guanliyuan').val(now[0].admin);
			}
		});
		
		$('#guanliyuan').click(function(){
			if(admin=='big'){
				if($(this).val()=='big'){
				layer.alert('超级管理员不用修改啦');
				$(this).prop('disabled','disabled');
			}else if($(this).val()=='small'){
			
				let adm=confirm('是否修改为普通用户');
				if(adm){
					$('#guanliyuan').val(' ');
				}else{
					$('#guanliyuan').val('small');
					
				}
			}else if($(this).val()==' '){
			
				let adm=confirm('是否修改为管理员');
				if(adm){
					$(this).val('small');
				}else{
					$(this).val(' ');
					
				}
			}
			}else{
				layer.alert('暂无权限');
				$(this).prop('disabled','disabled');
				
			}
			
		});
		//用户名
		var istrue1=true;

		$('#username').change(function(){			
				var username=$(this).val();
				console.log(username,name)
				if(username){
					if(username==name){
						istrue1=true;
						layer.alert('用户名跟原来一样，不用修改');
					}else{ 
						if(checkReg.accountNum(username)){
					$.ajax({
					type: 'get',
					url: '/user_add/username',
					data: {
						username: username,		
					},
					success: function(now) {
						console.log(now);
						if(now=='yes'){
							$('#usernameOut').html('可以注册').css('color','green');
							istrue1=true;					
						}else{
							$('#usernameOut').html('用户名已存在').css('color','red');
							istrue1=false;	
						}
					}
				});
		}else{
			$('#usernameOut').html('请输入6到20位数，且只能为数字、字母、下划线').css('color','red');
			istrue1=false;
		}
						
					}
					
				}else{
					$('#usernameOut').html('用户名不能为空').css('color','red');
					istrue1=false;
				}
			});
		$('#btn').click(function(){
			if(istrue1){
						$.ajax({
					type: 'post',
					url: '/user_edit/update',
					data:{
						username:$('#username').val(),
						nickname:$('#nickname').val(),
						password:$('#password').val(),
						phone:$('#phone').val(),
						gender:$('#gender').val(),
						birsthday:$('#date').val(),
						email:$('#email').val(),
						text:$('#text').val(),
						user:name,
						admin:$('#guanliyuan').val()
					},
					success: function(now) {
						console.log(now);
						layer.alert('更改成功');
					}
				});
			}else{
				layer.alert('请重新检查')
			}
			
		});
		

		
		
});