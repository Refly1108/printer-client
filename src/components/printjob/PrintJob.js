import React, { useContext, useState, useEffect } from "react";
import { printerReceipt, getImg, generateImgae } from "../../printer/index";
import jsPDF from "jspdf";
import {
  getPrintListFromServer,
  finishWishJobToServer,
} from "../../fetch/index";
import { getQueryString ,getRandomWish} from "../../util/util";
import "./CustomerWelcome.css";
import config from "../../config/config";
import wishs from "../../config/wishs";
let started = false;
export default function PrintJob() {
  const [printResult, setPrintResult] = useState(0);
  const [displayInputPop, setDisplayInputPop] = useState(false);
  const [printerStatus, setPrinterStatus] = useState(false);
  const [printerId, setPrinterId] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [currentJob, setCurrentJob] = useState({
    wishId: -1,
    nickname: "",
  });
  const [start, setStart] = useState(false);

  const stopPrint = () => {
    console.log("stopPrint");
    setStart(false);
    started = false;
  };

  const startPrint = () => {
    console.log("startPrint");
    started = true;
    setStart(true);
    startJob();
  };

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
const sleep = async (timer)=>{
  let date = new Date();
  let date2 = new Date();
  while (true) {

    date2 = new Date();
    if (parseInt(date2 - date) > timer) {
      break;
    }
  }

}
  const startJob = async () => {
    console.log("startJob");
    let date = new Date();
    let date2 = new Date();
    while (started) {
      //get the current date2
      date2 = new Date();
      if (parseInt(date2 - date) > config.timer) {
        console.log(date);
        console.log(date2);
        let result = await getPrintListFromServer(printerId ? printerId : 1);

        if (result.wishId > -1) {
          console.log(result);
          for (let index = 0; index < result.copy; index++) {
            if (!(await executeJob(result))) {
              stopPrint();
              break;
            }
            await sleep(5000);
          }
        }
        //reset date
        date = new Date();
        console.log(result);
      } else {
        // date2 = new Date();
        //keep loop untial reach timer
      }
    }
  };
  const executeJob = async (job) => {
    setCurrentJob(job);
    setPrintResult(2);
    let result = await printerReceipt(job);
    //let result = await generateImgae(job);
    setPrintResult(result.error);
    if (result.error == 0) {
      setCurrentJob({
        wishId: -1,
        nickname: "",
      });
      await finishWishJobToServer(job);
      return true;
    } else {
      return false;
    }

    // console.log(array[0].name);
  };

  const testPrinter = async () => {
   
    let result = await printerReceipt({
      wishId: 99,
      printerId: printerId,
      nickname: "壹.零",
     // wish: getRandomWish(),
      wish: wishs.en[0],
      copy: 1,
    });

    if (result.error != 0) {
      enablePrinterPop(false);
    } else {
      enablePrinterPop(true);
    }
  };
  const testImg = async () => {
    let result = await getImg({
      wishId: 99,
      printerId: printerId,
      nickname: "Refly_YAN",
      wish: getRandomWish(),
      copy: 1,
    });

    //let result = await getPrintListFromServer(printerId ? printerId : 1);
    let img;
    if (result.wishId > -1) {
      img = await getImg(result);
      //await finishWishJobToServer(result);
    }
    //console.log(img);
    setImgUrl(img);
   
  };
  useEffect(() => {
    if (getQueryString("printerId")) {
      setPrinterId(getQueryString("printerId"));
    }
  }, []);

  const enablePrinterPop = (status) => {
    setPrinterStatus(status);
    setDisplayInputPop(true);
    //打印逻辑
  };

  const closeprinterPop = () => {
    setDisplayInputPop(false);
  };
  const jobList = () => {
    return (
      <div>
        {/* <ol>
          {printeList.map((value, key) => {
            return (
              <ul>
                {key+1}:  
                {value.name}
              </ul>
            );
          })}
        </ol> */}
        <div>
          单前任务{" "}
          {currentJob.wishId == -1 ? "当前没有任务" : currentJob.wishId}
          {" " + currentJob.nickname + " "} 结果:
          {printResult == 0
            ? "成功"
            : printResult == 1
            ? "失败"
            : "打印中。。。"}
        </div>
      </div>
    );
  };

  return (
    <div>
    <div><canvas id="canvas" width="0" height="0" ></canvas></div>
    <div className="welcomeBackground">
     
      <div className="welcomebgContent">
        <div className="wechatId">
          <span id="postWechatId">任务列表</span>
        </div>
        <div className="niceMeet">{jobList()}</div>
        <div style={{ display: start ? "block" : "none" }}>
          <button
            variant="contained"
            color="green"
            className="wishButton"
            onClick={stopPrint}
          >
            <span className="iWish">stop printer job</span>
          </button>
        </div>

        <div style={{ display: !start ? "block" : "none" }}>
          <button
            variant="contained"
            color="green"
            className="wishButton"
            onClick={startPrint}
            // onClick={saveImage}
          >
            {/* <span className="iWish">保存为PDF</span> */}
            <span className="iWish">start printer job</span>
          </button>
        </div>
        <div>
          <button
            variant="contained"
            color="green"
            className="testButton"
            onClick={testImg}
          //  onClick={testPrinter}
          >
            <span className="iWish">printer testing</span>
          </button>
        </div>
        <div style={{ display: displayInputPop ? "block" : "none" }}>
          <span className="InputPopWording" onClick={closeprinterPop}>
            <div className="InputPopReminderWording">
              {printerStatus ? "打印机正常" : "打印机故障"}
            </div>
          </span>
        </div>
      </div>
      {/* <img src={imgUrl} id="myimg"></img> */}
    </div>
    </div>
  );
}
