import wishs from "../config/wishs";

export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

  var r = window.location.search.substr(1).match(reg);
  console.log(r);
  if (r != null) {
    return unescape(r[2]);
  }

  return null;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomWish = (min, max) => {
  let lan = getRandomInt(0, 1);
  let wish;
  if (lan == 1) {
    wish = wishs.en[getRandomInt(0, 49)];
  } else {
    wish = wishs.zh[getRandomInt(0, 49)];
  }

  return wish;
};


//5454545455454545
export const getWishArray = (str) => {
  let array = [];
  let cut = 10;
  let string = str;
  let temp = "";
   //zn evry 10 length per line
  if (checkChinese(str)) {
    console.log('checkChinese');
    //evry 14 per line
    array = splitCh(str,"，");
    console.log("getWishArray");
    console.log(array.length);
    if (array.length < 2) {
      array = splitBylength(str);
    }else{
      array = checkChineseMax(array);
    }
  } else {
    array =splitCh(str,",");
    if (array.length < 2) {
      array = splitByblack(str);
    }else{
      array = checkEnglishMax(array);
    }
  }

  console.log(array);
  return array;
};
export const splitCh = (str,char) => {
  let array = [];
  array = str.split(char);
  for (let index = 0; index < array.length-1; index++) {
    array[index] = array[index]+char;
  } 
 
  return array;
};
export const splitBylength = (str) => {
  let array = [];
  let cut = 14;
  let string = str;
  let temp = "";
  console.log("splitBylength in");
  console.log(string.length);
  console.log(string);
  if (string.length <= cut) {
    array.push(string);
  } else {
    while (string.length > cut) {
      console.log(string);
      // temp = subWish(string, cut * 2);
      temp = string.substr(0, cut);
      string = string.substr(temp.length, string.length);
      array.push(temp);
      if (string.length <= cut) {
        array.push(string);
        break;
      }
    }
  }
  console.log(array[0]);
  console.log("splitBylength out");
  return array;
};

export const splitByblack = (str) => {
  let array = [];
  let array2 = [];
  array = str.split(" ");
  console.log(array);
  let tempStr ='';
  for (let index = 0; index < array.length; index++) {
    if((tempStr.length+(array[index]+" ").length)>24){
      array2.push(tempStr);
      tempStr ='';
    }
    tempStr += array[index]+" ";
    
  }
  if(tempStr.length>0){
    array2.push(tempStr);
  }

  return array2;
};
export const checkChineseMax = (arr) => {

  let tempArr = [...arr];
  let arr2 =[];
  for (let index = 0; index < tempArr.length; index++) {
   if(tempArr[index].length>10){
    
    let a = splitBylength(tempArr[index]);
    for (let index = 0; index < a.length; index++) {
      arr2.push(a[index]);
      
    }
   }else{
    arr2.push(tempArr[index]);
   }
    
  }
  return arr2;
};



export const checkEnglishMax = (arr) => {

  let tempArr = [...arr];
  let arr2 =[];
  for (let index = 0; index < tempArr.length; index++) {
   if(tempArr[index].length>26){
    
    let a = splitByblack(tempArr[index]);
    for (let index = 0; index < a.length; index++) {
      arr2.push(a[index]);
      
    }
   }else{
    arr2.push(tempArr[index]);
   }
    
  }
  return arr2;
};
export const checkChinese = (val) => {
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(val)) {
    return true;
  } else {
    return false;
  }
};

export const getparams = (url, key) => {
  let str = url;
  let param = "";
  console.log(url);
  console.log(key);
  param = str.substring(str.indexOf(key) + key.length + 1);
  if (param.indexOf("&") > -1) {
    param = param.substring(0, param.indexOf("&"));
  }
  console.log(param);
  return param;
};

export const isEmpty = (str) => {
  if(str==undefined||str==null||str===""){
    return true;
  }
  return false;
};

export const getDate = () => {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth();
  let d = date.getDate();
  if(d<10){
    d = `0${d}`;
  }
  return `${d} ${Months[m]} ${y}`;
};

const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

