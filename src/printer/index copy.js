import config from "../config/config";
import header_image from "../resource/heard_image.jpg";
import boot_image from "../resource/boot_image.jpg";
import { getWishArray } from "../util/util";
export const printerReceipt = async (data) => {
  console.log(data);
  const port = 8043;
  let error = 0;
  const result = await getPrinter(config.epson.ip, port);
  if (result.printer) {
    await printerData(data, result.printer);
  } else {
    error = result.error;
  }

  return { error: error };
};

export const getPrinter = async (ip, port) => {
  return new Promise((resolve, reject) => {
    var printer = null;
    var ePosDev = new window.epson.ePOSDevice();
    ePosDev.connect(ip, port, function (data) {
      console.log(data);
      if (data == "OK" || data == "SSL_CONNECT_OK") {
        ePosDev.createDevice(
          "local_printer",
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: true, buffer: false },
          function (devobj, retcode) {
            console.log(devobj);
            console.log(retcode);
            if (retcode == "OK") {
              printer = devobj;
              resolve({ printer: printer });
            } else {
              resolve({ printer: false, error: 2 });
            }
          }
        );
      } else {
        resolve({ printer: false, error: 1 });
      }
    });
  });
};

export const printerData = async (data, printer) => {
  console.log("start print data");
  console.log(data);
  let arr = ["中文祝福语Test1", "中文祝福语Test2", "中文祝福语Test13"];
  let len = await drawLogo(getWishArray(data.wish), data.nickname);
  await drawLogo2();
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const canvas2 = document.getElementById("canvas2");
  console.log(canvas);
  console.log("canvas2");
  console.log(canvas2);
  const context2 = canvas2.getContext("2d");
  console.log(context2);
  printer.addTextAlign(printer.ALIGN_LEFT);
  printer.addTextAlign(printer.ALIGN_LEFT);
  printer.addTextLineSpace(35);
  printer.addTextFont(printer.FONT_D);
  //

  console.log(len);
  if (context) {
    printer.addImage(
      context,
      0,
      0,
      600,
      len,
      printer.COLOR_1,
      printer.MODE_MONO
    );
  }

  // printer.addFeed(1);
  // printer.addText(data);

  console.log(context2);
  if (context2) {
    printer.addImage(
      context2,
      0,
      0,
      600,
      600,
      printer.COLOR_1,
      printer.MODE_MONO
    );
  }

  printer.addFeed(1);
  printer.addCut(printer.CUT_FEED);
  printer.send();
};

export const drawLogo = (arr, name) => {
  return new Promise((resolve, reject) => {
    let image_header = new Image();
    let canvas;
    let context;
    image_header.src = header_image;
    image_header.onload = function () {
      canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        let len = 0;
        console.log(image_header.width);
        console.log(image_header.height);
        canvas.width = image_header.width;
        canvas.height = image_header.height + 550 + arr.length * 50;
        console.log("canvas.height");
        console.log(image_header.height + 550 + arr.length * 50)
        context = canvas.getContext("2d");
        context.drawImage(image_header, 0, 0);
        context.beginPath();
        // context.font = "28px serif";
        context.font = "30px PingFang SC";
        //after first pic +50 height  for  hello name  fix height  50
        context.textAlign = "start";
        context.fillText("@" + name, 80, image_header.height + 50);
        //fix height  50
        context.fillText("很高兴在这里遇见你", 80, image_header.height + 100);
        //fix height  100
        context.textAlign = "center";
        context.fillText(
          "//////////////////////////////////",
          295,
          image_header.height + 200
        );
        // wishing lines start
        len = image_header.height + 250;
        ///--------------------
        // len += 50
        // context.textAlign="start";
        // context.fillText("textAlign=start123456789012345678901",0,len);
        // len += 50
        // context.textAlign="end";
        // context.fillText("textAlign=end",300,len);
        // len += 50
        // context.textAlign="left";
        // context.fillText("textAlign=left",300,len);
        // len += 50

        // context.fillText("textAlign=centeraaaaaaaa ",300,len);
        // len += 50
        // context.textAlign="right";
        // context.fillText("textAlign=right",300,len);
        // len += 50
        //-------------------------------
        for (let index = 0; index < arr.length; index++) {
          context.fillText(arr[index], 295, len + 50);
          len += 50;
        }

        // wishing lines end
        len += 100;
        context.textAlign = "start";
        context.fillText("祝福你心愿成真！", 80, len);
        //fix height  100
        len += 100;
        context.textAlign = "center";
        context.fillText("//////////////////////////////////", 295, len);

        console.log('return len');
        console.log(len + 10);
        context.closePath();
        resolve(len + 10);
      } else {
        resolve(false);
      }
    };
  });
};

export const drawLogo2 = () => {
  return new Promise((resolve, reject) => {
    let image_boot = new Image();
    let canvas;
    let context;
    image_boot.src = boot_image;
    image_boot.onload = function () {
      canvas = document.getElementById("canvas2");
      if (canvas.getContext) {
        console.log(image_boot.width);
        console.log(image_boot.height);
        canvas.width = image_boot.width;
        canvas.height = image_boot.height + 80;

        context = canvas.getContext("2d");

        context.drawImage(image_boot, 0, 0);
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
};

const canvasBarrage =  (data) =>{
  let canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  canvas.width = 2000;
  canvas.height = 2000;

  // 存储实例
  var store = {};

  // 字号大小
  var fontSize = 28;

  // 实例方法
  var Barrage = function (obj, index) {
      // 随机x坐标也就是横坐标，对于y纵坐标，以及变化量moveX
      this.x = (1 + index * 0.1 / Math.random()) * canvas.width;
      this.y = obj.range[0] * canvas.height + (obj.range[1] - obj.range[0]) * canvas.height * Math.random() + 36;
      if (this.y < fontSize) {
          this.y = fontSize;
      } else if (this.y > canvas.height - fontSize) {
          this.y = canvas.height - fontSize;
      }
      this.moveX = 1 + Math.random() * 3;

      this.opacity = 0.8 + 0.2 * Math.random();
      this.params = obj;

      this.draw = function () {
          var params = this.params;
          // 根据此时x位置绘制文本
          context.strokeStyle = params.color;
          context.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
          context.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
          context.fillText(params.value, this.x, this.y);
          context.strokeText(params.value, this.x, this.y);
      };
  };

  data.forEach(function (obj, index) {
      store[index] = new Barrage(obj, index);
  });

  // 绘制弹幕文本
  var draw = function () {
      for (var index in store) {
          var barrage = store[index];
          // x 左移
          barrage.x -= barrage.moveX;
          if (barrage.x < -1 * canvas.width * 1.5) {
              // 移动到画布外部时候从左侧开始继续位移
              barrage.x = (1 + index * 0.1 / Math.random()) * canvas.width;
              barrage.y = (barrage.params.range[0] + (barrage.params.range[1] - barrage.params.range[0]) * Math.random()) * canvas.height;
              if (barrage.y < fontSize) {
                  barrage.y = fontSize;
              } else if (barrage.y > canvas.height - fontSize) {
                  barrage.y = canvas.height - fontSize;
              }
              barrage.moveX = 1 + Math.random() * 3;
          }
          // 根据新位置绘制圆圈圈
          store[index].draw();
      }
  };

  // 画布渲染
  var render = function () {
      // 清除画布
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
     
     
      context.drawImage(backgroundImage, 0, 0);
  
      // 绘制画布上所有的圆圈圈
      draw();

      // 继续渲染
      requestAnimationFrame(render);
  };
  
  let backgroundImage = new Image();
  backgroundImage.src = background;
  backgroundImage.onload = function () {
    render();
  }
 
};

