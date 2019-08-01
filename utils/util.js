
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

  getNowTimeInDateObject: ()=>{
    return moment().toDate();
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

  /**
 * Sort object properties (only own properties will be sorted).
 * @param {object} obj object to sort properties
 * @param {bool} isNumericSort true - sort object properties as numeric value, false - sort as string value.
 * @returns {Array} array of items in [[key,value],[key,value],...] format.
 * @see https://gist.github.com/umidjons/9614157
 */
  sortProperties: (obj, isReversed = true, isNumericSort = true) => {
    isNumericSort = isNumericSort || false; // by default text sort
    var sortable = [];
    for (var key in obj)
      if (obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]);
    if (isNumericSort) {
      if (isReversed) {
        sortable.sort(function (a, b) {
          return b[1] - a[1];
        });
      } else {
        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
      }
    }
    else
      sortable.sort(function (a, b) {
        var x = a[1].toLowerCase(),
          y = b[1].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  },

  getAddressByChooseAddressCallBack:(res)=>{
      //res.countyName,res.provinceName,res.cityName,res.postalCode
      function renderCommaSection(sectionStr){
         return sectionStr ? `${sectionStr},` : "";
      } 
      return  `${renderCommaSection(res.countyName)}` +
              `${renderCommaSection(res.provinceName)}` +
              `${renderCommaSection(res.cityName)}` +
              `${renderCommaSection(res.postalCode)}`;
  },

  humanNameRegexValidation:(humanName)=>{
     return typeof humanName !== "undefined" &&
            humanName !== "";
  },

  /**
   * @see https://blog.csdn.net/qq_33382313/article/details/75007637
   */
  phoneNumberValidation:(phoneNumber, isChina = false)=>{
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (isChina){
      let number = Number(phoneNumber);
      return myreg.test(number);
    }
    return typeof phoneNumber !== "undefined" &&
    phoneNumber !== "";
  },

  addressValidation:(address)=>{
    return typeof address !== "undefined" &&
      address !== "";
  },

  /**
   * @see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
   */
  randomIntFromInterval:(min, max) =>{ // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  constants: {
     TODAY: "today",
     TOMORROW: "tomorrow",
     THIS_WEEK: "this_week",
     NEXT_WEEK: "next_week"
  }
   
}


