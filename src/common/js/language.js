import ResourceCN from "../../resource/resourceCN"
import ResourceEN from "../../resource/resourceEN"
import ResourceJA from "../../resource/resourceJA"

var currentLanguage, Resource;
var cookieLanguage = getLang().toLowerCase();
if (cookieLanguage !== undefined) {
  currentLanguage = cookieLanguage;
} else {
  currentLanguage = (navigator.language || navigator.browserLanguage).toLowerCase(); // 获取当前浏览器的语言
}
if (currentLanguage.startsWith('zh')) {
  Resource = ResourceCN;
} else if (currentLanguage.startsWith('ja')) {
  Resource = ResourceJA;
  inputCSS("../../../src/common/styles/cover_EN.css") 
} else {
  Resource = ResourceEN;
  inputCSS("../../../src/common/styles/cover_EN.css")
}
function getLang() {
  //浏览器语言  IE用browserLanguage，非IE使用language进行判断
let lang = (navigator.language || navigator.browserLanguage).toLowerCase();
window.lang = lang;
  //判断portal设置语言 通过cookie获取
//   const cookies = document.cookie.split(';');
//   if (cookies.length > 0) {
//     cookies.forEach(function (cookie) {
//       const arr = cookie.split('=');
//       if (arr[0].toLowerCase().trim() === 'language') {
//         lang = arr[1];
//         return;
//       }
//     });
//   }
  return lang;
};

function inputCSS(href) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
      document.getElementsByTagName("HEAD")[0].appendChild(link);
}

export default Resource;
