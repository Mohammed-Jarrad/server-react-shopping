const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
// const User = require('./userModel');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({

  title: {
    type: String,
    required: [true, "Set Product Title"]
  },
  imageUrl: {
    type: String,
    required: [true, "Set Product Image"],
    unique: true
  },
  desc: {
    type: String,
    required: [true, "Set Product Description"]
  },
  price: {
    type: Number,
    required: [true, "Set Product Price"]
  },
  sizes: {
    type: [String],
  },
  category: {
    type: String,
    required: [true, "Set Product Category"]
  }

});

const Product = model("Product", productSchema);

module.exports = Product;
