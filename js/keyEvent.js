var data=['iphoneX','ipad','mac','wow','thank you','inhone8'],
    timer=null;
    flag=0;

window.onload=function(){
  var play = document.getElementById('play'),
      stop = document.getElementById('stop');

  // 开始抽奖
  play.onclick = playFun;
  stop.onclick = stopFun;
  // 键盘事件
  document.onkeyup=function(event){
    event = event || window.event;
    if(event.keyCode==13){
      if(flag==0){
        playFun();
        flag=1;
      }else{
        stopFun();
        flag=0;
      }
    }
  }  
}

function playFun(){
  var title = document.getElementById('title'),
      play = document.getElementById('play');
  clearInterval(timer); // 防止越点越快
  timer=setInterval(function(){
    var random = Math.floor(Math.random()*data.length);
    title.innerHTML=data[random];
  },50);
  play.style.background='#999';
};

function stopFun(){
  clearInterval(timer);
  var play = document.getElementById('play');
  play.style.background="#036";
}