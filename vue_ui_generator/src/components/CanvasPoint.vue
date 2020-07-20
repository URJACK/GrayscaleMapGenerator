<template>
  <div class="container" id="app">
    Canvas
    <canvas id="oCanvas" width="600" height="600"></canvas>
    <button v-on:click="debug">click</button>
  </div>
</template>

<script>
let ctx;
//app是 vue 对象
let app;
const UNIT_OFFSET = 20;

export default {
  name: "CanvasPoint",
  props: {
    width: Number,
    height: Number,
    drawValue: Number,
    backgroundValue: Number
  },
  data() {
    return {
      drawArray: [],
      drawAvailable: false,
      ctx: null
    };
  },
  created() {
    console.log("CanvasPoint created");
    app = this;
    window.onload = function() {
      //在vue的函数中，之间使用oCanvas就默认使用了document.getElementById(oCanvas)
      initCanvas(oCanvas);
    };
  },
  mounted() {
    console.log("CanvasPoint mounted");
  },
  methods: {
    debug() {
      console.log("width in CanvasPoint.vue before change == ", this.width);
      console.log("width in CanvasPoint.vue before change == ", this.drawArray);
      console.log("CanvasPoint.vue click");
      this.$parent.debug();
    },
    //取得数组单个元素的数值
    getDrawArrayItemValue(y, x) {
      //正确的命名方式
      return this.drawArray[app.width * y + x];
    },
    //设置数组单个元素的数值
    setDrawArrayItemValue(y, x, value) {
      this.drawArray[app.width * y + x] = value;
    },
    //依赖于当前设定的长宽，重新生成新的数组对象
    generateEmptyDrawArray() {
      console.log(this.drawArray);
      this.drawArray = [];
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this.drawArray.push(0);
        }
      }
    }
  }
};

//初始化画图
function initCanvas(oCanvas) {
  ctx = oCanvas.getContext("2d");
  //绘制数据边框
  drawBackground();
  app.generateEmptyDrawArray();
  //设置canvas相应的监听事件
  oCanvas.addEventListener("mousedown", e => {
    let position = getPosition(e);
    let unit = getUnit(position);
    app.drawAvailable = true;
    unitOverMove(unit.y, unit.x);
  });
  oCanvas.addEventListener("mouseup", e => {
    app.drawAvailable = false;
  });
  oCanvas.addEventListener("mouseout", e => {
    app.drawAvailable = false;
  });
  oCanvas.addEventListener("mousemove", e => {
    if (app.drawAvailable) {
      let position = getPosition(e);
      let unit = getUnit(position);
      app.drawAvailable = true;
      unitOverMove(unit.y, unit.x);
    }
  });
}
//取得鼠标相对于canvas的偏移量
function getPosition(e) {
  var x, y;
  if (e.layerX || e.layerX == 0) {
    x = e.layerX;
    y = e.layerY;
  } else if (e.offsetX || e.offsetX == 0) {
    // Opera
    x = e.offsetX;
    y = e.offsetY;
  }
  return { x: x, y: y };
}
//根据鼠标偏移量，获得点击的单元格的坐标
function getUnit(position) {
  return {
    y: Math.floor(position.y / UNIT_OFFSET),
    x: Math.floor(position.x / UNIT_OFFSET)
  };
}
//绘制背景、即所有的单元格边框
function drawBackground() {
  for (let i = 0; i < app.height; i++) {
    for (let j = 0; j < app.width; j++) {
      drawUnit(i, j, app.backgroundValue);
    }
  }
}
//绘制单个单元格边框
function drawUnitBoarder(x, y) {
  ctx.strokeStyle = "#00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(y * UNIT_OFFSET, x * UNIT_OFFSET);
  ctx.lineTo((y + 1) * UNIT_OFFSET, x * UNIT_OFFSET);
  ctx.lineTo((y + 1) * UNIT_OFFSET, (x + 1) * UNIT_OFFSET);
  ctx.lineTo(y * UNIT_OFFSET, (x + 1) * UNIT_OFFSET);
  ctx.lineTo(y * UNIT_OFFSET, x * UNIT_OFFSET);
  ctx.stroke();
}
//绘制单个单元格的实际内容
function drawUnit(x, y, value) {
  ctx.fillStyle = generateFillStyle(value);
  ctx.beginPath();
  ctx.moveTo(y * UNIT_OFFSET, x * UNIT_OFFSET);
  ctx.lineTo((y + 1) * UNIT_OFFSET, x * UNIT_OFFSET);
  ctx.lineTo((y + 1) * UNIT_OFFSET, (x + 1) * UNIT_OFFSET);
  ctx.lineTo(y * UNIT_OFFSET, (x + 1) * UNIT_OFFSET);
  ctx.lineTo(y * UNIT_OFFSET, x * UNIT_OFFSET);
  ctx.fill();
}
function colorCharCode(value) {
  if (value < 10) {
    return value;
  } else {
    if (value == 10) {
      return "a";
    } else if (value == 11) {
      return "b";
    } else if (value == 12) {
      return "c";
    } else if (value == 13) {
      return "d";
    } else if (value == 14) {
      return "e";
    } else {
      return "f";
    }
  }
}
//根据传入的灰度生成Style
function generateFillStyle(grayValue) {
  let style = "#";
  let item_1 = colorCharCode(grayValue % 16);
  let item_2 = colorCharCode(Math.floor(grayValue / 16));
  for (let i = 0; i < 3; ++i) {
    style += item_2;
    style += item_1;
  }
  return style;
}
//点击单元格、拖动会触发的事件
function unitOverMove(y, x) {
  console.log(y, x);
  drawUnit(y, x, app.drawValue);
  app.setDrawArrayItemValue(y, x, app.drawValue);
}
</script>