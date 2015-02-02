/*
 *
 * Copyright (c) 2015 JKD TEAM (9koudai.net)
 * Author fcdcyy@sina.cn
 *
 * $Date: 2015-01-14 09:14:17 $
 *
 */

$(function(){
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
	// 选择收货地址
	$("#path_list dl:not(.add)").bind({
	    click: function() {
	        $(this).addClass('default').siblings('dl').removeClass('default');
	    },
	    mouseover: function() {
	        $(this).children('.ubtn').show();
	        $(this).find('.def').show();
	    },
	    mouseout: function() {
	        $(this).children('.ubtn').hide();
	        $(this).find('.def').hide();
	    }
	});

	// 添加新地址
	function path_add() {
	    var ow = $(window).width();
	    var oh = $(window).height();
	    var iw = $("#path_window").width();
	    var ih = $("#path_window").height();
	    $("#path_window > h3").text('创建收货地址');
	    $("#path_window,#lock").show();
	    $("#path_window").css({
	        'left': (ow - iw) / 2,
	        'top': (oh - ih) / 2
	    });
	}
	$("#path_list dl.add").click(function() {
	    path_add();
	});

	// 修改收货地址
	$("#path_list .ubtn .update").bind('click',
	function(event) {
	    path_add();
	    $("#path_window > h3").text('编辑收货地址');
	});

	// 关闭弹出层
	$("#path_window i.close,#lock").bind('click',
	function(event) {
	    $("#path_window,#lock").hide();
	});

	// 快递配送时间修改
	$(".time .update").bind('click',
	function(event) {
	    $(this).hide().parent().next().hide().next().show();
	});

	// 快递配送时间选择
	$("#time_opened dl").bind('click',
	function(event) {
	    $(this).parent().hide().prev().show().prev().children('b').show();
	    $(this).addClass('on').siblings('dl').removeClass('on');
	    var oText = $(this).children('dt').text();
	    $(this).parent().prev().children('p').text(oText);
	});

	// 支付方式手风琴效果
	$(".info .bank-list:gt(0)").css('border-top-style', 'none');
	$(".info .bank-list h3").bind('click', function(event) {
		$(".info h3").removeClass("bank_lion");
		$(this).addClass('bank_lion');
		var lion = $('.bank_lion').parent().index();
	    //if ($(this).find('.bank_radio').attr('checked')) {
	        $(this).parent('.bank-list').addClass('bank_on').siblings('.bank-list').removeClass('bank_on');
	        $(this).parent('.bank_on').css({
	            'border-top-style': 'solid',
	            'border-bottom-style': 'solid'
	        }).siblings('.bank-list').css({
	            'border-top-style': 'none'
	        });
	        $(".info .bank-list:eq(0)").css('border-top-style', 'solid');
	        /*$(".info .bank-list:eq(2)").css('border-bottom-style', 'solid');*/
	    // }
	});

	// 支付方式选择
	$(".info .bank-list li").bind('click',
	function(event) {
	    $(this).addClass('selected').siblings('li').removeClass('selected');
	});

	// 是否开具发票
	$("#invoice .update").bind('click',
	function(event) {
	    $(this).hide();
	    $("#invoice_need_save,#time_closed").hide();
	    $('#invoice_need').show();
	});
	$("#invoice_need_edit .save").bind('click',
	function(event) {
	    var invoice_title = $('#invoice_need_edit_cop_title').val() ? $('#invoice_need_edit_cop_title').val() : $("input[name='invoice[title]']:checked").val();
	    var invoice_con = $('input:radio[name=invoice_need_edit_content]:checked').val();
	    $("#invoice_need_save_title").text(invoice_title);
	    $("#invoice_need_save_content").text(invoice_con);
	    $("#invoice_need_save").show();
	    $("#invoice_need").hide();
	    $(this).parents("#invoice_need").siblings('h3').children('.update').show();
	});
	$(".invoice_no").bind('click',
	function(event) {
	    $(this).parents("#invoice_need").hide().siblings('#time_closed').show().siblings('h3').children('.update').show();
	});
	$("#invoices").on('click',function() {
	    if ($("input[name='invoice[title]']:checked").val() == '公司') {
	        $("#invoice_need_edit_cop_title").show();
	    } else {
	        $("#invoice_need_edit_cop_title").hide();
	    }
	})

	$(".quantity-form").Spinner();
})