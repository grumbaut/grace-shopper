const router = require ('express').Router()
const db = require('../db')
const { Product, Category, User, Order, LineItem } = db.models

