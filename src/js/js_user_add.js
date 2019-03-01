
$(function(){
	layui.use('element', function() {
	var element = layui.element;
});
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
//验证用户名
var istrue1=false;
$('#username').blur(function(){
	var name=$(this).val();
	if(name){
		if(checkReg.accountNum(name)){
			$.ajax({
			type: 'get',
			url: '/user_add/username',
			data: {
				username: name,		
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
		
	}else{
		$('#usernameOut').html('用户名不能为空').css('color','red');
		istrue1=false;
	}
});
//验证昵称
var istrue2=false;
$('#nickname').blur(function(){
	var _nikename=$(this).val();
	if(_nikename){
		if(checkReg.nikename(_nikename)){
			$('#nicknameOut').html('可以注册').css('color','green');
			istrue2=true;
		}else{
			$('#nicknameOut').html('昵称至少一个中文,且只能为中文').css('color','red');
			istrue2=false;
		}
		
	}else{
		$('#nicknameOut').html('昵称不能为空').css('color','red');
		istrue2=false;
	}

});
//密码验证
var istrue3=false;
$('#password').blur(function(){
	var _password=$(this).val();
	if(_password){
		if(checkReg.psweasy(_password)){
			$('#passwordOut').html('可以注册').css('color','green');
			istrue3=true;
		}else{
			$('#passwordOut').html('密码为6-18位数，且首字母开头').css('color','red');
			istrue3=false;
		}
		
	}else{
		$('#passwordOut').html('密码不能为空').css('color','red');
		istrue3=false;
	}

});
//确认密码
var istrue4=false;
$('#again_psw').blur(function(){
	var _again_psw=$(this).val();
	if(_again_psw){
		if(checkReg.pswagain(_again_psw,$('#password').val())){
			$('#again_pswOut').html('可以注册').css('color','green');
			istrue4=true;
		}else{
			$('#again_pswOut').html('密码不一致，请重新输入 ').css('color','red');
			istrue4=false;
		}
		
	}else{
		$('#again_pswOut').html('不能为空').css('color','red');
		istrue4=false;
	}

});

//手机号码
var istrue5=false;
$('#phone').change(function(){
	var _phone=$(this).val();
	if(_phone){
		if(checkReg.tel(_phone)){
			$.ajax({
			type: 'get',
			url: '/user_add/phone',
			data: {
				phone: _phone,		
			},
			success: function(now) {
				console.log(now);
				if(now=='yes'){
					istrue5=true;
					alert('可以注册');
				}else{							
					istrue5=false;	
					alert('手机号已存在');
				}
			}
		});
		}else{	
			istrue5=false;
			alert('手机号格式不对');		
		}
		
	}else{	
			istrue5=false;
			alert('手机号格式不对');		
	}
});
//生日不能为空
//var istrue6=false;
//$('#date').change(function(){
//	var _date=$(this).val();
//	if(_date){
//		istrue6=true;
//		alert('可以注册');	
//	}else{
//		istrue6=false;
//		alert('时间不能为空');
//	}
//});
//邮箱验证
var istrue7=false;
$('#email').blur(function(){
	var _email=$(this).val();
	if(_email){
		if(checkReg.email(_email)){
			$('#emailOut').html('可以注册').css('color','green');		
			istrue7=true;
		}else{
			istrue7=false;
		$('#emailOut').html('邮箱格式应为xxxx@xx.xx').css('color','red');	
		}
		
	}else{	
			istrue7=false;
		$('#emailOut').html('邮箱不能为空').css('color','red');
	}
});
//点击登录
$('#btn').click(function(){

	if(istrue1&&istrue2&&istrue3&&istrue4&&istrue5&&istrue7&&$('#date').val()){
		$.ajax({
			type: 'post',
			url: '/user_add/insert',
			data: {
				username:$('#username').val(),
				nickname:$('#nickname').val(),
				password:$('#password').val(),
				phone:$('#phone').val(),
				gender:$('#gender').val(),
				birsthday:$('#date').val(),
				email:$('#email').val(),
				text:$('#text').val()
			},
			success: function(now) {
				
				if(now.ok=1){
					$('#username').val('');		
					$('#nickname').val('');
					$('#password').val('');
					$('#again_psw').val('');
					$('#phone').val('');
					$('#date').val('');
					$('#email').val('');
					$('#text').val('');
					alert('注册成功');		
				}else{
					alert('注册失败');	
				}
			}
		});
	}else{
		alert('请重新核对信息,除备注外都不能为空');
	}
	
});

});

