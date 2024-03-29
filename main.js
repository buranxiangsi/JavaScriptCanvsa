//画线canvas
let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let ctx = canvas.getContext('2d');

//填充矩形样式
ctx.fillStyle = getColor(); //填充颜色
ctx.strokeStyle = 'none'; //线条颜色
ctx.lineCap = 'round'; //线条末端样式
ctx.lineWidth = getWidth() || 10; // 线条宽度

let painting = false;
let last;

function getColor() {
  let color = document.querySelectorAll('.colorItem');
  for (let i = 0; i < color.length; i++) {
    color[i].onclick = function () {
      for (let i = 0; i < color.length; i++) {
        activeColor = this.style.backgroundColor;
        ctx.fillStyle = activeColor;
        ctx.strokeStyle = activeColor;
      }
    };
  }
}
function getWidth() {
  let width = document.querySelectorAll('.widthItem')
  for (let i = 0; i < width.length; i++) {
    width[i].onclick = function () {
      for (let i = 0; i < width.length; i++) {
        activeWidth = this.textContent
        ctx.lineWidth = activeWidth
      }
    }
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

//是否支持触屏设备
var isTouchDevice = 'ontouchstart' in document.documentElement;

if (isTouchDevice) {
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    last = [x, y];
  };
  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    drawLine(last[0], last[1], x, y);
    last = [x, y];
  };
} else {
  canvas.onmousedown = (e) => {
    painting = true;
    last = [e.clientX, e.clientY];
  };

  canvas.onmousemove = (e) => {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY];
    }
  };

  canvas.onmouseup = () => {
    painting = false;
  };
}


const drawTool = document.querySelector('.drawTool')

let button = true
function toolOnClick(){
  const buttonCss = document.querySelectorAll('.buttonCss')
  for(let i=0;i<buttonCss.length;i++){
    buttonCss[i].onclick = function(){
      const el = buttonCss[i].querySelector('.transition')
      if(button){
        el.style.display = 'none'
        el.classList.remove('isClick')
        button = false
      }else{
        el.style.display = 'block'
        el.classList.add('isClick')
        button = true
      }
    }
  }
}
drawTool.addEventListener('click',toolOnClick)




