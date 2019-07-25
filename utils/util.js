
const moment = require('moment.min.js');

moment.locale('en', {
  longDateFormat : {
    l: "YYYY-MM-DD",
    L: "YYYY-MM-DD HH:mm"
  }
});

module.exports = {

    formatTime : date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },

  formatNumber : n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  isYorN : str => {
    return str === "Y" ? true : false;
  },

  /**
   * @see https://blog.csdn.net/qfire/article/details/84492696
   */
  getSpecificTimeStr: timeStr =>{
    return moment(timeStr).format('L');
  },

  getAddressStr: addressObj =>{
    let addressStr = ""; 
    function renderUnitNumber (unitNumber){
      return unitNumber !== "" ? `- ${unitNumber}` : "";
    }
    function renderCommaSection (sectionStr, isComa = true){
      let str = "";
      if (isComa){
        str = sectionStr !== "" ? `${sectionStr}, ` : "";
      }else{
        str = sectionStr !== "" ? `${sectionStr}` : "";
      }
      return str;
    }
    if (typeof addressObj !== "undefined"){
      addressStr = `${renderCommaSection(`${addressObj.floorNumber}${renderUnitNumber(addressObj.unitNumber)}`)}`+ 
                   `${renderCommaSection(`${addressObj.buildingName}`)}` + 
                   `${renderCommaSection(`${addressObj.block}`)}`+
                   `${renderCommaSection(`${addressObj.streetName}`)}`+
                   `${renderCommaSection(`${addressObj.postalCode}`,false)}`;
    } 
    return addressStr;
  },

  /**
 * @see https://stackoverflow.com/questions/1499889/remove-html-tags-in-javascript-with-regex
 */
  escapeHelper: (body) =>{
    var regex = /(<([^>]+)>)|(\\n)|(&nbsp;)/g
    return body.replace(regex,"");
  }
   
   
}


