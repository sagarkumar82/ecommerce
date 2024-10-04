const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brand_name: {
    type: String,
    require: true,
  },
  image: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Brand =  mongoose.model('brand' , brandSchema )
module.exports =Brand
