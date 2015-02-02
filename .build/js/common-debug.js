/* 
 * Copyright (c) 2015 JKD TEAM (9koudai.net)
 * Author fcdcyy@sina.cn
 *
 * $Date: 2015-01-14 09:14:17 $
 *
 */
define("js/common-debug", [], function(require, exports, module) {
    (function($) {
        $.fn.extend({
            // coffee方法,事件管理
            coffee: function(obj) {
                for (var eName in obj) for (var selector in obj[eName]) $(this).on(eName, selector, obj[eName][selector]);
            },
            // 首页右侧导航hover提示
            homeTip: function() {
                var $this = this;
                var tip = $(".ydmBar_tip");
                this.hover(function() {
                    $(this).find(tip).show().stop(true).animate({
                        "margin-left": "-90px",
                        opacity: "1"
                    }, 600, "swing", true);
                }, function() {
                    $(this).find(tip).stop(true).animate({
                        "margin-left": "-120px",
                        opacity: "0"
                    }, 600, function() {
                        $(this).hide();
                    });
                });
            },
            // 返回顶部
            bTop: function() {
                this.click(function() {
                    $("html,body").stop(true).animate({
                        scrollTop: 0
                    }, 200);
                });
            },
            // 点击定位跳转
            mScroll: function(id) {
                $("html,body").stop(true).animate({
                    scrollTop: $("#" + id).offset().top
                }, 1e3);
            },
            // 图片自适应的方法
            imgAuto: function() {
                var w, t = this.prop("tagName") == "IMG" ? this : this.find("img");
                t.each(function() {
                    w = $(this).width() >= $(this).height() ? 0 : 1;
                    if (!w) {
                        $(this).css({
                            width: "100%",
                            height: "auto"
                        });
                    } else {
                        $(this).css({
                            width: "auto",
                            height: "100%"
                        });
                    }
                });
            },
            // 数量加减插件
            Spinner: function(opts) {
                var stock = $("#stock").val();
                var defaults = {
                    value: 1,
                    min: 1,
                    len: 3,
                    max: stock
                }, options = $.extend(defaults, opts), keyCodes = {
                    up: 38,
                    down: 40
                };
                return this.each(function() {
                    var a = $(this).find(".sub");
                    var c = $(this).find(".add");
                    var b = $(this).find("#buy_num");
                    cv(0);
                    //值
                    $(this).append(a).append(b).append(c);
                    a.click(function() {
                        cv(-1);
                    });
                    b.keyup(function() {
                        cv(0);
                    });
                    c.click(function() {
                        cv(+1);
                    });
                    b.bind("keyup paste change", function(e) {
                        e.keyCode == keyCodes.up && cv(+1);
                        e.keyCode == keyCodes.down && cv(-1);
                    });
                    function cv(n) {
                        b.val(b.val().replace(/[^\d]/g, ""));
                        bv = parseInt(b.val() || options.min) + n;
                        bv >= options.min && bv <= options.max && b.val(bv);
                        if (bv <= options.min) {
                            b.val(options.min);
                            a.addClass("pd_reduce_s");
                        } else {
                            a.removeClass("pd_reduce_s");
                        }
                        if (bv >= options.max) {
                            b.val(options.max);
                            c.addClass("pd_add_s");
                        } else {
                            c.removeClass("pd_add_s");
                        }
                    }
                });
                function f(o, t, c, s) {
                    t == 0 && o.addClass(c).attr("href", "javascript:void(0)").append("<i></i>").find("i").append(s);
                    t == 1 && o.addClass(c).attr({
                        value: options.value,
                        autocomplete: "off",
                        maxlength: options.len
                    });
                    t == 2 && o.addClass(c).removeClass(s);
                }
            },
            // 切换卡效果
            tabs: function(opts) {
                var defaults = {
                    hd: ".hd li",
                    bd: ".bd",
                    on: "on",
                    trigger: "click"
                }, options = $.extend(defaults, opts);
                return this.each(function() {
                    var t = $(this);
                    var s = 0;
                    var hd = $(options.hd, t);
                    var bd = $(options.bd, t);
                    var on = $("." + options.on, t);
                    bd.hide().eq(on.index()).show();
                    hd.click(function() {
                        s = $(this).index();
                        hd.removeClass(options.on);
                        $(this).addClass(options.on);
                        bd.hide().eq(s).show();
                    });
                });
            }
        });
        jQuery.extend(jQuery.validator.messages, {
            required: "必选字段",
            remote: "请修正该字段",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
            minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
            rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
            range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: jQuery.validator.format("请输入一个最大为{0} 的值"),
            min: jQuery.validator.format("请输入一个最小为{0} 的值")
        });
    })(jQuery);
});