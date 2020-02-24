
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
      }
      else if(analisys == 3){
         orginalMessage += datacomponent;
      }
      else{
        //其他情况待续，本 Demo 根据本人在研究反爬方面的技术并实践后持续更新
      }
  }
  return orginalMessage;
}
