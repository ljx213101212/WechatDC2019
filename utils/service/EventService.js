//const Event = require('../models/Event');
const DummyRecentEvent = require('../dummy_data/dummyRecentEvent');

module.exports = {
  // getAll: async function () {
  //   return await Event.getAll();
  // },

  // getDetail: async function (id) {
  //   return await Event.findOne({ eventId: id });
  // },

  getRecentDetail: function(){
     return DummyRecentEvent;
  },

  // getRecentDetailCloud:function(){
  //   db.collection('Event').get().then(res => {
  //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
  //     console.log(res.data)
  //   })
  // }
};