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
  }
};