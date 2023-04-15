import React, { useContext, useState, useEffect } from "react";
import {getImg } from "../../printer/index";
import jsPDF from "jspdf";
import {
  getPrintListFromServer,
  finishWishJobToServer,
  getWishListFromServer
} from "../../fetch/index";
import { getQueryString } from "../../util/util";
import "./CustomerWelcome.css";
import config from "../../config/config";

export default function PrintJob() {
 
  const [printerId, setPrinterId] = useState();
  const [imgUrl, setImgUrl] = useState("");

  const saveImage = () => {
    if(imgUrl){
      let pdf = new jsPDF('p', 'pt', 'a4');
     // new jsPDF('p', 'pt', 'a4');
      let canvas = document.getElementById("canvas");
      pdf.addImage(imgUrl,"jpg",150, 0, canvas.width/2, canvas.height/2);
      pdf.save("test.pdf");
    }else{
      console.log("no image");
    }
    
  };

  const testImg = async () => {
    let result = await getWishListFromServer(printerId ? printerId : 1);
    let img;
    console.log(result.length)
    if (result.length > 0) {
      img = await getImg(result);
    }
   // console.log(img);
    setImgUrl(img);
  };
 

  return (
    <div>
    <div><canvas id="canvas" width="0" height="0" ></canvas></div>
    <div className="welcomeBackground">
     
      <div className="welcomebgContent">
        <div className="wechatId">
          <span id="postWechatId"></span>
        </div>       
        <div>
          <button
            variant="contained"
            color="green"
            className="wishButton"
            // onClick={startPrint}
            onClick={saveImage}
          >
            <span className="iWish">保存为PDF</span>
          </button>
        </div>
        <div>
          <button
            variant="contained"
            color="green"
            className="testButton"
            onClick={testImg}
          >
            <span className="iWish">打印机测试</span>
          </button>
        </div>
      </div>
      {/* <img src={imgUrl} id="myimg"></img> */}
    </div>
    </div>
  );
}
