var lastNumberCategory;
var JoinOparatorSymbol = "3.1415926";

function isNotEmptyStr($str) {
  if (String($str) == "" || $str == undefined || $str == null || $str == "null") {
    return false;
  }
  return true;
}

function rawDataMap(rawData, ruleType) {

  if (!isNotEmptyStr(rawData) || !isNotEmptyStr(ruleType)) {
    return;
  }
  var mapData;
  var rawNumber = parseInt(rawData);
  var ruleTypeNumber = parseInt(ruleType);
  if (!isNaN(rawData)) {
    lastNumberCategory = ruleTypeNumber;
    //字体文件1下的数据加密规则
    if (ruleTypeNumber == 1) {
      if (rawNumber == 1) {
        mapData = 1;
      }
      else if (rawNumber == 2) {
        mapData = 2;
      }
      else if (rawNumber == 3) {
        mapData = 4;
      }
      else if (rawNumber == 4) {
        mapData = 5;
      }
      else if (rawNumber == 5) {
        mapData = 3;
      }
      else if (rawNumber == 6) {
        mapData = 8;
      }
      else if (rawNumber == 7) {
        mapData = 6;
      }
      else if (rawNumber == 8) {
        mapData = 9;
      }
      else if (rawNumber == 9) {
        mapData = 7;
      }
      else if (rawNumber == 0) {
        mapData = 0;
      }
    }
    //字体文件2下的数据加密规则
    else if (ruleTypeNumber == 0) {

      if (rawNumber == 1) {
        mapData = 4;
      }
      else if (rawNumber == 2) {
        mapData = 2;
      }
      else if (rawNumber == 3) {
        mapData = 3;
      }
      else if (rawNumber == 4) {
        mapData = 1;
      }
      else if (rawNumber == 5) {
        mapData = 8;
      }
      else if (rawNumber == 6) {
        mapData = 5;
      }
      else if (rawNumber == 7) {
        mapData = 6;
      }
      else if (rawNumber == 8) {
        mapData = 7;
      }
      else if (rawNumber == 9) {
        mapData = 9;
      }
      else if (rawNumber == 0) {
        mapData = 0;
      }
    }
    //字体文件3下的数据加密规则
    else if (ruleTypeNumber == 2) {

      if (rawNumber == 1) {
        mapData = 6;
      }
      else if (rawNumber == 2) {
        mapData = 2;
      }
      else if (rawNumber == 3) {
        mapData = 1;
      }
      else if (rawNumber == 4) {
        mapData = 3;
      }
      else if (rawNumber == 5) {
        mapData = 4;
      }
      else if (rawNumber == 6) {
        mapData = 8;
      }
      else if (rawNumber == 7) {
        mapData = 3;
      }
      else if (rawNumber == 8) {
        mapData = 7;
      }
      else if (rawNumber == 9) {
        mapData = 9;
      }
      else if (rawNumber == 0) {
        mapData = 0;
      }
    }
    else if (ruleTypeNumber == 3) {

      if (rawNumber == 1) {
        mapData = "&#xefab;";
      }
      else if (rawNumber == 2) {
        mapData = "&#xeba3;";
      }
      else if (rawNumber == 3) {
        mapData = "&#xecfa;";
      }
      else if (rawNumber == 4) {
        mapData = "&#xedfd;";
      }
      else if (rawNumber == 5) {
        mapData = "&#xeffa;";
      }
      else if (rawNumber == 6) {
        mapData = "&#xef3a;";
      }
      else if (rawNumber == 7) {
        mapData = "&#xe6f5;";
      }
      else if (rawNumber == 8) {
        mapData = "&#xecb2;";
      }
      else if (rawNumber == 9) {
        mapData = "&#xe8ae;";
      }
      else if (rawNumber == 0) {
        mapData = "&#xe1f2;";
      }
    }
    else{
      mapData = rawNumber;
    }
  } else if (ruleTypeNumber == 4) {
    var sources = ["年", "万", "业", "人", "信", "元", "千", "司", "州", "资", "造", "钱"];
    //判断字符串为汉字
    if (/^[\u4e00-\u9fa5]*$/.test(rawData)) {

      if (sources.indexOf(rawData) > -1) {
        var currentChineseHexcod = rawData.charCodeAt(0).toString(16);
        var lastCompoent;
        var mapComponetnt;
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var characters = ["a", "b", "c", "d", "e", "f", "g", "h", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        if (currentChineseHexcod.length == 4) {
          lastCompoent = currentChineseHexcod.substr(3, 1);
          var locationInComponents = 0;
          if (/[0-9]/.test(lastCompoent)) {
            locationInComponents = numbers.indexOf(lastCompoent);
            mapComponetnt = numbers[(locationInComponents + 1) % 10];
          }
          else if (/[a-z]/.test(lastCompoent)) {
            locationInComponents = characters.indexOf(lastCompoent);
            mapComponetnt = characters[(locationInComponents + 1) % 26];
          }
          mapData = "&#x" + currentChineseHexcod.substr(0, 3) + mapComponetnt + ";";
        }
      } else {
        mapData = rawData;
      }

    }
    else if (/[0-9]/.test(rawData)) {
      mapData = rawDataMap(rawData, 2);
    }
    else {
      mapData = rawData;
    }

  }
  return mapData;
}

function encode(rawData, ruleType) {
  if (!isNotEmptyStr(rawData)) {
    return "";
  }
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var encodeData = "";
  for (var index = 0; index < rawData.length; index++) {
    var datacomponent = rawData[index];
    if (!isNaN(datacomponent)) {
      if (ruleType < 3) {
        var currentNumber = rawDataMap(String(datacomponent), ruleType);
        encodeData += (currentNumber * month + day) + JoinOparatorSymbol;
      }
      else if (ruleType == 4) {
        encodeData += rawDataMap(String(datacomponent), ruleType);
      }
      else {
        encodeData += rawDataMap(String(datacomponent), ruleType) + JoinOparatorSymbol;
      }
    }
    else if (ruleType == 4) {
      encodeData += rawDataMap(String(datacomponent), ruleType);
    }

  }
  if (encodeData.length >= JoinOparatorSymbol.length) {
    var lastTwoString = encodeData.substring(encodeData.length - JoinOparatorSymbol.length, encodeData.length);
    if (lastTwoString == JoinOparatorSymbol) {
      encodeData = encodeData.substring(0, encodeData.length - JoinOparatorSymbol.length);
    }
  }
  return encodeData;
}

module.exports = encode;