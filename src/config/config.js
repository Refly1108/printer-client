const config = {
  url: {
    // getWish: "http://39.108.114.45/getWish",
    // finishWish: "http://39.108.114.45/finishWish?",
    getAddress:"/spring/hello/getAddress?",
    getSignature: "/spring/hello/getSignature",
    getWish: "https://zhiliaodev.htcangelfund.com/service/getWish",
    finishWish: "https://zhiliaodev.htcangelfund.com/service/finishWish?",
  },

  url_dev: {
    // getWish: "http://39.108.114.45/getWish",
    // finishWish: "http://39.108.114.45/finishWish?",
    getAddress:"/spring/hello/getAddress?",
    getSignature: "/spring/hello/getSignature",
    getWish: "/service/getWish",
    finishWish: "/service/finishWish?",
  },
  epson: { ip: "192.168.8.102", ip2: "192.168.8.102" },
  timer:5000,
};

export default config;
