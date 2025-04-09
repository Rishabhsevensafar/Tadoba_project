// models/BookingConfig.js
const mongoose = require('mongoose');

const bookingConfigSchema = new mongoose.Schema({
  cutOffTime: {
    type: String,
    required: true,
    default: "17:00",
    validate: {
      validator: function(v) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format (HH:MM)`
    }
  },
  blockedDates: [{
    type: Date,
    required: true,
    default: []
  }]
}, {
  timestamps: true
});

// Ensure there's only one configuration document
bookingConfigSchema.statics.getConfig = function() {
  return this.findOne().then(config => {
    if (!config) {
      return this.create({});
    }
    return config;
  });
};

module.exports = mongoose.model('BookingConfig', bookingConfigSchema);