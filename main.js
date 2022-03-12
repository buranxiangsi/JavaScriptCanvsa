//画线canvas
let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let ctx = canvas.getContext('2d');
//填充矩形样式
ctx.fillStyle = 'black'; //填充颜色
ctx.strokeStyle = 'none'; //线条颜色
ctx.lineCap = 'round'; //线条末端样式
ctx.lineWidth = 10; // 线条宽度

let painting = false;
let last;

function drawLine(x1, y1, x2, y2) {
  console.log(x1,x2,y1,y2)
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
