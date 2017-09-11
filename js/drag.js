// 最开始一般都是封装 
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

window.onload=drag;//页面加载
//拖动三步-在标题区域按下-页面移动-释放鼠标停止移动
function drag(){
  var oTitle=getByClass('login_logo_webqq','loginPanel')[0];//标题区域 父元素的ID 返回数组[0]取第一个元素
  // var oTitle=document.getElementById('login_logo_webqq');
  // onmousedown 鼠标按下任何按键触发事件
  // 拖曳
  oTitle.onmousedown=fnDown;
  // oTitle.addEventListener('mousedown',fnDown);
  // 关闭
  var oClose= document.getElementById('ui_boxyClose');
  oClose.onclick= function(){
    document.getElementById('loginPanel').style.display='none';
  }
  // 切换状态
  var loginState = document.getElementById('loginState'),
      stateList = document.getElementById('loginStatePanel'),
      lis = stateList.getElementsByTagName('li'),
      stateTxt = document.getElementById('login2qq_state_txt'),
      loginStateShow = document.getElementById('loginStateShow');
  loginState.onclick=function(e){
    e = e || window.e;
    if(e.stopPropagation){
      e.stopPropagation();
    }else{
      e.canelBubble = true;
    }
    stateList.style.display='block';
  }
  // 鼠标滑过、离开、点击状态列表时
  for(var i=0,l=lis.length;i<l;i++){
    lis[i].onmouseover=function(){
      this.style.background='#567';
    }
    lis[i].onmouseout=function(){
      this.style.background='#aaa';
    }
    lis[i].onclick=function(event){
      event = event || window.event;
      if(event.stopPropagation){
          // 阻止事件冒泡
          event.stopPropagation();
      }else{
          // IE阻止事件冒泡
          event.canelBubble = true;
      }
      var id=this.id;
      stateList.style.display='none';// 冒泡了
      stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
      loginStateShow.className='';
      loginStateShow.className='login-state-show '+id;
    }
  }
  document.onclick=function(){
    stateList.style.display='none';
  }
}
// clientX clientY属性，所有浏览器都支持，光标的XY坐标
// onmousemove 当鼠标指针在元素内部移动时重复地触发
function fnDown(event){
  event= event || window.event; // windows 要用window.event
  var oDrag=document.getElementById('loginPanel'),
  // document指的是整个页面
  // event接收事件对象
  // document.onmousemove = function(event){
    // document.title=event.clientX+','+event.clientY;
    // oDrag.style.left = event.clientX+'px';
    // oDrag.style.top = event.clientY+'px';
  // }
  // 光标按下时光标和面板之间的距离
    disX = event.clientX-oDrag.offsetLeft,
    disY = event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){
    event= event || window.event;
    fnMove(event, disX, disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
    document.onmousemove=null;
    // document.onmouseup=null;
  }
}

function fnMove(e, posX, posY){
  var oDrag=document.getElementById('loginPanel'),
      l=e.clientX-posX,
      t=e.clientY-posY,
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth-10,
      maxH=winH-oDrag.offsetHeight;
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  } 

  if(t<0){
    t=10;
  }else if(t>maxH){
    t=maxH;
  } 
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}









