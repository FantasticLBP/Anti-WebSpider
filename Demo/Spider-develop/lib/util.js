
var JoinOparatorSymbol = "3.1415926";

function isNotEmptyStr($str) {
  if (String($str) == "" || $str == undefined || $str == null || $str == "null") {
    return false;
  }
  return true;
}

function getRawData($json,analisys) {
  $json = $json.toString();
  if (!isNotEmptyStr($json)) {
    return;
  }
  
  var letterDatasource = ['a', 'b', 'c', 'd', 'e', 'f'];
  var numberDatasource = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  var date= new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var datacomponents = $json.split(JoinOparatorSymbol);
  var orginalMessage = "";
  for(var index = 0;index < datacomponents.length;index++){
    var datacomponent = datacomponents[index];
      if (!isNaN(datacomponent) && analisys < 3){
          var currentNumber = parseInt(datacomponent);
          orginalMessage += (currentNumber -  day)/month;
      } else if(analisys == 3){
         orginalMessage += datacomponent;
      } else if (analisys == 4) {
        if ($json.includes("ff")) {
          orginalMessage += $json;
          // $json.split("ff").filter((idx, value) => idx !== '' ).join("");
        } else if ($json.includes(";")){
            $json.split(';').filter((idx, value) => idx !== '').map((value, idx) => {
              // unicode 情况下的最后一个字符，拿出来需要做字符串处理
              let lastSymbol = value.substr(value.length - 1, 1);

              // 字母的情况
              if (letterDatasource.join("").includes(lastSymbol)) {
                let symbolLocation = letterDatasource.indexOf(lastSymbol)
                let convertedSymbol = symbolLocation == 0  ? lastSymbol : letterDatasource[symbolLocation-1];
                orginalMessage += `${value.substr(0, 6)}${convertedSymbol};`
              } else {
                // 数字的情况
                let symbolLocation = numberDatasource.indexOf(parseInt(lastSymbol))
                let convertedSymbol = symbolLocation == 0  ? lastSymbol : numberDatasource[symbolLocation-1];
                orginalMessage += `${value.substr(0, 6)}${convertedSymbol};`
              }
            })
        }
      }
  }
  return orginalMessage;
}
