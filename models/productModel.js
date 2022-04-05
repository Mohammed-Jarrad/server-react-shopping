const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
// const User = require('./userModel');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true
  }

});

const Product = model("Product", productSchema);

module.exports = Product;
