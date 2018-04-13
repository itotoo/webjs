/*-------------------------------

    jquery 源码架构
    类和对象,继承，外部扩展，方法调用

 --------------------------------*/

;(function( window, undefined ) {
    // webjs code
    var webjs = (function(){
        var webjs = function( selector, context , rootjQuery ) {
            // 不是构造函数不能new
            return new webjs.proto.init( selector, context , rootjQuery );
        };
        webjs.proto = webjs.prototype = {
            constructor : webjs,
            init : function(selector, context , rootjQuery){
                // selector有以下7种分支情况：
                // DOM元素
                // body（优化）
                // 字符串：HTML标签、HTML字符串、#id、选择器表达式
                // 函数（作为ready回调函数）
                // 最后返回伪数组
            }
        };
        webjs.proto.init.prototype = webjs.proto;
        // 通过jQuery.fn.extend扩展的函数，大部分都会调用通过jQuery.extend扩展的同名函数
        webjs.extend = webjs.proto.extend = function(obj) {
            //obj是传递过来扩展到this上的对象
            var target=this;
            for (var name in obj){
                //name为对象属性
                //copy为属性值
                copy=obj[name];
                //防止循环调用
                if(target === copy) continue;
                //防止附加未定义值
                if(typeof copy === 'undefined') continue;
                //赋值
                target[name]=copy;
            }
            return target;
        }

        // 在jQuery上扩展静态方法
        webjs.extend({
                hello: function () {
                    console.log('hello')
                }
                // ready bindReady
                // isPlainObject isEmptyObject
                // parseJSON parseXML
                // globalEval
                // each makeArray inArray merge grep map
                // proxy
                // access
                // uaMatch
                // sub
                // browser
        });
        webjs.extend( {

            query:function(ele){
                return document.querySelector(ele);
            },
            error: function( msg ) {
                throw new Error( msg );
            },
            getTarget:function(event){
                return event.target || event.srcElement;
            },
            preventDefault:function(event){
                if(event.preventDefault){
                    event.preventDefault();
                }else{
                    event.returnValue = false;
                }
            },
            stopPropagation:function(event){
                if(event.stopPropagation){
                    event.stopPropagation();
                }else{
                    event.cancelBubble = true;
                }
            },
            bind: function (target, type, func) {
                if (target.addEventListener) {// 非ie 和ie9
                    target.addEventListener(type, func, false);
                } else if (target.attachEvent) { // ie6到ie8
                    target.attachEvent("on" + type, func);
                } else {
                    target["on" + type] = func; // ie5
                }
            },
            unbind: function (target, type, func) {
                if (target.removeEventListener) {
                    target.removeEventListener(type, func, false);
                } else if (target.detachEvent) {
                    target.detachEvent("on" + type, func);
                } else {
                    target["on" + type] = null;
                }
            },
            addMousewheel : function (callback){
                // IE,google
                webjs.bind(document, 'mousewheel', function(event) {
                    var event = event?event : window.event;
                    var result = getWheelDelta(event);
                    callback(result);

                });
                // firefox
                webjs.bind(window, 'DOMMouseScroll', function(event) {
                    var event = event?event : window.event;
                    var result = getWheelDelta(event);
                    callback(result);
                });
                function getWheelDelta(event){
                    return event.wheelDelta ? -event.wheelDelta/120 :event.detail/3;
                }
            }
        })
        webjs.proto.extend({
            haha:function(){
                console.log('haha')
            }
        })
        // 工具函数 Utilities
        // 异步队列 Deferred
        // 浏览器测试 Support
        // 数据缓存 Data
        // 队列 queue
        // 属性操作 Attribute
        // 事件处理 Event
        // 选择器 Sizzle
        // DOM 遍历
        // DOM 操作
        // CSS 操作
        // 异步请求 Ajax
        // 动画 FX
        // 坐标和大小
        return webjs;
    })();

    window.webjs = window.$ = webjs;
})(window);


