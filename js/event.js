var eventUtil = {
    // 添加句柄
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            // 用的时候是方法，在判断时要用属性的形式存在，因为方法没有办法return布尔值
            // DOM2级事件处理程序判断
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            // IE事件处理程序判断
            element.attachEvent('on'+type,handler);
        }else{
            // DOM0级事件处理程序判断
            element['on'+type]=handler;
        }
    },
    // 删除句柄
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            // DOM2级事件处理程序判断
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            // IE事件处理程序判断
            element.detachEvent('on'+type,handler);
        }else{
            // DOM0级事件处理程序判断
            element['on'+type]=null;
        }
    },
    getEvent:function(event){
        // 获取兼容所有浏览器的事件对象
        return event?event:window.event; 
    },
    getType:function(event){
        // 获取事件类型
        return event.type; //不存在浏览器兼容问题
    },
    getElement:function(event){
        // 获取事件来自于哪个元素
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            // 阻止默认事件的行为
            event.preventDefault();
        }else{
            // IE阻止默认事件的行为
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            // 阻止事件冒泡
            event.stopPropagation();
        }else{
            // IE阻止事件冒泡
            event.canelBubble = true;
        }
    }
}