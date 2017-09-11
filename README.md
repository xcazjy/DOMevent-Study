## 事件冒泡
btn-html 一层一层
由最具体的元素，然后逐级向上冒泡 
## 事件捕获
html-btn 一层一层 和冒泡相反
# 二、事件处理程序
## 1、HTML事件处理
```
oncilck="alert("hello")";
oncilck="show()";

```
## 2、DOM0级事件处理
```
<button id="btn"></button>
<script>
    var btn = document.getEmelentById('btn');
    btn.onclick = null; // 删除点击事件（DOM0只能用DOM0不能用DOM2级）
</script>

```
## 3、DOM2级事件处理（没有1级）
addEventListener()和removeEventListener()
#### 接收三个参数：
- 要处理的事件名
- 作为事件处理程序的函数
- 布尔值
```
var btn = document.getElementById('btn');
btn.addEventListener('click',show,false);//冒泡阶段兼容到多数浏览器false，否则用事件捕获true，事件不加on
btn.addEventListener('click',function(){
    alert(this.value) //this应用被触发的元素
},false);
btn.removeEventListener('click',show,false);//通过add添加一定要remove删除不能用btn.onclick=null的方法
```
==DOM0级和DOM2级都可以添加多个事件处理程序的优点==
## 4、IE事件处理程序
```
attachEvent()添加事件

detachEvent()删除事件

// 接收相同的两个参数：事件处理程序的名称和事件处理程序的函数（没有布尔值，是因为IE8以及之前的版本只支持事件冒泡）

btn.attachEvent('onclick',show);//要加on
```
## 5、跨浏览器解决事件处理程序
```
var eventUtil = {
    // 添加句柄
    addHandler:function(element,type,handler){
        if(element.addEventListener{
            // DOM2级事件处理程序判断
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent）{
            // IE事件处理程序判断
            element.attachEvent('on'+type,handler);
        }else{
            // DOM0级事件处理程序判断
            element['on'+type]=handler;
        }
    }, 
    // 删除句柄
    removeHandler:function(element,type,handler){
        if(element.removeEventListener{
            // DOM2级事件处理程序判断
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent）{
            // IE事件处理程序判断
            element.detachEvent('on'+type,handler);
        }else{
            // DOM0级事件处理程序判断
            element['on'+type]=null;
        }
    }
}
eventUtil.addHandler(btn3,'click',show);
```
==element['onclcik'] === element.onclcik==
# 三、事件对象
什么是事件对象？在触发DOM上的事件时都会产生一个对象
- 事件对象event
1. DOM中的事件对象
+ 1.  type属性 用于获取事件类型
+ 2. target属性 用于获取事件目标
event.target.nodeName; // 节点名称input...
+ 3. stopePropagation()方法 用于阻止事件冒泡
```
function show(event){
    event.stopPropgation();
}
```
+ 4. preventDefault()方法，阻止事件的默认行为
```
function stop(event){
    event.preventDefault();
}
``` 
还有bubbles属性 canselable属性...
2. IE
- 1. type属性 用于获取事件类型
- 2. srcElement属性 用于获取事件目标
- 3. cancelBubble属性 用于阻止事件冒泡
-设置为true表示阻止冒泡 false表示不阻止冒泡
- 4. returnValue属性 用于阻止事件的默认行为
-设置为false表示阻止事件的默认行为
```
event = event || window.event;
var ele = event.target || event.srcElement;
```
\*
```
document.getElementsByClassName();
// IE10以前的浏览器是不支持的，所以要先进行封装
```
封装获取className的方法
```
function getByClass(className, parent){//可选的参数要放在必须的参数后面
  var oParent = parent?document.getElementById(parent):document,
      eles = [];
      elements = oParent.getElementsByTagName('*');

  for(var i=0, l=elements.length;i<l;i++){
    if(elements[i].className==className){
      eles.push(elements[i]);
    }
  }
  return eles;
}
```
## 鼠标事件：
- onmousedown // 按下
- onmouseup // 抬起
- onmouseover // 滑过
- onmouseout // 滑出
- onmousemove // 移动
- onclick // 点击

## 键盘事件：
- keyDown // 当用户按下键盘上的==任何==键触发，如果按住不放，事件会重复触发
- keyPress // 当用户按下键盘上的==字符==键触发，如果按住不放，事件会重复触发
- keyUp // 释放键盘上的按键时触发

EVENT对象的==keyCode==属性用于得到键盘对应键的键码值(注意区分大小写)

setinterval 是window对象的一个方法
- clearInterval(timer); // 清除定时器,有加就要有减