
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

  isTodayTimeStr: timeStr =>{
    return moment(timeStr).isSame(moment(),'day');
  },

  isTodayInbetweenTimeStrs: (startTimeStr,endTimeStr) =>{
    return moment().isBetween(moment(startTimeStr),moment(endTimeStr),'seconds','[]');
  },

  isTomorrowTimeStr: timeStr =>{
    return moment(timeStr).isSame(moment().add(1,'day'),'day');
  },

  isTomorrowInBetweenTimeStrs:(startTimeStr, endTimeStr) =>{
    return moment().add(1,'day').isBetween(moment(startTimeStr),moment(endTimeStr),'seconds','[]');
  },

  isThisweekTimeStr: timeStr =>{
    //we regard as SUNDAY 23:59:59 is the end of week moment.
    const endOfweek = moment().endOf('week').add(1,'day');
    return moment(timeStr).isBetween(moment(),endOfweek,'seconds','[]');
  },

  isThisWeekInBetweenTimeStrs:(startTimeStr, endTimeStr) =>{
     //check overlap
     const today = moment();
     const endOfweek = moment().endOf('week').add(1,'day');
     //when startTimeStr ealier than today
     if (moment(startTimeStr).isBefore(today)
     && (moment(endTimeStr).isSame(today) || moment(endTimeStr).isAfter(today))){
      return true;
     }else if (moment(startTimeStr).isBetween(today,endOfweek,'seconds','[]')){
       //when startTime Str in between today and end of this week.
       return true;
     }
     return false;
  },

  isNextWeekTimeStr:timeStr=>{
    const endOfweek = moment().endOf('week').add(1,'day');
    return moment(timeStr).isAfter(endOfweek);
  }, 

  isNextWeekInBetweenTimeStrs: (startTimeStr, endTimeStr) =>{
    const endOfweek = moment().endOf('week').add(1,'day');
     //when endTimeStr later than endOfweek
     if (moment(endTimeStr).isAfter(endOfweek)){
       return true;
     }
     return false;
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
  },
   
  constants: {
     TODAY: "today",
     TOMORROW: "tomorrow",
     THIS_WEEK: "this_week",
     NEXT_WEEK: "next_week",
  }
   
}


