import config from "../config/config";
import header_image from "../resource/heard_image.jpg";
import boot_image from "../resource/boot_image.jpg";
import { getWishArray,getDate } from "../util/util";
import base64Img from "base64-img";
import wishs from "../config/wishs";
export const printerReceipt = async (data) => {
  console.log(data);
  const port = 8080;
  let error = 0;
  const result = await getPrinter(
    data.printerId == 1 ? config.epson.ip : config.epson.ip2,
    port
  );
  if (result.printer) {
    //await printerData(data, result.printer);
    await printerDatav2(data, result.printer);
  } else {
   // await printerDatav2(data, result.printer);
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

export const printerDatav2 = async (data, printer) => {
  console.log("start print data");
  console.log(data);
  let arr = ["中文祝福语Test1", "中文祝福语Test2", "中文祝福语Test13"];
  let canvasData = await drawImage_v2(getWishArray(data.wish), data.nickname);
  // printer.addTextAlign(printer.ALIGN_LEFT);
  // printer.addTextAlign(printer.ALIGN_LEFT);
  // printer.addTextLineSpace(35);
  // printer.addTextFont(printer.FONT_D);
  console.log(canvasData);
  if (canvasData.context) {
    printer.addImage(
      canvasData.context,
      0,
      0,
      600,
      canvasData.height,
      printer.COLOR_1,
      printer.MODE_MONO
    );
  }
  printer.addFeed(1);
  printer.addCut(printer.CUT_FEED);
  printer.send();
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
  
  console.log('len ='+len+500);
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
      500,
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
        context = canvas.getContext("2d");
        //refly  if want to printer the job number
        // context.beginPath();
        // context.font = "30px PingFang SC";
        // context.fillText("心愿号码:008", 370, 25);
        // context.closePath();
        // context.drawImage(image_header, 0, 30);
        //refly  if want to printer the job number
        context.drawImage(image_header, 0, 0);
        context.beginPath();
        // context.font = "28px serif";
        context.font = "30px PingFang SC";
        //after first pic +50 height  for  hello name  fix height  50
        context.textAlign = "start";
        len = image_header.height;
        //refly  if want to printer the job number
        // len = image_header.height+30
        len += 60;
        context.fillText("@" + name, 80, len);
        //fix height  50
        len += 45;
        context.fillText("很高兴在这里遇见你", 80, len);
        //fix height  100
        context.textAlign = "center";
        len += 80;
        context.fillText("//////////////////////////////////", 295, len);
        len += 120;
        context.font = "80px 黑体";
        context.fillText("“", 76, len);
        context.font = "30px PingFang SC";
        // wishing lines start
        // len = image_header.height + 235;
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
        len += 10;
        for (let index = 0; index < arr.length; index++) {
          context.fillText(arr[index], 295, len);
          len += 45;
        }
        len += 50;
        context.font = "80px 黑体";
        context.fillText("”", 510, len);
        context.font = "30px PingFang SC";
        // wishing lines end
        len += 35;
        context.textAlign = "start";
        context.fillText("祝福你心愿成真！", 80, len);
        //fix height  100
        len += 80;
        context.textAlign = "center";
        context.fillText("//////////////////////////////////", 295, len);
        len += 45;
        context.fillText("      ", 295, len);
        console.log(len);
        context.closePath();
        // myimg.src = context.toDataURL('image/png');
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

export const drawImage = (arr, name) => {
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
          canvas.height = image_header.height + 550 + arr.length * 50+image_boot.height;
          context = canvas.getContext("2d");
          //refly  if want to printer the job number
          // context.beginPath();
          // context.font = "30px PingFang SC";
          // context.fillText("心愿号码:008", 370, 25);
          // context.closePath();
          // context.drawImage(image_header, 0, 30);
          //refly  if want to printer the job number
          context.drawImage(image_header, 0, 0);
          context.beginPath();
          // context.font = "28px serif";
          context.font = "30px PingFang SC";
          //after first pic +50 height  for  hello name  fix height  50
          context.textAlign = "start";
          len = image_header.height;
          //refly  if want to printer the job number
          // len = image_header.height+30
          len += 60;
          context.fillText("@" + name, 80, len);
          //fix height  50
          len += 45;
          context.fillText("很高兴在这里遇见你", 80, len);
          //fix height  100
          context.textAlign = "center";
          len += 80;
          context.fillText("//////////////////////////////////", 295, len);
          len += 120;
          context.font = "80px 黑体";
          context.fillText("“", 76, len);
          context.font = "30px PingFang SC";
         
          len += 10;
          for (let index = 0; index < arr.length; index++) {
            context.fillText(arr[index], 295, len);
            len += 45;
          }
          len += 50;
          context.font = "80px 黑体";
          context.fillText("”", 510, len);
          context.font = "30px PingFang SC";
          // wishing lines end
          len += 35;
          context.textAlign = "start";
          context.fillText("祝福你心愿成真！", 80, len);
          //fix height  100
          len += 80;
          context.textAlign = "center";
          context.fillText("//////////////////////////////////", 295, len);
          len += 45;
          context.fillText("      ", 295, len);
          //console.log(len);
          context.closePath();
          context.drawImage(image_boot, 0, len);
          let src = canvas.toDataURL("image/png");
          resolve(src);
        } else {
          resolve(false);
        }

      }
     
    };
  });
};


export const drawImage_v2 = (arr, name) => {
  return new Promise((resolve, reject) => {
    let image_header = new Image();
   // let dpr =window.devicePixelRatio;
    //alert(dpr);
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

          console.log("image_header",image_header.width,image_header.height);
          console.log("image_boot",image_boot.width,image_boot.height);
          let x=0.8;
          let y=-33;//30
          canvas.width = 600;//935
          let fixLeng =60+45+60+60+45+80+80+100+10+arr.length * 45+45+45+60+100+10+wishs.weSay.length*45+50+80+45;
          canvas.height = image_header.height +image_boot.height+fixLeng*0.8;//+ 800 + arr.length * 45+wishs.weSay.length*45
          context = canvas.getContext("2d");
          
          context.drawImage(image_header, 15+y, 0);
          context.beginPath();
        
          context.font = "400 25px PingFang HK";
          context.textAlign = "start";
          len = image_header.height;
         
          len += 60*x;
          context.fillText(getDate(), 80+y, len);
        
          len += 45*x;
          context.fillText("Guangzhou,China", 80+y, len);

          len += 60*x
          context.font = "23px PingFang HK";
          context.fillText("———————————————————", 0, len-10);
          context.fillText("———————————————————", 80+y, len);

          len += 60*x
          context.font = "700 25px Arial";
          context.fillText("Hi " + name, 80+y, len);
       
          len += 45*x;
          context.font = "400 25px Arial";
          context.fillText("Nice to meet you today", 80+y, len);
       
        
          len += 80*x;
          context.font = "25px PingFang HK";
          context.textAlign = "start";
          context.fillText("/////////////////////////////////////////////",  80+y, len);

          len += 80*x;
          context.textAlign = "start";
          context.font = "700 25px Arial";
          context.fillText("You said", 80+y, len);

          len += 100*x;
          context.font = "80px 黑体";
          context.fillText("“", 55/1.41+y, len);

          len += 10*x;
          context.font = "400 25px Arial";
          context.textAlign = "start";
          for (let index = 0; index < arr.length; index++) {
            context.fillText(arr[index],  135+y, len);
            len += 45*x;
          }

          len += 45*x;
          context.font = "80px 黑体";
          context.fillText("”",  520+y, len);

         
          len += 45*x     
          context.font = "23px PingFang HK";
          context.textAlign = "start";   
                             
          context.fillText("———————————————————", 80+y, len);

          len += 60*x
          context.textAlign = "start";
          context.font = "700 25px Arial";
          context.fillText("We'll say", 80+y, len);

          len += 100*x;
          context.font = "80px 黑体";
          context.fillText("“", 40+y, len);

         
          len += 10*x;
          context.font = "400 25px Arial";
          context.textAlign = "start";
          for (let index = 0; index < wishs.weSay.length; index++) {
            context.fillText(wishs.weSay[index], 135+y, len);
            len += 45*x;
          }

          len += 50*x;
          context.font = "80px 黑体";
          context.fillText("”", 520+y, len);

          len += 80*x;
          context.font = "25px PingFang SC";
          context.textAlign = "start";
          context.fillText("/////////////////////////////////////////////", 80+y, len);

          len += 45*x;
          // context.fillText("      ", 295, len);

          context.closePath();

          context.drawImage(image_boot, 20+y, len);
          console.log(len+image_boot.height)  ;
          console.log(context)   ;
          let src = canvas.toDataURL("image/png");
          resolve({context:context,width:canvas.width,height:canvas.height,src:src});
        } else {
          resolve(false);
        }

      }
     
    };
  });
};

export const getImg = async (data) => {
 
  let src = await drawImage_v2(getWishArray(data.wish), data.nickname);
  // var filepath = await base64Img.imgSync(src,'../resource',data.wishId);
  console.log(src);
  return src.src;
}


export const generateImgae = async (data) => {
 // let len = await drawLogo(getWishArray(data.wish), data.nickname);
  let src = await drawImage(getWishArray(data.wish), data.nickname);
  // var filepath = await base64Img.imgSync(src,'../resource',data.wishId);
  // console.log(filepath);
  return { error: 0 };
}