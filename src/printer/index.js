import config from "../config/config";
import header_image from "../resource/heard_image.jpg";
import boot_image from "../resource/boot_image.jpg";
import { getWishArray,getDate } from "../util/util";
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
          canvas.height = image_header.height + 935 + arr.length * 45+wishs.weSay.length*45+image_boot.height;
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

          len += 60
          context.font = "30px PingFang SC";
          context.fillText("——————————————", 80, len);

          len += 60
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

         
          len += 45     
          context.font = "30px PingFang SC";
          context.textAlign = "start";    
          context.fillText("——————————————", 80, len);

          len += 60
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
          console.log(len)   
          let src = canvas.toDataURL("image/png");
          resolve(src);
        } else {
          resolve(false);
        }

      }
     
    };
  });
};

export const drawImage = (wishList) => {
  return new Promise((resolve, reject) => {

    let canvas;
    let context;
    canvas = document.getElementById("canvas");
    let image = new Image();
    if (canvas.getContext) {
      canvas.width = 600;
      canvas.height = 600;
      context = canvas.getContext("2d");
      wishList.forEach(element => {
       console.log(element);
       image.src = element.headImgUrl;
       image.onload = function () {
        context.drawImage(image, 0, 0);
       }
     });
    let src = canvas.toDataURL("image/png");
    resolve(src);
    }else {
      resolve(false);
    }

  //   let image_header = new Image();
    
   
  //   image_header.src = header_image;
  //   image_header.onload = function () {
     
  //     let image_boot = new Image();
  //     image_boot.src = boot_image;
  //     image_boot.onload = function () {
  //       if (canvas.getContext) {
  //         let len = 0;
  //         console.log(image_header.width);
  //         console.log(image_header.height);
  //         canvas.width = image_header.width;
  //         canvas.height = image_header.height + 935 + arr.length * 45+wishs.weSay.length*45+image_boot.height;
  //         context = canvas.getContext("2d");
          
  //         context.drawImage(image_header, 0, 0);
  //         context.beginPath();
        
  //         context.font = "400 25px PingFang SC";
  //         context.textAlign = "start";
  //         len = image_header.height;
         
  //         len += 60;
  //         context.fillText(getDate(), 80, len);
        
  //         len += 45;
  //         context.fillText("Guangzhou,China", 80, len);

  //         len += 60
  //         context.font = "30px PingFang SC";
  //         context.fillText("——————————————", 80, len);

  //         len += 60
  //         context.font = "700 25px Arial";
  //         context.fillText("Hi " + name, 80, len);
       
  //         len += 45;
  //         context.font = "400 25px Arial";
  //         context.fillText("Nice to meet you today", 80, len);
       
        
  //         len += 80;
  //         context.font = "30px PingFang SC";
  //         context.textAlign = "center";
  //         context.fillText("//////////////////////////////////", 295, len);

  //         len += 80;
  //         context.textAlign = "start";
  //         context.font = "700 25px Arial";
  //         context.fillText("You said", 80, len);

  //         len += 80;
  //         context.font = "80px 黑体";
  //         context.fillText("“", 40, len);

         
  //         len += 10;
  //         context.font = "400 25px Arial";
  //         context.textAlign = "center";
  //         for (let index = 0; index < arr.length; index++) {
  //           context.fillText(arr[index], 295, len);
  //           len += 45;
  //         }

  //         len += 45;
  //         context.font = "80px 黑体";
  //         context.fillText("”", 510, len);

         
  //         len += 45     
  //         context.font = "30px PingFang SC";
  //         context.textAlign = "start";    
  //         context.fillText("——————————————", 80, len);

  //         len += 60
  //         context.textAlign = "start";
  //         context.font = "700 25px Arial";
  //         context.fillText("We said", 80, len);

  //         len += 80;
  //         context.font = "80px 黑体";
  //         context.fillText("“", 40, len);

         
  //         len += 10;
  //         context.font = "400 25px Arial";
  //         context.textAlign = "center";
  //         for (let index = 0; index < wishs.weSay.length; index++) {
  //           context.fillText(wishs.weSay[index], 295, len);
  //           len += 45;
  //         }

  //         len += 50;
  //         context.font = "80px 黑体";
  //         context.fillText("”", 510, len);

  //         len += 80;
  //         context.font = "30px PingFang SC";
  //         context.textAlign = "center";
  //         context.fillText("//////////////////////////////////", 295, len);

  //         len += 45;
  //         context.fillText("      ", 295, len);

  //         context.closePath();

  //         context.drawImage(image_boot, 0, len);
  //         console.log(len)   
  //         let src = canvas.toDataURL("image/png");
  //         resolve(src);
  //       } 

  //     }
     
  //   };
   });
};


export const getImg = async (wishList) => {
  //let src = await drawImage_v2(getWishArray(data.wish), data.nickname);
   let src = await drawImage(wishList);
  // var filepath = await base64Img.imgSync(src,'../resource',data.wishId);
  // console.log(filepath);
  return src
}
