/**
*  dataset: [accommodation,attractions,bars_clubs,event,food_beverages,shops,tour,venue,walking_trail,precincts,cruises]
*  sortBy: name | tags | rating | isexpired | lastupdateddate
*  sortOrder: [ ASC | DESC ]
*  language: en | zh-cn | zh-tw | ja | ko
**/

function search_all(dataset, sortBy, sortOrder, language) {
  let url = 'https://tih-api.stb.gov.sg/content/v1/search/all?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1';
  if(dataset){
    url += '&dataset=' + dataset;
  }
  if(sortBy){
    url += '&sortBy=' + sortBy;
  }
  if(sortOrder){
    url += '&sortOrder=' + sortOrder;
  }
  if(language){
    url += '&language=' + language;
  }else{
    url += '&language=zh-cn';
  }
  return new Promise(function (resolve) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export default function searchAll(dataset, sortBy, sortOrder, language) {
  return search_all(dataset, sortBy, sortOrder, language);
}

// Example:
//
// import searchAll from '../../utils/tih_api/searchAll.js';
// searchAll('event',,,'en').then(res => {
//   console.log("searchAll:", res);
// })