import React, { useState ,useEffect} from "react";
import { getLocation,getLocationAdds ,configWeixin} from "../../printer/weixin";
import {generateQRCode} from "../../util/util"
import "./CustomerWelcome.css";
import QRCode from 'qrcode.react';
export default function WeixinTest() {

  const [address, setAddress] = useState("");
  const [qrcode, setQrcode] = useState("");
  const startJob = async () => {
    let result = await getLocationAdds();
    setAddress(result);
  
  };
  const checkAdd = async () => {
    let result = await getLocationAdds(23.195741653442383,113.61270904541016);
    setAddress(result);
  };
 
  useEffect(() => {
    setQrcode(generateQRCode());
  }, []);
  return (
    <div className="welcomeBackground">
      <div className="welcomebgContent">
        <div className="wechatId">
          <span id="postWechatId">{address}</span>
          <QRCode value={qrcode} size={400}> </QRCode>
        </div>
        <div className="niceMeet"></div>
      

        <div >
          <button
            variant="contained"
            color="green"
            className="wishButton"
            onClick={startJob}
          >
            <span className="iWish">login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
