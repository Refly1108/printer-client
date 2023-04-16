import config from "../config/config";
import header_image from "../resource/heard_image.jpg";
import boot_image from "../resource/boot_image.jpg";
import background from "../resource/background.jpg";
import {
  getWishArray,
  getDate,
  getRandomColor,
  getRandomInt,
} from "../util/util";
import base64Img from "base64-img";
import wishs from "../config/wishs";

export const drawImage_v2 = (arr, name) => {
  return new Promise((resolve, reject) => {
    let image_header = new Image();

    let canvas;
    let context;
    image_header.src = header_image;
    image_header.onload = function () {
      canvas = document.getElementById("canvas");
      let image_boot = new Image();
      image_boot.src = boot_image;
      image_boot.onload = function () {
        if (canvas.getContext) {
          let len = 0;
          console.log(image_header.width);
          console.log(image_header.height);
          canvas.width = image_header.width;
          canvas.height =
            image_header.height +
            935 +
            arr.length * 45 +
            wishs.weSay.length * 45 +
            image_boot.height;
          context = canvas.getContext("2d");

          context.drawImage(image_header, 0, 0);
          context.beginPath();

          context.font = "400 25px PingFang SC";
          context.textAlign = "start";
          len = image_header.height;

          len += 60;
          context.fillText(getDate(), 80, len);

          len += 45;
          context.fillText("Guangzhou,China", 80, len);

          len += 60;
          context.font = "30px PingFang SC";
          context.fillText("——————————————", 80, len);

          len += 60;
          context.font = "700 25px Arial";
          context.fillText("Hi " + name, 80, len);

          len += 45;
          context.font = "400 25px Arial";
          context.fillText("Nice to meet you today", 80, len);

          len += 80;
          context.font = "30px PingFang SC";
          context.textAlign = "center";
          context.fillText("//////////////////////////////////", 295, len);

          len += 80;
          context.textAlign = "start";
          context.font = "700 25px Arial";
          context.fillText("You said", 80, len);

          len += 80;
          context.font = "80px 黑体";
          context.fillText("“", 40, len);

          len += 10;
          context.font = "400 25px Arial";
          context.textAlign = "center";
          for (let index = 0; index < arr.length; index++) {
            context.fillText(arr[index], 295, len);
            len += 45;
          }

          len += 45;
          context.font = "80px 黑体";
          context.fillText("”", 510, len);

          len += 45;
          context.font = "30px PingFang SC";
          context.textAlign = "start";
          context.fillText("——————————————", 80, len);

          len += 60;
          context.textAlign = "start";
          context.font = "700 25px Arial";
          context.fillText("We said", 80, len);

          len += 80;
          context.font = "80px 黑体";
          context.fillText("“", 40, len);

          len += 10;
          context.font = "400 25px Arial";
          context.textAlign = "center";
          for (let index = 0; index < wishs.weSay.length; index++) {
            context.fillText(wishs.weSay[index], 295, len);
            len += 45;
          }

          len += 50;
          context.font = "80px 黑体";
          context.fillText("”", 510, len);

          len += 80;
          context.font = "30px PingFang SC";
          context.textAlign = "center";
          context.fillText("//////////////////////////////////", 295, len);

          len += 45;
          context.fillText("      ", 295, len);

          context.closePath();

          context.drawImage(image_boot, 0, len);
          console.log(len);
          let src = canvas.toDataURL("image/png");
          resolve(src);
        } else {
          resolve(false);
        }
      };
    };
  });
};

export const drawImage = async(wishList) => {
  let canvas;
  let context;
  let images;
  canvas = document.getElementById("canvas");
  // let image = new Image();
  let backgroundImage = new Image();
  if (canvas.getContext) {
    context = canvas.getContext("2d");
    backgroundImage.src = background;
    backgroundImage.onload = async function () {
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;
      initWishs();
      images = await loadImages(wishList);
      //  moveWishs();
      drawWishs();
     
    };
  } else {
    console.log("error");
  }
  // const render = (wishList) => {

  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   context.drawImage(backgroundImage, 0, 0);
  //   // 绘制画布上所有的圆圈圈
  //   drawWishs();
  //   // 继续渲染
  //   requestAnimationFrame(render);
  // }
  const moveWishs = () => {
    wishList.forEach((element) => {
      element.x -= element.moveSpeed;
      if (element.x < -100) {
        element.x = canvas.width;
      }
      // console.log(element);
    });
  };

  const initWishs =  () => {
   
    wishList.forEach((element) => {
      element.color = getRandomColor();
      element.x = getRandomInt(canvas.width / 2, canvas.width);
      element.y = getRandomInt(20, canvas.height / 2);
      element.moveSpeed = getRandomInt(2, 4);

     
    });
    
  };

  const draw = () => {
   // let image = new Image();
   let count =0;
    wishList.forEach((element) => {
   //   image.src = element.headImgUrl;
   //console.log(count);
 //  console.log(images[count]);
      context.drawImage(
        images[count],
        element.x,
        element.y,
        images[count].width / 2,
        images[count].height / 2
      );
      // image = new Image();
      context.strokeStyle = element.color;
      context.font = "600 30px PingFang SC";
      context.textAlign = "start";
      context.fillStyle = "rgba(0,0,0,1)";
      context.fillText(
        element.nickname + " 在: " + element.address + " 说：",
        element.x + images[count].width / 2 + 10,
        element.y + 30
      );
      context.strokeText(
        element.nickname + " 在: " + element.address + " 说：",
        element.x + images[count].width / 2 + 10,
        element.y + 30
      );

      context.font = "600 35px PingFang SC";
      context.fillText(
        element.wish,
        element.x + images[count].width / 2 + 10,
        element.y + 70
      );
      context.strokeText(
        element.wish,
        element.x + images[count].width / 2 + 10,
        element.y + 70
      );
      count++;
      // image.src = element.headImgUrl;
      //  context.drawImage(image, element.x, element.y, image.width/2, image.height / 2);
      // image.onload = function () {
      // //  console.log(element.image);
      //   context.drawImage(image, element.x, element.y, image.width/2, image.height / 2);
      //   context.strokeStyle = element.color;
      //   context.font = "600 20px PingFang SC";
      //   context.textAlign = "start";
      //   context.fillStyle = 'rgba(255,255,255,1)';
      //   context.fillText(element.nickname,image.width/2+10, image.height/2-25);
      //   context.strokeText(element.nickname,image.width/2+10, image.height/2-25);
      // }

      //  context.strokeStyle = params.color;
      //  context.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
      // context.fillStyle = 'rgba(255,255,255,1)';
      // context.fillText(params.value, this.x, this.y);
      // context.strokeText(params.value, this.x, this.y);
    });
  };

  const drawWishs = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0);
    // 绘制画布上所有的圆圈圈
    moveWishs();
    draw();
    // 继续渲染
    let wishFram = requestAnimationFrame(drawWishs);
    window.addEventListener("click", () => {
      // console.log(wishFram)
      if (wishFram) {
        cancelAnimationFrame(wishFram);
        // wishFram = null;
      }
    });
  };
};
export const loadImages = async (wishList) => {

  return new Promise((resolve, reject) => {
    var count = 0,
      images = {},
      imgNum = 0,
      num = 0;
      wishList.forEach(element => {
        imgNum++;
      });
      wishList.forEach(element => {
        images[count] = new Image();
        images[count].onload = function () {
         
          num++;
          console.log(num);
          console.log(imgNum);
          if (num >= imgNum) {
            resolve(images);
          }
        };
        images[count].src = element.headImgUrl;
      //  console.log(images[count].src);
        count++
       

      });
  });
};
export const getImg = async (wishList) => {
  await drawImage(wishList);
  //canvasBarrage(wishs.dataBarrage);
};
export const sleep = async (timer) => {
  let date = new Date();
  let date2 = new Date();
  while (true) {
    date2 = new Date();
    if (parseInt(date2 - date) > timer) {
      break;
    }
  }
};

// 弹幕方法
