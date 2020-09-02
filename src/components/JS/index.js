import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function(){
    var defaults = {
        // 定义默认值，默认函数
        title: '',
        content: '',
        cancel: '',
        confirm: '',
        handleCancel: null,
        handleConfirm: null
    }

    var MyComponent = Vue.extend(MessageBox);

    return function(opts){ // opts传递过来的配置参数
        for(var attr in opts){
            defaults[attr] = opts[attr];
        }
        var vm = new MyComponent({
            el: document.createElement('div'), // 创建包裹弹窗的容器元素
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                confirm: defaults.confirm
            },
            methods: {
                handleCancel(){
                    // 没有指定handleCancel函数则使用默认的handleCancel函数
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    // 函数调用后就把弹窗关闭
                    document.body.removeChild(vm.$el);
                },
                handleConfirm(){
                    // 没有指定handleConfirm函数则使用默认的handleConfirm函数
                    defaults.handleConfirm && defaults.handleConfirm.call(this);
                    // 函数调用后就把弹窗关闭
                    document.body.removeChild(vm.$el);
                }
            }
        })
        // 把MyComponent添加到页面
        document.body.appendChild(vm.$el);
    }
})();