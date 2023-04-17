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
import wishs from "../../config/wishs";

export default function PrintJob() {
 
  const [showCanvas, setShowCanvas] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const saveImage = () => {
    let canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    let url = context.canvas.toDataURL("image/png");
    if(url){
      let pdf = new jsPDF('p', 'pt', 'a4');
     // new jsPDF('p', 'pt', 'a4');
      let canvas = document.getElementById("canvas");
      pdf.addImage(url,"jpg",0, 0, canvas.width/6.2, canvas.height/6.2);
      pdf.save("test.pdf");
    }else{
      console.log("no image");
    }
    
  }; 
  const dishowCanvas = ()=>{
    
     setShowCanvas(false)

  } 
  const testImg = async () => {
   
   
    let result = await getWishListFromServer( 1);
    //let result = wishs.wishList;
    let img;
    console.log(result.length)
    if (result.length > 0) {
      setShowCanvas(true);
      img = await getImg(result);
      
    }else{
      alert("no wish in server");
    }
    setImgUrl(img);
   // console.log(img);
    
  };
 

  return (
    <div>
    <div className="canvasBackground" onClick={dishowCanvas} style={{ display: showCanvas ? "block" : "none" }}><div><canvas id="canvas" width="0" height="0"  ></canvas></div></div>
    <div className="welcomeBackground" style={{ display: !showCanvas ? "block" : "none" }}>
  
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
