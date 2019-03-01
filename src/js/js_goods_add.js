$(function () {
	layui.use('element', function () {
      var element = layui.element;
    });
    layui.use(['form', 'layedit', 'laydate'], function () {
    });
      // 选择文件并显示预览图
      function handleFileSelect(evt) {
        var img_list = document.getElementById('img_list');
        img_list.innerHTML = '';
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }

          var reader = new FileReader();
          // Closure to capture the file information.
          reader.onload = (function (theFile) {
            return function (e) {
              // Render thumbnail.
              var span = document.createElement('span');
              span.innerHTML = ['<img class="thumb" src="', e.target.result,
                '" title="', escape(theFile.name), '"/>'].join('');
              img_list.appendChild(span, null);
            };
          })(f);
          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
      }
      document.getElementById('goods').addEventListener('change', handleFileSelect, false);

      // 上传图片
      let goods = document.querySelector('#goods');
      // let btn = document.querySelector('.btnSend');
      // let username = document.querySelector('#username');
      $('#btnSend').click(function () {
        let _goods = goods.value;

        let data = new FormData();

        for (let i = 0; i < goods.files.length; i++) {
          data.append('goods', goods.files[i]);
          console.log(goods.files);
        }

        // console.log('username', data.get('username'))
           console.log(data);
        // console.log(data);

        // 文件
        // data.set('goods',goods)
				
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
        	console.log(xhr.responseText);
        }
        xhr.open('post', '/upload', true);
        xhr.send(data);
      })
			var isok = [false,false,false,false,false];
			$('.layui-form').on('blur','input',function () {
				if($(this).hasClass('good_name')){
					let good_name = $('.good_name').val().trim();
					if(good_name.length<=50&&good_name.length>0){
						isok[0] = true;
						$('.name_tip').html('正确的商品名称');
						$('.name_tip').css('color','green');
					}else{
						isok[0] = false;
						$('.name_tip').html('请输入50字以内的商品名称');
						$('.name_tip').css('color','red');
					}
				}
				if($(this).hasClass('good_title')){
					let good_title = $('.good_title').val().trim();
					if(good_title.length<=100&&good_title.length>0){
						isok[1] = true;
						$('.title_tip').html('正确商品副标题');
						$('.title_tip').css('color','green');
					}else{
						isok[1] = false;
						$('.title_tip').html('请输入100字以内的商品名副标题');
						$('.title_tip').css('color','red');
					}
				}
				if($(this).hasClass('good_price')){
					let good_price = $('.good_price').val().trim();
					if(checkReg.floatnumber(good_price)){
						isok[2] = true;
						$('.price_tip').html('正确的商品价格');
						$('.price_tip').css('color','green');
					}else{
						isok[2] = false;
						$('.price_tip').html('输入正确的商品价格');
						$('.price_tip').css('color','red');
					}
				}
				if($(this).hasClass('good_sellprice')){
					let good_sellprice = $('.good_sellprice').val().trim();
					if(checkReg.floatnumber(good_sellprice)){
						isok[3] = true;
						$('.sellprice_tip').html('正确的销售价格');
						$('.sellprice_tip').css('color','green');
					}else{
						isok[3] = false;
						$('.sellprice_tip').html('输入正确的销售价格');
						$('.sellprice_tip').css('color','red');
					}
				}
				if($(this).hasClass('good_kucun')){
					let good_kucun = $('.good_kucun').val().trim();
					if(checkReg.intnumber(good_kucun)){
						isok[4] = true;
						$('.kucun_tip').html('正确的库存格式');
						$('.kucun_tip').css('color','green');
					}else{
						isok[4] = false;
						$('.kucun_tip').html('输入正确的库存格式');
						$('.kucun_tip').css('color','red');
					}
				}
				
			})
			
      $('#layui-btn').click(function () {
        let good_name = $('.good_name').val();
        let good_title = $('.good_title').val();
        let good_price = $('.good_price').val();
        let good_sellprice = $('.good_sellprice').val();
        let good_cate = $('.good_cate').val();
        let good_kucun = $('.good_kucun').val();
        var attr_arr = [];
        var sell_on;
        let good_des = $('.layui-textarea').val();
        for (let i = 0; i < $('.good_attr input').length; i++) {
          if ($('.good_attr input').eq(i).prop('checked')) {
            attr_arr.push($('.good_attr input').eq(i).attr('title'));
          }
        }
        if ($('.good_onsell').prop('checked')) {
          sell_on = 'yes';
        } else {
          sell_on = 'no';
        }
        if(good_cate.length==0){
        	alert('请选择商品分类');
        }
        if(isok.indexOf(false)<0&&good_cate.length>0){
        	
        	$.ajax({
        		type:"post",
        		url:"/goods_add",
        		async:true,
        		data:{
        			goodName : good_name,
        			goodTile : good_title,
        			goodPrice : good_price,
        			goodSellprice : good_sellprice,
        			goodCate : good_cate,
        			goodKucun : good_kucun,
        			goodAttr : attr_arr,
        			sellOn : sell_on,
        			goodDes : good_des
        		},
        		success:function (res) {
        			if(res.ok){
        				alert('添加成功');
        				$('.good_name').val('');
        				$('.good_title').val('');
        				$('.good_price').val('');
        				$('.good_sellprice').val('');
//      				
        				$('.good_kucun').val('');
        				$('.layui-textarea').val('');
        				isok = [false,false,false,false,false];
        			}
        		}
        	});
//      	console.log(good_name, good_title, good_price, good_sellprice, good_cate, good_kucun, attr_arr, sell_on,good_des);
        }
        // console.log($('.good_attr').find('input').prop('checked'));
        // if($('.good_attr').find(input).)
        
        // let good_kucun = $('.good_kucun').val();
        // let good_onsell = $('.good_onsell').val();
      })
//  })()
})
