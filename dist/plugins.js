define("js/asyncbox", [], function(require, exports, module) {
    /*
 * AsyncBox jQuery Popup-Plugin v1.5 Beta
 * Copyright 2012, Wuxinxi007
 * Date: 2012-3-13 http://asyncui.com
 */
    window.popup = window.asyncbox = {
        //动画效果
        Flash: true,
        //遮挡 select (ie6)
        inFrame: false,
        //初始索引值
        zIndex: 1987,
        //自适应最小宽度
        minWidth: 330,
        //自适应最大宽度
        maxWidth: 700,
        //模态层
        Cover: {
            //透明度
            opacity: 0,
            //背景颜色
            background: "#000"
        },
        //按钮文本
        Language: {
            //action 值 ok
            OK: "确&nbsp;定",
            //action 值 no
            NO: "否(N)",
            //action 值 yes
            YES: "是(Y)",
            //action 值 cancel
            CANCEL: "取&nbsp;消",
            //action 值 close
            CLOSE: "关&nbsp;闭"
        }
    };
    (function(a) {
        function c(a) {
            return F.getElementById(a);
        }
        function d() {
            var a = F.body, b = F.documentElement;
            return {
                x: Math.max(a.scrollWidth, b.clientWidth),
                y: Math.max(a.scrollHeight, b.clientHeight),
                top: Math.max(b.scrollTop, a.scrollTop),
                left: Math.max(b.scrollLeft, a.scrollLeft),
                width: b.clientWidth,
                height: b.clientHeight
            };
        }
        function e(a) {
            var b = a.style, c = "documentElement.scroll";
            Y ? (b.removeExpression("top"), b.removeExpression("left"), b.setExpression("top", "eval(" + c + "Top + " + (a.offsetTop - N.scrollTop) + ') + "px"'), 
            b.setExpression("left", "eval(" + c + "Left + " + (a.offsetLeft - N.scrollLeft) + ') + "px"')) : b.position = "fixed";
        }
        function f() {
            for (var a = 0, b = arguments.length; a < b; a += 1) Q && arguments[a] && Q.appendChild(arguments[a]);
            return Q;
        }
        function g(a) {
            var b = [], c;
            for (c in a) b.push(c + "=" + a[c]);
            return b.join("&");
        }
        function h(a) {
            if (a.args) {
                var b = "", c = "", d = document.createElement("a");
                return d.href = a.url, c = d.href, b = typeof a.args == "string" ? a.args : g(a.args), 
                c.indexOf("#") >= 0 && (c = c.substr(0, c.indexOf("#"))), c.indexOf("?") >= 0 && (c = c.substr(0, c.indexOf("?"))), 
                c + d.search + (d.search ? "&" + b : "?" + b) + d.hash;
            }
            return a.url;
        }
        function i(b) {
            j(a.extend({
                title: "操作提醒",
                content: "",
                top: -1,
                right: -1,
                bottom: -1,
                left: -1,
                width: "auto",
                height: "auto",
                args: !1,
                node: {},
                wrap: !1,
                "float": !1,
                timer: !1,
                ctrlbar: {
                    close: !0
                },
                buttons: !1,
                pageMode: !1,
                htmlMode: !1,
                inputMode: !1,
                drag: !0,
                cache: !1,
                fixed: !1,
                reset: !1,
                flash: !1,
                modal: !1,
                scroll: !0,
                onload: a.noop,
                unload: a.noop,
                callback: a.noop
            }, b));
        }
        function j(b) {
            a(function() {
                if ($) {
                    var d = b.id, e = c(d);
                    m(b);
                    if (e) {
                        e.style.zIndex = D.zIndex++;
                        if (typeof b.content == "object") {
                            var f = b.content, g = c(b.id + "_content");
                            a.each(L, function(a, c) {
                                c.id == b.id && (c.wrap = {
                                    key: f,
                                    value: f.innerHTML
                                }, g.innerHTML = c.wrap.value, f.innerHTML = "");
                            });
                        }
                        a(e).show();
                    } else {
                        a(Q).append("<div id=" + d + ' class="asyncbox" style="top:-5000px;left:-5000px;z-index:' + D.zIndex++ + '">' + n(b) + "</div>"), 
                        b.abo = a("#" + d)[0];
                        var h = 0, i, j = b.abo.getElementsByTagName("*"), l = j.length;
                        for (;h < l; h++) i = j[h].className, i && (i = i.split("ab_border ab_")[1] || i.split("ab_")[1], 
                        b.node[i] = j[h]);
                        if (Y && b.node.lt.currentStyle.png) {
                            var e, o, p, q = b.node.outer;
                            for (var r = 0; r < 3; r++) for (var u = 0; u < 3; u++) e = q.rows[r].cells[u], 
                            p = e.currentStyle.png, p && (o = e.runtimeStyle, o.backgroundImage = "none", o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + $ + "skins/" + p + "',sizingMethod='scale')");
                        }
                        v(b), t(b), a("#" + d).mousedown(function(a) {
                            a.which == 1 && (this.style.zIndex = D.zIndex++);
                        }), s(b), b.drag && k(b), b.timer && (b.timeobj = window.setTimeout(function() {
                            b.timeobj && c(b.id) && D.close(b.id);
                        }, b.timer * 1e3)), L.push(b), w(b);
                    }
                }
            });
        }
        function k(b) {
            function f(a) {
                y && (y = !1, x.display = "block"), u = a.clientX - s, v = a.clientY - t, u < o ? u = o : u > r && (u = r), 
                v < n ? v = n : v > p && (v = p), v < n && (v = n), u < o && (u = o), els.top = v + "px", 
                els.left = u + "px";
            }
            function g() {
                l(!1), b.drag.clone && (D.Flash ? q(i, {
                    top: el.offsetTop,
                    left: el.offsetLeft,
                    fixed: b.fixed
                }) : (j.top = el.offsetTop + "px", j.left = el.offsetLeft + "px"), x.display = "none"), 
                Y && b.fixed && e(i), X && el.releaseCapture ? (el.releaseCapture(), el.onmousemove = null, 
                el.onmouseup = null) : a(F).unbind("mousemove", f).unbind("mouseup", g);
            }
            var h = b.id, i = el = c(h), j = els = el.style, k, m, n, o, p, r, s, t, u, v, n, o, p, r, w = T, x = w.style, y = !1;
            a("#" + h + "_header").css({
                cursor: "move"
            }), a("#" + h + "_header").mousedown(function(c) {
                c.which == 1 && c.target.tagName != "A" && (k = d(), l(b, !0), el = i, els = i.style, 
                m = {
                    top: el.offsetTop,
                    left: el.offsetLeft,
                    width: el.offsetWidth,
                    height: el.offsetHeight
                }, b.drag.clone && (!Y && b.fixed && (x.position = "fixed"), x.top = m.top + "px", 
                x.left = m.left + "px", x.width = m.width - 2 + "px", x.height = m.height - 2 + "px", 
                el = w, els = w.style, y = !0), s = c.clientX - m.left, t = c.clientY - m.top, !Y && b.fixed ? (n = 0, 
                o = 0, p = k.height - m.height, r = k.width - m.width) : (n = k.top, o = k.left, 
                p = k.height + n - m.height, r = k.width + o - m.width), X && el.setCapture ? (el.setCapture(), 
                el.onmousemove = function(a) {
                    f(a || event);
                }, el.onmouseup = g) : a(F).bind("mousemove", f).bind("mouseup", g)), c.preventDefault();
            });
        }
        function l(a, b) {
            var c = U, d = c.style;
            a ? b && (d.display = "block") : d.display = "none";
        }
        function m(a) {
            a.modal && (J.push(D.zIndex), K.push(a.id), D.cover(!0, D.zIndex));
        }
        function n(a) {
            return [ D.inFrame && Y || X && a.float ? '<iframe frameborder="0" src="about:blank" style="position:absolute;top:0px;left:0px;z-index:-1;width:100%;height:100%;_width:expression(this.parentNode.offsetWidth);_height:expression(this.parentNode.offsetHeight);opacity:0;filter:alpha(opacity=0)"></iframe>' : "", '<table class="ab_outer" border="0" cellspacing="0" cellpadding="0">', "<tbody>", "<tr>", '<td class="ab_border ab_lt"></td>', '<td class="ab_border ab_t"></td>', '<td class="ab_border ab_rt"></td>', "</tr>", "<tr>", '<td class="ab_border ab_l"><div></div></td>', '<td valign="top" class="ab_c">', a.title ? '<div class="ab_title" id="' + a.id + '_header">' + a.title + (a.ctrlbar.close ? '<a id="' + a.id + '_close" class="ab_close" href="javascript:void(0)" title="' + D.Language.CLOSE + '"></a>' : "") + "&nbsp;</div>" : "", a.pageMode ? "" : a.inputMode ? '<div class="' + G + 'prompt">' + "<ul>" + "<li>" + a.inputMode.tips + "</li>" + "<li>" + (a.textType == "text" ? '<input type="text" id="' + a.id + '_Text" value="' + a.inputMode.content + '" size="60" />' : "") + (a.textType == "textarea" ? '<textarea cols="60" rows="10" id="' + a.id + '_Text">' + a.inputMode.content + "</textarea>" : "") + (a.textType == "password" ? '<input type="password" id="' + a.id + '_Text" value="' + a.inputMode.content + '" size="40" />' : "") + "</li>" + "</ul>" + "</div>" : a.htmlMode ? '<div id="' + a.id + '_content" style="overflow:' + (a.scroll ? "auto" : "hidden") + '">' + o(a) + "</div>" : '<div id="' + a.id + '_content" style="overflow:hidden;overflow-y:auto"><div class="' + a.icon + '"><span></span>' + a.content + "</div></div>", a.pageMode ? '<iframe marginWidth="0" marginHeight="0" frameborder="0" id="' + a.id + '_content" name="' + a.id + '_content" width="100%" src="' + h(a) + '" scrolling="' + (a.scroll ? "auto" : "no") + '"></iframe>' : "", a.buttons ? '<div class="ab_footbar" id="' + a.id + '_btnsbar">' + r(a) + "</div>" : "", "</td>", '<td class="ab_border ab_r"><div></div></td>', "</tr>", "<tr>", '<td class="ab_border ab_lb"></td>', '<td class="ab_border ab_b"></td>', '<td class="ab_border ab_rb"></td>', "</tr>", "</tbody>", "</table>" ].join("");
        }
        function o(a) {
            var b = a.content;
            return typeof b == "object" && b ? (a.wrap = {
                key: b,
                value: b.innerHTML
            }, b.innerHTML = "", a.wrap.value) : b;
        }
        function p(a) {
            a.wrap && (a.wrap.key.innerHTML = a.wrap.value, a.wrap = !1);
        }
        function q(b, c) {
            a(b).animate(c, 300, function() {
                Y && c.fixed && e(b);
            });
        }
        function r(b) {
            if (b.buttons) {
                var c = [];
                return a.each(b.buttons, function(a, d) {
                    c.push('<a id="', b.id, "_", d.result, '" href="javascript:void(0)"><span>&nbsp;', d.value, "&nbsp;</span></a>");
                }), c.join("");
            }
        }
        function s(b) {
            b.inputMode ? a("#" + b.id + "_Text").focus().select() : b.buttons && a("#" + b.id + "_btnsbar").find("a")[0].focus();
        }
        function t(b) {
            var d, e = D.btn.CLOSE.concat(b.buttons);
            a.each(e, function(e, f) {
                a("#" + b.id + "_" + f.result).click(function(e) {
                    var g = a(this);
                    return g.attr("disabled", "disabled"), b.inputMode ? d = b.callback(f.result, c(b.id + "_Text").value) : b.pageMode ? D.opener(b.id) ? d = b.callback(f.result, D.opener(b.id), b.abo.returnValue) : d = !0 : b.htmlMode ? d = b.callback(f.result, b.abo.returnValue) : d = b.callback(f.result), 
                    (typeof d == "undefined" || d) && D.close(b.id), g.removeAttr("disabled"), e.preventDefault(), 
                    !1;
                });
            });
        }
        function u(a) {
            var b = c(a + "_content");
            if (b) {
                try {
                    var d = E.contentWindow.document;
                    d.write(""), d.clear(), d.close();
                } catch (e) {}
                b.src = "about:blank";
            }
        }
        function v(a) {
            x(a), z(a);
        }
        function w(b) {
            if (b.pageMode) {
                var c = a("#" + b.id + "_content"), d = c[0], e = b.abo;
                e.options = b, e.data = b.data, e.opener = b.opener || window, e.close = function() {
                    D.close(this.id);
                }, e.join = function(a) {
                    return D.opener(a);
                }, e.buttons = b.buttons ? a("#" + b.id + "_btnsbar").find("a") : "undefined", d.api = e, 
                c.one("load", function() {
                    try {
                        if (b.width == "auto" && b.height == "auto") {
                            var c = a(this).contents();
                            asyncbox.resizeTo(b.id, c.width(), c.height());
                        }
                        b.onload(d.contentWindow);
                    } catch (e) {}
                });
            } else b.htmlMode && b.onload();
        }
        function x(b) {
            var e = b.id, f = c(e), g = f.style, h = d(), i = a("#" + e + "_content");
            b.pageMode || b.htmlMode ? (typeof b.width == "number" && i.width(b.width), typeof b.height == "number" && i.height(b.height), 
            typeof b.width == "string" && b.width != "auto" && i.width(parseInt(b.width) - f.offsetWidth + i[0].offsetWidth), 
            typeof b.height == "string" && b.height != "auto" && i.height(parseInt(b.height) - f.offsetHeight + i[0].offsetHeight)) : f.offsetWidth < D.minWidth && !b.inputMode ? i.width(D.minWidth - f.offsetWidth + i.outerWidth()) : f.offsetWidth > D.maxWidth && i.width(D.maxWidth - f.offsetWidth + i.outerWidth());
        }
        function y(a, b) {
            var c = a.abo, f = c.style, g, h, i, j = d(), k = c.offsetWidth, l = c.offsetHeight, m = j.top, n = j.left, o = j.width, p = j.height;
            a.center ? i = (p - l) / 2 : i = l > p / 2 ? (p - l) / 2 : p * .382 - l / 2, !Y && a.fixed ? (g = i, 
            h = (o - k) / 2, a.top >= 0 && (g = a.top), a.left >= 0 && (h = a.left), a.right >= 0 && (h = o - k - a.right), 
            a.bottom >= 0 && (g = p - l - a.bottom), g = g < 0 ? 0 : g, h = h < 0 ? 0 : h) : (g = m + i, 
            h = n + (o - k) / 2, a.top >= 0 && (g = m + a.top), a.left >= 0 && (h = n + a.left), 
            a.right >= 0 && (h = n + o - k - a.right), a.bottom >= 0 && (g = m + p - l - a.bottom), 
            g = g < m ? m : g, h = h < n ? n : h), b ? q(c, {
                top: g,
                left: h
            }) : (f.top = g + "px", f.left = h + "px", a.fixed && e(c));
        }
        function z(a) {
            y(a, null, !1), a.reset && A(a);
        }
        function A(b) {
            var c = new Object();
            c.id = b.id, c.top = b.top, c.right = b.right, c.bottom = b.bottom, c.left = b.left, 
            c.flash = b.flash, M.push(c), M.length > 0 && !H && (a(E).bind("resize", bb), H = !0);
        }
        function B(b, c, d) {
            return a.grep(b, function(a) {
                return d ? a[d] != c : a != c;
            });
        }
        function C(a, b, c, d) {
            var e = G + d, f = {
                id: e,
                icon: e,
                title: b,
                reset: !0,
                modal: !0,
                content: a,
                callback: c
            };
            if (d == "alert" || "success" || "error") f.buttons = D.btn.OK;
            switch (d) {
              case "confirm":
                f.buttons = D.btn.OKCANCEL;
                break;

              case "warning":
                f.buttons = D.btn.YESNOCANCEL;
            }
            i(f);
        }
        var D = asyncbox, E = window, F = document, G = "asyncbox_", H = !1, I = !1, J = [], K = [], L = [], M = [], N = F.documentElement, O, P = document.createElement("link"), Q = document.createElement("licai"), R = document.createElement("ab_skins"), S = document.createElement("ab_modal"), T = document.createElement("ab_clone"), U = document.createElement("ab_cover"), V = N.clientWidth, W = N.clientHeight, X = !!E.ActiveXObject, Y = X && !E.XMLHttpRequest, Z, $ = function(a, b, c, d) {
            c = a.length;
            for (;b < c; b++) {
                d = document.querySelector ? a[b].src : a[b].getAttribute("src", 4);
                if (d.substr(d.lastIndexOf("/")).indexOf("asyncbox") >= 0) break;
            }
            return d = d.split("?"), Z = d[1], d[0].substr(0, d[0].lastIndexOf("/") + 1) || !1;
        }(document.getElementsByTagName("script"), 0), _ = function(a) {
            if (Z) {
                var b = Z.split("&"), c = 0, d = b.length, e;
                for (;c < d; c++) {
                    e = b[c].split("=");
                    if (a === e[0]) return e[1];
                }
            }
            return null;
        }, ab = _("skin") || "default";
        if (document.compatMode == "CSS1Compat" && $) {
            var ba = "expression(documentElement.", cb = [ "position:", Y ? "absolute;" : "fixed;", Y ? "top:" + ba + "scrollTop);" : "top:0px;", Y ? "left:" + ba + "scrollLeft);" : "left:0px;", Y ? "width:" + ba + "clientWidth);" : "width:100%;", Y ? "height:" + ba + "clientHeight);" : "height:100%;", "background:" + D.Cover.background + ";opacity:" + D.Cover.opacity + ";filter:alpha(opacity=" + D.Cover.opacity * 100 + ");", "display:none;overflow:hidden;" ].join("");
            Q.setAttribute("version", "1.5"), Q.setAttribute("url", "http://blog.51edm.org"), 
            R.innerHTML = "<ul><li><a><b></b></a></li></ul>", R.style.cssText = "position:absolute;top:-5000px;left:-5000px", 
            S.style.cssText = cb, S.setAttribute("unselectable", "on"), S.onmousedown = function() {
                return !1;
            }, T.style.cssText = "position:absolute;z-index:" + (D.zIndex + 900) + ";display:none", 
            U.style.cssText = cb + "cursor:move;background:#fff;opacity:0;filter:alpha(opacity=0);z-index:" + (D.zIndex + 1e3), 
            a(function() {
                if (!document.getElementsByTagName("frameset").length) {
                    try {
                        Y && document.execCommand("BackgroundImageCache", !1, !0);
                    } catch (a) {}
                    if (Y && document.body.currentStyle["backgroundAttachment"] != "fixed") {
                        var b = document.getElementsByTagName("html")[0];
                        b.style.cssText = "background-image:url(about:blank);background-attachment:fixed";
                    }
                    document.body.appendChild(f(R, S, T, U)), D.inFrame && Y && (S.innerHTML = '<div unselectable="on" style="width:100%;height:100%"><iframe width="100%" height="100%" src="about:blank" style="position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0)"></iframe></div>'), 
                    Y && e(R);
                }
            });
        }
        var bb = function() {
            if (V != N.clientWidth || W != N.clientHeight) V = N.clientWidth, W = N.clientHeight, 
            a.each(M, function(a) {
                var b = {}, d = M[a];
                b.abo = c(d.id), b.id = d.id, b.top = d.top, b.left = d.left, b.right = d.right, 
                b.bottom = d.bottom, D.Flash && d.flash ? y(b, !0) : y(b, !1);
            });
        };
        D.btn = {
            OK: [ {
                value: D.Language.OK,
                result: "ok"
            } ],
            NO: [ {
                value: D.Language.NO,
                result: "no"
            } ],
            YES: [ {
                value: D.Language.YES,
                result: "yes"
            } ],
            CLOSE: [ {
                title: D.Language.CLOSE,
                result: "close"
            } ],
            CANCEL: [ {
                value: D.Language.CANCEL,
                result: "cancel"
            } ]
        }, D.btn.OKCANCEL = D.btn.OK.concat(D.btn.CANCEL), D.btn.YESNO = D.btn.YES.concat(D.btn.NO), 
        D.btn.YESNOCANCEL = D.btn.YES.concat(D.btn.NO).concat(D.btn.CANCEL), D.cover = function(b, c) {
            var d = a(S), e = S.style;
            b ? (I = b, e.zIndex = c || D.zIndex, D.Flash ? d.fadeTo(500, D.Cover.opacity) : d.show()) : (I = b, 
            D.Flash ? d.fadeOut(300) : d.hide(), J = []);
        }, D.close = function(d) {
            var e = c(d);
            e && (M.length > 0 && (M = B(M, d, "id")), H && M.length == 0 && (a(E).unbind("resize", bb), 
            H = !1, M = []), a.each(L, function(f, g) {
                if (g.id == d) {
                    if (I) for (b in K) K[b] == d && (K = B(K, d), J.length > 1 && K.length != 0 ? (J.pop(), 
                    D.cover(!0, J[J.length - 1])) : D.cover(!1));
                    g.wrap && (c(g.id + "_content").innerHTML = "", p(g)), g.timeobj = null, g.cache ? a(e).hide() : (L.length > 0 && (L = B(L, d, "id")), 
                    g.pageMode && u(d), a(e).remove()), g.unload();
                }
            }));
        }, D.resizeTo = function(b, d, f) {
            var g = c(b);
            (g && g.offsetWidth != d || g.offsetHeight != f) && a.each(L, function(a, c) {
                if (c.id == b) {
                    var h = {
                        abo: g,
                        id: b,
                        width: d,
                        height: f,
                        top: c.top,
                        left: c.left,
                        right: c.right,
                        bottom: c.bottom,
                        pageMode: c.pageMode,
                        htmlMode: c.htmlMode
                    };
                    x(h), y(h, !1), c.fixed && e(g);
                }
            });
        }, D.framer = function(a) {
            return c(a).contentWindow;
        }, D.opener = function(a) {
            return D.framer(a + "_content");
        }, D.reload = function(a, b) {
            var d = c(a + "_content");
            try {
                d.src = b || D.opener(a).location.href;
            } catch (e) {
                d.src = d.src;
            }
        }, D.exist = function(a) {
            var b = c(a);
            return b && b.style.display != "none" ? !0 : !1;
        }, D.alert = function(a, b, c) {
            C(a, b, c, "alert");
        }, D.confirm = function(a, b, c) {
            C(a, b, c, "confirm");
        }, D.prompt = function(a, b, c, d, e) {
            var f = {
                id: G + "prompt",
                title: a,
                reset: !0,
                modal: !0,
                inputMode: {
                    tips: b || "",
                    content: c || ""
                },
                textType: d,
                buttons: D.btn.OKCANCEL,
                callback: e
            };
            i(f);
        }, D.open = function(a, b) {
            a.id = a.id || G + D.zIndex, a.content = "", a.pageMode = !0, a.opener = b, i(a);
        }, D.html = function(a) {
            a.id = a.id || G + D.zIndex, a.url = "", a.htmlMode = !0, i(a);
        }, D.success = function(a, b, c) {
            C(a, b, c, "success");
        }, D.warning = function(a, b, c) {
            C(a, b, c, "warning");
        }, D.error = function(a, b, c) {
            C(a, b, c, "error");
        };
    })(jQuery);
});

/*!
 * SuperSlide v2.1.1 
 * 轻松解决网站大部分特效展示问题
 * 详尽信息请看官网：http://www.SuperSlide2.com/
 *
 * Copyright 2011-2013, 大话主席
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途

 * v2.1.1：修复当调用多个SuperSlide，并设置returnDefault:true 时返回defaultIndex索引错误

 */
define("js/jquery.SuperSlide.2.1.1", [], function(require, exports, module) {
    !function(a) {
        a.fn.slide = function(b) {
            return a.fn.slide.defaults = {
                type: "slide",
                effect: "fade",
                autoPlay: !1,
                delayTime: 500,
                interTime: 2500,
                triggerTime: 150,
                defaultIndex: 0,
                titCell: ".hd li",
                mainCell: ".bd",
                targetCell: null,
                trigger: "mouseover",
                scroll: 1,
                vis: 1,
                titOnClassName: "on",
                autoPage: !1,
                prevCell: ".prev",
                nextCell: ".next",
                pageStateCell: ".pageState",
                opp: !1,
                pnLoop: !0,
                easing: "swing",
                startFun: null,
                endFun: null,
                switchLoad: null,
                playStateCell: ".playState",
                mouseOverStop: !0,
                defaultPlay: !0,
                returnDefault: !1
            }, this.each(function() {
                var c = a.extend({}, a.fn.slide.defaults, b), d = a(this), e = c.effect, f = a(c.prevCell, d), g = a(c.nextCell, d), h = a(c.pageStateCell, d), i = a(c.playStateCell, d), j = a(c.titCell, d), k = j.size(), l = a(c.mainCell, d), m = l.children().size(), n = c.switchLoad, o = a(c.targetCell, d), p = parseInt(c.defaultIndex), q = parseInt(c.delayTime), r = parseInt(c.interTime);
                parseInt(c.triggerTime);
                var Q, t = parseInt(c.scroll), u = parseInt(c.vis), v = "false" == c.autoPlay || 0 == c.autoPlay ? !1 : !0, w = "false" == c.opp || 0 == c.opp ? !1 : !0, x = "false" == c.autoPage || 0 == c.autoPage ? !1 : !0, y = "false" == c.pnLoop || 0 == c.pnLoop ? !1 : !0, z = "false" == c.mouseOverStop || 0 == c.mouseOverStop ? !1 : !0, A = "false" == c.defaultPlay || 0 == c.defaultPlay ? !1 : !0, B = "false" == c.returnDefault || 0 == c.returnDefault ? !1 : !0, C = 0, D = 0, E = 0, F = 0, G = c.easing, H = null, I = null, J = null, K = c.titOnClassName, L = j.index(d.find("." + K)), M = p = -1 == L ? p : L, N = p, O = p, P = m >= u ? 0 != m % t ? m % t : t : 0, R = "leftMarquee" == e || "topMarquee" == e ? !0 : !1, S = function() {
                    a.isFunction(c.startFun) && c.startFun(p, k, d, a(c.titCell, d), l, o, f, g);
                }, T = function() {
                    a.isFunction(c.endFun) && c.endFun(p, k, d, a(c.titCell, d), l, o, f, g);
                }, U = function() {
                    j.removeClass(K), A && j.eq(N).addClass(K);
                };
                if ("menu" == c.type) return A && j.removeClass(K).eq(p).addClass(K), j.hover(function() {
                    Q = a(this).find(c.targetCell);
                    var b = j.index(a(this));
                    I = setTimeout(function() {
                        switch (p = b, j.removeClass(K).eq(p).addClass(K), S(), e) {
                          case "fade":
                            Q.stop(!0, !0).animate({
                                opacity: "show"
                            }, q, G, T);
                            break;

                          case "slideDown":
                            Q.stop(!0, !0).animate({
                                height: "show"
                            }, q, G, T);
                        }
                    }, c.triggerTime);
                }, function() {
                    switch (clearTimeout(I), e) {
                      case "fade":
                        Q.animate({
                            opacity: "hide"
                        }, q, G);
                        break;

                      case "slideDown":
                        Q.animate({
                            height: "hide"
                        }, q, G);
                    }
                }), B && d.hover(function() {
                    clearTimeout(J);
                }, function() {
                    J = setTimeout(U, q);
                }), void 0;
                if (0 == k && (k = m), R && (k = 2), x) {
                    if (m >= u) if ("leftLoop" == e || "topLoop" == e) k = 0 != m % t ? (0 ^ m / t) + 1 : m / t; else {
                        var V = m - u;
                        k = 1 + parseInt(0 != V % t ? V / t + 1 : V / t), 0 >= k && (k = 1);
                    } else k = 1;
                    j.html("");
                    var W = "";
                    if (1 == c.autoPage || "true" == c.autoPage) for (var X = 0; k > X; X++) W += "<li>" + (X + 1) + "</li>"; else for (var X = 0; k > X; X++) W += c.autoPage.replace("$", X + 1);
                    j.html(W);
                    var j = j.children();
                }
                if (m >= u) {
                    l.children().each(function() {
                        a(this).width() > E && (E = a(this).width(), D = a(this).outerWidth(!0)), a(this).height() > F && (F = a(this).height(), 
                        C = a(this).outerHeight(!0));
                    });
                    var Y = l.children(), Z = function() {
                        for (var a = 0; u > a; a++) Y.eq(a).clone().addClass("clone").appendTo(l);
                        for (var a = 0; P > a; a++) Y.eq(m - a - 1).clone().addClass("clone").prependTo(l);
                    };
                    switch (e) {
                      case "fold":
                        l.css({
                            position: "relative",
                            width: D,
                            height: C
                        }).children().css({
                            position: "absolute",
                            width: E,
                            left: 0,
                            top: 0,
                            display: "none"
                        });
                        break;

                      case "top":
                        l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({
                            top: -(p * t) * C,
                            position: "relative",
                            padding: "0",
                            margin: "0"
                        }).children().css({
                            height: F
                        });
                        break;

                      case "left":
                        l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({
                            width: m * D,
                            left: -(p * t) * D,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0"
                        }).children().css({
                            "float": "left",
                            width: E
                        });
                        break;

                      case "leftLoop":
                      case "leftMarquee":
                        Z(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({
                            width: (m + u + P) * D,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0",
                            left: -(P + p * t) * D
                        }).children().css({
                            "float": "left",
                            width: E
                        });
                        break;

                      case "topLoop":
                      case "topMarquee":
                        Z(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({
                            height: (m + u + P) * C,
                            position: "relative",
                            padding: "0",
                            margin: "0",
                            top: -(P + p * t) * C
                        }).children().css({
                            height: F
                        });
                    }
                }
                var $ = function(a) {
                    var b = a * t;
                    return a == k ? b = m : -1 == a && 0 != m % t && (b = -m % t), b;
                }, _ = function(b) {
                    var c = function(c) {
                        for (var d = c; u + c > d; d++) b.eq(d).find("img[" + n + "]").each(function() {
                            var b = a(this);
                            if (b.attr("src", b.attr(n)).removeAttr(n), l.find(".clone")[0]) for (var c = l.children(), d = 0; d < c.size(); d++) c.eq(d).find("img[" + n + "]").each(function() {
                                a(this).attr(n) == b.attr("src") && a(this).attr("src", a(this).attr(n)).removeAttr(n);
                            });
                        });
                    };
                    switch (e) {
                      case "fade":
                      case "fold":
                      case "top":
                      case "left":
                      case "slideDown":
                        c(p * t);
                        break;

                      case "leftLoop":
                      case "topLoop":
                        c(P + $(O));
                        break;

                      case "leftMarquee":
                      case "topMarquee":
                        var d = "leftMarquee" == e ? l.css("left").replace("px", "") : l.css("top").replace("px", ""), f = "leftMarquee" == e ? D : C, g = P;
                        if (0 != d % f) {
                            var h = Math.abs(0 ^ d / f);
                            g = 1 == p ? P + h : P + h - 1;
                        }
                        c(g);
                    }
                }, ab = function(a) {
                    if (!A || M != p || a || R) {
                        if (R ? p >= 1 ? p = 1 : 0 >= p && (p = 0) : (O = p, p >= k ? p = 0 : 0 > p && (p = k - 1)), 
                        S(), null != n && _(l.children()), o[0] && (Q = o.eq(p), null != n && _(o), "slideDown" == e ? (o.not(Q).stop(!0, !0).slideUp(q), 
                        Q.slideDown(q, G, function() {
                            l[0] || T();
                        })) : (o.not(Q).stop(!0, !0).hide(), Q.animate({
                            opacity: "show"
                        }, q, function() {
                            l[0] || T();
                        }))), m >= u) switch (e) {
                          case "fade":
                            l.children().stop(!0, !0).eq(p).animate({
                                opacity: "show"
                            }, q, G, function() {
                                T();
                            }).siblings().hide();
                            break;

                          case "fold":
                            l.children().stop(!0, !0).eq(p).animate({
                                opacity: "show"
                            }, q, G, function() {
                                T();
                            }).siblings().animate({
                                opacity: "hide"
                            }, q, G);
                            break;

                          case "top":
                            l.stop(!0, !1).animate({
                                top: -p * t * C
                            }, q, G, function() {
                                T();
                            });
                            break;

                          case "left":
                            l.stop(!0, !1).animate({
                                left: -p * t * D
                            }, q, G, function() {
                                T();
                            });
                            break;

                          case "leftLoop":
                            var b = O;
                            l.stop(!0, !0).animate({
                                left: -($(O) + P) * D
                            }, q, G, function() {
                                -1 >= b ? l.css("left", -(P + (k - 1) * t) * D) : b >= k && l.css("left", -P * D), 
                                T();
                            });
                            break;

                          case "topLoop":
                            var b = O;
                            l.stop(!0, !0).animate({
                                top: -($(O) + P) * C
                            }, q, G, function() {
                                -1 >= b ? l.css("top", -(P + (k - 1) * t) * C) : b >= k && l.css("top", -P * C), 
                                T();
                            });
                            break;

                          case "leftMarquee":
                            var c = l.css("left").replace("px", "");
                            0 == p ? l.animate({
                                left: ++c
                            }, 0, function() {
                                l.css("left").replace("px", "") >= 0 && l.css("left", -m * D);
                            }) : l.animate({
                                left: --c
                            }, 0, function() {
                                l.css("left").replace("px", "") <= -(m + P) * D && l.css("left", -P * D);
                            });
                            break;

                          case "topMarquee":
                            var d = l.css("top").replace("px", "");
                            0 == p ? l.animate({
                                top: ++d
                            }, 0, function() {
                                l.css("top").replace("px", "") >= 0 && l.css("top", -m * C);
                            }) : l.animate({
                                top: --d
                            }, 0, function() {
                                l.css("top").replace("px", "") <= -(m + P) * C && l.css("top", -P * C);
                            });
                        }
                        j.removeClass(K).eq(p).addClass(K), M = p, y || (g.removeClass("nextStop"), f.removeClass("prevStop"), 
                        0 == p && f.addClass("prevStop"), p == k - 1 && g.addClass("nextStop")), h.html("<span>" + (p + 1) + "</span>/" + k);
                    }
                };
                A && ab(!0), B && d.hover(function() {
                    clearTimeout(J);
                }, function() {
                    J = setTimeout(function() {
                        p = N, A ? ab() : "slideDown" == e ? Q.slideUp(q, U) : Q.animate({
                            opacity: "hide"
                        }, q, U), M = p;
                    }, 300);
                });
                var bb = function(a) {
                    H = setInterval(function() {
                        w ? p-- : p++, ab();
                    }, a ? a : r);
                }, cb = function(a) {
                    H = setInterval(ab, a ? a : r);
                }, db = function() {
                    z || (clearInterval(H), bb());
                }, eb = function() {
                    (y || p != k - 1) && (p++, ab(), R || db());
                }, fb = function() {
                    (y || 0 != p) && (p--, ab(), R || db());
                }, gb = function() {
                    clearInterval(H), R ? cb() : bb(), i.removeClass("pauseState");
                }, hb = function() {
                    clearInterval(H), i.addClass("pauseState");
                };
                if (v ? R ? (w ? p-- : p++, cb(), z && l.hover(hb, gb)) : (bb(), z && d.hover(hb, gb)) : (R && (w ? p-- : p++), 
                i.addClass("pauseState")), i.click(function() {
                    i.hasClass("pauseState") ? gb() : hb();
                }), "mouseover" == c.trigger ? j.hover(function() {
                    var a = j.index(this);
                    I = setTimeout(function() {
                        p = a, ab(), db();
                    }, c.triggerTime);
                }, function() {
                    clearTimeout(I);
                }) : j.click(function() {
                    p = j.index(this), ab(), db();
                }), R) {
                    if (g.mousedown(eb), f.mousedown(fb), y) {
                        var ib, jb = function() {
                            ib = setTimeout(function() {
                                clearInterval(H), cb(0 ^ r / 10);
                            }, 150);
                        }, kb = function() {
                            clearTimeout(ib), clearInterval(H), cb();
                        };
                        g.mousedown(jb), g.mouseup(kb), f.mousedown(jb), f.mouseup(kb);
                    }
                    "mouseover" == c.trigger && (g.hover(eb, function() {}), f.hover(fb, function() {}));
                } else g.click(eb), f.click(fb);
            });
        };
    }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e);
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c;
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c;
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c;
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c;
        },
        easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c;
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c;
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c;
        },
        easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c;
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c;
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c;
        },
        easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c;
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c;
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c;
        },
        easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c;
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c;
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c;
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
        },
        easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c;
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c;
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = e * .3 * 1.5), h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c;
        },
        easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c;
        },
        easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c;
        },
        easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c;
        },
        easeInBounce: function(a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c;
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c;
        },
        easeInOutBounce: function(a, b, c, d, e) {
            return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c;
        }
    });
});

define("js/jquery.imagezoom.min", [], function(require, exports, module) {
    (function($) {
        $.fn.imagezoom = function(options) {
            var settings = {
                xzoom: 400,
                yzoom: 400,
                offset: 10,
                position: "BTR",
                preload: 1
            };
            if (options) {
                $.extend(settings, options);
            }
            var noalt = "";
            var self = this;
            $(this).bind("mouseenter", function(ev) {
                var imageLeft = $(this).offset().left;
                var imageTop = $(this).offset().top;
                var imageWidth = $(this).get(0).offsetWidth;
                var imageHeight = $(this).get(0).offsetHeight;
                var boxLeft = $(this).parent().offset().left;
                var boxTop = $(this).parent().offset().top;
                var boxWidth = $(this).parent().width();
                var boxHeight = $(this).parent().height();
                noalt = $(this).attr("alt");
                var bigimage = $(this).attr("rel");
                $(this).attr("alt", "");
                if ($("div.zoomDiv").get().length == 0) {
                    $(document.body).append("<div class='zoomDiv'><img class='bigimg' src='" + bigimage + "'/></div><div class='zoomMask'>&nbsp;</div>");
                }
                if (settings.position == "BTR") {
                    if (boxLeft + boxWidth + settings.offset + settings.xzoom > screen.width) {
                        leftpos = boxLeft - settings.offset - settings.xzoom;
                    } else {
                        leftpos = boxLeft + boxWidth + settings.offset;
                    }
                } else {
                    leftpos = imageLeft - settings.xzoom - settings.offset;
                    if (leftpos < 0) {
                        leftpos = imageLeft + imageWidth + settings.offset;
                    }
                }
                $("div.zoomDiv").css({
                    top: boxTop,
                    left: leftpos
                });
                $("div.zoomDiv").width(settings.xzoom);
                $("div.zoomDiv").height(settings.yzoom);
                $("div.zoomDiv").show();
                $(this).css("cursor", "crosshair");
                $(document.body).mousemove(function(e) {
                    mouse = new MouseEvent(e);
                    if (mouse.x < imageLeft || mouse.x > imageLeft + imageWidth || mouse.y < imageTop || mouse.y > imageTop + imageHeight) {
                        mouseOutImage();
                        return;
                    }
                    var bigwidth = $(".bigimg").get(0).offsetWidth;
                    var bigheight = $(".bigimg").get(0).offsetHeight;
                    var scaley = "x";
                    var scalex = "y";
                    if (isNaN(scalex) | isNaN(scaley)) {
                        var scalex = bigwidth / imageWidth;
                        var scaley = bigheight / imageHeight;
                        $("div.zoomMask").width(settings.xzoom / scalex);
                        $("div.zoomMask").height(settings.yzoom / scaley);
                        $("div.zoomMask").css("visibility", "visible");
                    }
                    xpos = mouse.x - $("div.zoomMask").width() / 2;
                    ypos = mouse.y - $("div.zoomMask").height() / 2;
                    xposs = mouse.x - $("div.zoomMask").width() / 2 - imageLeft;
                    yposs = mouse.y - $("div.zoomMask").height() / 2 - imageTop;
                    xpos = mouse.x - $("div.zoomMask").width() / 2 < imageLeft ? imageLeft : mouse.x + $("div.zoomMask").width() / 2 > imageWidth + imageLeft ? imageWidth + imageLeft - $("div.zoomMask").width() : xpos;
                    ypos = mouse.y - $("div.zoomMask").height() / 2 < imageTop ? imageTop : mouse.y + $("div.zoomMask").height() / 2 > imageHeight + imageTop ? imageHeight + imageTop - $("div.zoomMask").height() : ypos;
                    $("div.zoomMask").css({
                        top: ypos,
                        left: xpos
                    });
                    $("div.zoomDiv").get(0).scrollLeft = xposs * scalex;
                    $("div.zoomDiv").get(0).scrollTop = yposs * scaley;
                });
            });
            function mouseOutImage() {
                $(self).attr("alt", noalt);
                $(document.body).unbind("mousemove");
                $("div.zoomMask").remove();
                $("div.zoomDiv").remove();
            }
            count = 0;
            if (settings.preload) {
                $("body").append("<div style='display:none;' class='jqPreload" + count + "'></div>");
                $(this).each(function() {
                    var imagetopreload = $(this).attr("rel");
                    var content = jQuery("div.jqPreload" + count + "").html();
                    jQuery("div.jqPreload" + count + "").html(content + '<img src="' + imagetopreload + '">');
                });
            }
        };
    })(jQuery);
    function MouseEvent(e) {
        this.x = e.pageX;
        this.y = e.pageY;
    }
});

/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a) {
    "function" == typeof define && define.amd ? define("js/jquery.validate.min", [ "jquery" ], a) : a(jQuery);
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), 
            a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function(b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), 
                void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0);
            }), this.submit(function(b) {
                function d() {
                    var d, e;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), 
                    e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), 
                    void 0 !== e ? e : !1) : !0;
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, 
                d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), 
                !1);
            })), c);
        },
        valid: function() {
            var b, c;
            return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), 
            this.each(function() {
                b = c.element(this) && b;
            })), b;
        },
        removeAttrs: function(b) {
            var c = {}, d = this;
            return a.each(b.split(/\s/), function(a, b) {
                c[b] = d.attr(b), d.removeAttr(b);
            }), c;
        },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), 
            b) {
              case "add":
                a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                break;

              case "remove":
                return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                    i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required");
                }), i) : (delete e[j.name], f);
            }
            return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), 
            g.required && (h = g.required, delete g.required, g = a.extend({
                required: h
            }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, 
            g = a.extend(g, {
                remote: h
            })), g;
        }
    }), a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val());
        },
        filled: function(b) {
            return !!a.trim("" + a(b).val());
        },
        unchecked: function(b) {
            return !a(b).prop("checked");
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, 
        this.init();
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c);
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), 
        c.constructor !== Array && (c = [ c ]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c;
            });
        }), b);
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), 
                this.hideThese(this.errorsFor(a)));
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
            },
            onkeyup: function(a, b) {
                (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a);
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = a.data(this[0].form, "validator"), d = "on" + b.type.replace(/^validate/, ""), e = c.settings;
                    e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b);
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), 
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), 
                this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, 
                this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        d[c] = b;
                    });
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d);
                }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", b).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", b), 
                this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), 
                a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), 
                this.valid() || a(this.currentForm).triggerHandler("invalid-form", [ this ]), this.showErrors(), 
                this.valid();
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid();
            },
            element: function(b) {
                var c = this.clean(b), d = this.validationTargetFor(c), e = !0;
                return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), 
                this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), 
                a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), 
                this.showErrors(), e;
            },
            showErrors: function(b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b) this.errorList.push({
                        message: b[c],
                        element: this.findByName(c)[0]
                    });
                    this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b);
                    });
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, 
                this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid");
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) c++;
                return c;
            },
            hideErrors: function() {
                this.hideThese(this.toHide);
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide();
            },
            valid: function() {
                return 0 === this.size();
            },
            size: function() {
                return this.errorList.length;
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name;
                }).length && b;
            },
            elements: function() {
                var b = this, c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), 
                    this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0);
                });
            },
            clean: function(b) {
                return a(b)[0];
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext);
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), 
                this.toHide = a([]), this.currentElements = a([]);
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a);
            },
            elementValue: function(b) {
                var c, d = a(b), e = b.type;
                return "radio" === e || "checkbox" === e ? a("input[name='" + b.name + "']:checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), 
                "string" == typeof c ? c.replace(/\r/g, "") : c);
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(), g = a.map(f, function(a, b) {
                    return b;
                }).length, h = !1, i = this.elementValue(b);
                for (d in f) {
                    e = {
                        method: d,
                        parameters: f[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue;
                        }
                        if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1;
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), 
                        j;
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0;
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b]);
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a];
                return void 0;
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>");
            },
            formatAndAdd: function(b, c) {
                var d = this.defaultMessage(b, c.method), e = /\$?\{(\d+)\}/g;
                "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), 
                this.errorList.push({
                    message: d,
                    element: b,
                    method: c.method
                }), this.errorMap[b.name] = d, this.submitted[b.name] = d;
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), 
                this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element;
                });
            },
            showLabel: function(b, c) {
                var d, e, f, g = this.errorsFor(b), h = this.idOrName(b), i = a(b).attr("aria-describedby");
                g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), 
                g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), 
                d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), 
                this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), 
                g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), 
                i ? i.match(new RegExp("\\b" + f + "\\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), 
                e = this.groups[b.name], e && a.each(this.groups, function(b, c) {
                    c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"));
                }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), 
                this.toShow = this.toShow.add(g);
            },
            errorsFor: function(b) {
                var c = this.idOrName(b), d = a(b).attr("aria-describedby"), e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e);
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type);
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + b + "']");
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                  case "select":
                    return a("option:selected", c).length;

                  case "input":
                    if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;
                }
                return b.length;
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0;
            },
            dependTypes: {
                "boolean": function(a) {
                    return a;
                },
                string: function(b, c) {
                    return !!a(b, c.form).length;
                },
                "function": function(a, b) {
                    return a(b);
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
            },
            startRequest: function(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0);
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], 
                c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), 
                this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [ this ]), 
                this.formSubmitted = !1);
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, "remote")
                });
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
        },
        classRules: function(b) {
            var c = {}, d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
            }), c;
        },
        attributeRules: function(b) {
            var c, d, e = {}, f = a(b), g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), 
            d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), 
            d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, 
            e;
        },
        dataRules: function(b) {
            var c, d, e = {}, f = a(b);
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), 
            void 0 !== d && (e[c] = d);
            return e;
        },
        staticRules: function(b) {
            var c = {}, d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), 
            c;
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                      case "string":
                        f = !!a(e.depends, c.form).length;
                        break;

                      case "function":
                        f = e.depends.call(c, c);
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d];
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) ? e(c) : e;
            }), a.each([ "minlength", "maxlength" ], function() {
                b[this] && (b[this] = Number(b[this]));
            }), a.each([ "rangelength", "range" ], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [ Number(b[this][0]), Number(b[this][1]) ] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), 
                b[this] = [ Number(c[0]), Number(c[1]) ]));
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [ b.min, b.max ], 
            delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [ b.minlength, b.maxlength ], 
            delete b.minlength, delete b.maxlength)), b;
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0;
                }), b = c;
            }
            return b;
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], 
            c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0;
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0;
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
            },
            url: function(a, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a);
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
            },
            number: function(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a);
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c, d, e = 0, f = 0, g = !1;
                if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), 
                e += f, g = !g;
                return e % 10 === 0;
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d;
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || d >= e;
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1];
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c;
            },
            max: function(a, b, c) {
                return this.optional(b) || c >= a;
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1];
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    a(c).valid();
                }), b === e.val();
            },
            remote: function(b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var e, f, g = this.previousValue(c);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), 
                g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, 
                d = "string" == typeof d && {
                    url: d
                } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, 
                f[c.name] = b, a.ajax(a.extend(!0, {
                    url: d,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: f,
                    context: e.currentForm,
                    success: function(d) {
                        var f, h, i, j = d === !0 || "true" === d;
                        e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, 
                        e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], 
                        e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, 
                        e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j);
                    }
                }, d)), "pending");
            }
        }
    }), a.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead.";
    };
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d);
    }) : (b = a.ajax, a.ajax = function(d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode, f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments);
    }), a.extend(a.fn, {
        validateDelegate: function(b, c, d) {
            return this.bind(c, function(c) {
                var e = a(c.target);
                return e.is(b) ? d.apply(e, arguments) : void 0;
            });
        }
    });
});

/* 
 * Copyright (c) 2015 JKD TEAM (9koudai.net)
 * Author fcdcyy@sina.cn
 *
 * $Date: 2015-01-14 09:14:17 $
 *
 */
define("js/common", [], function(require, exports, module) {
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
