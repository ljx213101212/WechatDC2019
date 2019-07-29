
import nearBySearch from '../../utils/googleapis/nearBySearch.js';
import getPlaceDetailByCoordinate from '../../utils/googleapis/getPlaceDetailByCoordinate.js';
import getPlaceDetailByPlaceId from '../../utils/googleapis/getPlaceDetailByPlaceId.js';
import getPhotoURLByReference from '../../utils/googleapis/getPhotoByReference.js';


Page({

  /**
   * Page initial data
   * @example
   * (pageData schema)
   * event.activeId
   * event.activeTitle
   * event.price 
   * event.pricingStatus
   * event.startTime
   * event.endTime
   * event.address
   * event.addressStr
   * event.location
   * event.eventInfoStr
   * event.activeImg 
   */
  data: {
    currentLocation: 'Loading...',
    nearByRestaurant: [],
    detailID: null,
    detailInfo: {},
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    //先显示页面加载
    // wx.showLoading({
    //   title: '加载中 Loading',
    // });
    let that = this;

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let {latitude, longitude} = res;
        let loc = { latitude, longitude };

        getPlaceDetailByCoordinate(latitude, longitude).then((res) => {
          // console.log('detial: ', res.results[0].formatted_address);
          let arrLength = '';
          try{
            arrLength = res.results[0].formatted_address.split(',');
          } catch(err){
            console.log(err);
          }
          that.setData({
            currentLocation: arrLength.slice(0, 3).join(','),
          })
        }).catch(err => {
          console.log(err);
        })

        nearBySearch(latitude, longitude).then((res) => {
          // console.log('res: ', res);
          res.results.sort((a, b) => { 
            console.log('a,b:', a,b);
            return Number(b.rating) - Number(a.rating)
          });
          console.log(res.results);
          that.setData({
            nearByRestaurant: res.results
          })
        }).catch(err => {
          console.log(err);
        })
        // //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        // qqmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (addressRes) {
        //     var address = addressRes.result.formatted_addresses.recommend;
        //     that.setData({
        //       console.log(address)
        //     })
        //   }
        // })
      }
    })
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {


  },

  /**
   * Lifecycle function--Called when page showe
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  seeDetail: function(e){

    this.setIDAndInfoNull();

    getPlaceDetailByPlaceId(e.currentTarget.id).then((res) => {
      // console.log(e.currentTarget.id, res.result);
      res.result.photos && res.result.photos.forEach((pho) => {
        pho.photo_reference = getPhotoURLByReference(pho.photo_reference);
      })
      console.log('res', res.result);
      this.setData({
        detailInfo: res.result,
        detailID: e.currentTarget.id,
      })
    });
  },

  setIDAndInfoNull: function(){
    this.setData({
      detailID: null,
      detailInfo: {},
    })
  }

})