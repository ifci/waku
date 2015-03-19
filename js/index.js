/*
 * Copyright (c) 2015 JKD TEAM (9koudai.net)
 * @Author: fcdcyy@sina.cn
 *
 * @DateTime: 2015-03-19 20:00:35
 *
 */

//define(function(require,exports,module){
$(function(){
	// 首页事件管理
	$(document).coffee({
        click: {
        	'.menu': function(){
        		$(".menu_nav").toggleClass('menu_v');
        		if($(".menu_v").length > 0){
        			$(".menu_nav").stop().animate({'margin-left': '-205px'})
        		}else{
        			$(".menu_nav").stop().animate({'margin-left': '0'})
        		}
        	},
        	'.filters_c em': function(){
        		$(this).addClass("curr").siblings("em").removeClass("curr");
        	}
    	},
    	mouseover: {
    		'.share a': function(){
    			$(this).find(".share_box").show();
    		},
    		'.top_cart > .top_ap,.top_cbox': function(){
    			var $this = $(this);
    			// var tap = setInterval(function(){
				$(".top_cart").addClass('hover');
    				// clearInterval(tap);
    			// },400)
				var ddli = $(".dd li")
				if(ddli.length > 3){
					$(".top_cbox").addClass('dd_auto');
				}
    		}
    	},
    	mouseout: {
    		'.share a': function(){
    			$(this).find(".share_box").hide();
    		},
    		'.top_cart > .top_ap,.top_cbox': function(){
    			$(".top_cart").removeClass('hover');
    		}
    	}
	})

	// 添加订购模块
	/*var vg = $('<li class="view_g"><a href="#"><div class="view_ic"></div><div class="view_gb"></div></a></li>');*/
	var vg = $('<li>', {
		'class' : 'view_g view_v',
		'html' : '<a href="#"><div class="view_ic"></div><div class="view_gb"></div><div class="view_gv">您身边的私人定制专家</div></a>'
	})
	$("#waku li:eq(1),#waku li:eq(4)").after(vg);

	$("#waku .view_g").last().addClass("view_y");

	// 首页推荐商品列表
	var margin = 20;
	var li = $("#waku li");
	var	li_W = li.eq(0).outerWidth() + margin;
	// 封装一个函数，方便调用
	function waku(){
		var h = [];
		var ow = $(window).outerWidth() > 1260 ? 1260 : $(window).outerWidth();
		var n = ow/li_W|0;
		for( var i = 0; i < li.length; i++ ) {
			li_H = li[i].offsetHeight;
			if( i < n ) {
				h[i] = li_H;
				li.eq(i).css("top",0);
				li.eq(i).css("left",i * li_W);
			}
			else{
				min_H = Math.min.apply(null, h);
				minKey = getarraykey(h, min_H);
				h[minKey] += li_H + margin;
				li.eq(i).css("top",min_H + margin);
				li.eq(i).css("left",minKey * li_W);
			}
		}
		// 计算总的高度
		$("#waku").height(h.max() + "px");
	}
	// 添加一个计算高度的方法
	Array.prototype.max = function(){
        var maxH = 0;
        for( var i = 0; i < this.length; i++ ){
            maxH = Math.max(maxH, this[i]);
        }
        return maxH;
    }
    // 找到高度最小的一项
	function getarraykey(s, v) {
		for( k in s ){
			if( s[k] == v ){
				return k;
			}
		}
	}
	$(window).load(function(){
		$(".txtScroll-top").slide({
			titCell : ".txthd ul",
			mainCell : ".txtbd ul",
			autoPage : true,
			effect : "topLoop",
			autoPlay : true,
			vis : 6
		});
		waku();
	})
	$(window).resize(function(){
		waku();
	})

	$(".jqzoom").imagezoom();
    $("#thumblist").delegate("li","mouseover click",function(){
        $(this).addClass("tb-selected").siblings().removeClass("tb-selected");
        $(".jqzoom").attr('src',$(this).find("img").attr("mid"));
        $(".jqzoom").attr('rel',$(this).find("img").attr("big"));
        $(".jqzoom").imgAuto();
    });
	$(".jqzoom").imgAuto();
	$(".tb-thumb li").imgAuto();

	$("#buynub").Spinner();
	$(".pdtabs").tabs({
		'hd' : '.pdetail_t li',
		'bd' : '.pdetail_s',
		'on' : 'pdetail_on'
	});


	// 登录验证
	$("#login-user-form").validate({
		// debug : true,
		focusCleanup: true,
		focusInvalid: false,
		/*invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? '123'
					: '45 ' + errors + ' fields.  They have been highlighted below';
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},*/
		rules: {
			login_name: {
				required: true/*,
				email: true*/
			},
			password: {
				required: true
			}
		},
		messages: {
			login_name: {
				required: '请输入您注册时的手机号或邮箱',
				email: true
			}
		},
		errorPlacement: function(error, element) {
			element.parent().addClass('error_ui');
		    error.appendTo(element.siblings('.invalid'));
		}
	});

	// 注册验证
	$("#register-form").validate({
		focusCleanup: true,
		rules: {
			info_email: {
				required: true
			},
			info_email_code: {
				required: true
			},
			info_password: {
				required: true
			},
			info_password2: {
				required: true
			},
			info_hash_code: {
				required: true
			}
		}/*,
		messages: {
			login_name: {
				required: '请输入您注册时的手机号或邮箱',
				email: true
			}
		},
		errorPlacement: function(error, element) {
			element.parent().addClass('error_ui');
		    error.appendTo(element.siblings('.invalid'));
		},
		submitHandler:function() {
			alert("Submitted!")
		}*/
	});

	$(".a_color .curr").parent().css('border','1px solid #666');
	/*$('.spec').each(function(){
		$(this).find('.wakupd_info_ty10').first().addClass('wakupd_curr');
		$(this).find('.wakupd_info_ty10').click(function(){
			$(this).addClass('wakupd_curr').siblings('.wakupd_info_ty10').removeClass('wakupd_curr');
		})
	});*/
	$(".choose .item").on('click', function(event) {
		$(this).addClass('selected').siblings('.item').removeClass('selected');
	});
})