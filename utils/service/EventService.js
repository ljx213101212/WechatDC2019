const Event = require('../models/Event');

module.exports = {
  getAll: async function () {
    return await Event.getAll();
  },

  getDetail: async function (id) {
    return await Event.findOne({ eventId: id });
  }
};