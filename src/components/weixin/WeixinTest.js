import React, { useContext, useState, useEffect } from "react";
import { getLocation,getLocationAdds ,configWeixin} from "../../printer/weixin";
import "./CustomerWelcome.css";
export default function WeixinTest() {

  const [address, setAddress] = useState("");
  const startJob = async () => {
    let result = await getLocationAdds();
    setAddress(result);
  
  };
  const checkAdd = async () => {
    let result = await getLocationAdds(23.195741653442383,113.61270904541016);
    setAddress(result);
  };
  useEffect(() => {
    (async () => {
      await configWeixin();
    })();
  }, []);
 


  return (
    <div className="welcomeBackground">
      <div className="welcomebgContent">
        <div className="wechatId">
          <span id="postWechatId">{address}</span>
        </div>
        <div className="niceMeet"></div>
        {/* <div>
          <button
            variant="contained"
            color="green"
            className="wishButton"
            onClick={checkAdd}
          >
            <span className="iWish">查询测试</span>
          </button>
        </div> */}

        <div >
          <button
            variant="contained"
            color="green"
            className="wishButton"
            onClick={startJob}
          >
            <span className="iWish">获取位置信息</span>
          </button>
        </div>
      </div>
    </div>
  );
}
