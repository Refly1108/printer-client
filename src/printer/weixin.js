import config from "../config/config";
import { fetchRequest } from "../fetch";
export function jsSdkConfig() {
  //TODO 根据手机类型生成对应url

  //IOS 端需要从根url 中生成
  //ANDROID 需要从本路径下生成

  // let u = window.navigator.userAgent;
  // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // //安卓需要使用当前URL进行微信API注册（即当场调用location.href.split('#')[0]）
  // //iOS需要使用进入页面的初始URL进行注册，（即在任何pushstate发生前，调用location.href.split('#')[0]）
  // let url = '';
  // if (isiOS) {
  //     url = encodeURIComponent(`http://www.qq.com/home/index?op=${window.sessionStorage.getItem('option')}`);//获取初始化的url相关参数
  // } else {
  //     url = encodeURIComponent(window.location.href.split('#')[0]);
  // }

  const timeStap = new Date().getTime().toString().substr(0, 10);
  const path =
    "http://xxxxxxxxxxx/xxxx/xxxxx/wechat/position?timeStap=" + timeStap;

  fetch(path, { method: "GET" })
    .then((res) => res.json())
    .then((result) => {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wxxxxxxxxxxxxxx", // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: timeStap, // 必填，生成签名的时间戳（10位）
        nonceStr: "const", // 必填，生成签名的随机串,注意大小写
        signature: result["signature"], // 必填，签名，见附录1（通过https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 验证）
        jsApiList: ["getLocation"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
}

export const getSignatureFromServer = async (timeStap) => {
  let opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let result = await fetchRequest(
    config.url.getSignature + "?timeStap=" + timeStap,
    opts,
    true
  );
  console.log(result);
  return result.signature;
};

// debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: "wxa4065fe099206a50", // 必填，企业号的唯一标识，此处填写企业号corpid
//     timestamp: timeStap, // 必填，生成签名的时间戳（10位）
//     nonceStr: "const", // 必填，生成签名的随机串,注意大小写
//     signature: signature, // 必填，签名，见附录1（通过https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 验证）
//     jsApiList: ["getLocation", "openLocation"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

export const configWeixin = async () => {
  let timeStap = new Date().getTime().toString().substr(0, 10);
  let signature = await getSignatureFromServer(timeStap);
  window.wx.config({
    debug: false, 
    appId: "wxa4065fe099206a50",
    timestamp: timeStap, 
    nonceStr: "const", 
    signature: signature, 
    jsApiList: ["getLocation", "openLocation"], 
  });
};

// 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//     const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//     const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//     console.log(longitude,latitude)
//    // cookie.save("position",longitude+","+latitude);
//     const speed = res.speed; // 速度，以米/每秒计
//     const accuracy = res.accuracy; // 位置精度
// result = res;
//  alert(res);

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    window.wx.ready(function () {
      weixinRequest()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export function weixinRequest() {
  return new Promise((resolve, reject) => {
    window.wx.getLocation({
      type: "gcj02",
      success: (res) => {
        resolve(res);
      },
      cancel: (res) => {
        reject({ result: "canceled" });
      },
      fail: (res) => {
        reject({ result: "failed" });
      },
      complete: (res) => {},
    });
  });
}



// export const getLocation2 = async() => {
//   //----------------------------------
//   // window.wx.ready(function () {
//   //   console.log("window.wx.ready");

//   //   let result;

//   //   window.wx.getLocation({
//   //     type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//   //     success: (res) => {
//   //       //     const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//   //       //     const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//   //       //     console.log(longitude,latitude)
//   //       //    // cookie.save("position",longitude+","+latitude);
//   //       //     const speed = res.speed; // 速度，以米/每秒计
//   //       //     const accuracy = res.accuracy; // 位置精度
//   //       result = res;
//   //       alert(result);
//   //     },
//   //     cancel: (res) => {
//   //       alert(res);
//   //     },
//   //     fail: (res) => {
//   //       alert(res);
//   //     },
//   //     complete: (res) => {
//   //       alert(res);
//   //     },
//   //   });
//   // });
//  //---------------------------
//   window.wx.error(function (res) {
//     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//     alert(res);
//   });
//   let add;
//   if (result.latitude) {

//     window.wx.openLocation({
//       latitude: result.latitude, // 纬度，浮点数，范围为90 ~ -90
//       longitude: result.longitude, // 经度，浮点数，范围为180 ~ -180。
//       name: '', // 位置名
//       address: '', // 地址详情说明
//       scale: 28, // 地图缩放级别,整型值,范围从1~28。默认为最大
//       infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转

//     });

//    //add = await getLocationAdds(result.latitude,result.longitude)
//   } else {
//     add = result.result
//   }

//   return add;
// };

export const getLocationAdds = async () => {
  let opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let location = await getLocation();
  let result = await fetchRequest(
    config.url.getAddress +
      "latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude,
    opts,
    true
  );
  let add;
  if (result.status == 0) {
    add =
      result.result.address + ":" + result.result.formatted_addresses.recommend;
  }
  console.log(add);
  return add;
};
