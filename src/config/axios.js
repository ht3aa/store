import axios from 'axios'

export const SERVER_URL = 'http://localhost:3000'

export const productReq = axios.create({
  baseURL: `${SERVER_URL}/product`
})

export const userReq = axios.create({
  baseURL: `${SERVER_URL}/users`
})

export const categoryReq = axios.create({
  baseURL: `${SERVER_URL}/category`
})

export const cartReq = axios.create({
  baseURL: `${SERVER_URL}/cart`
})

export const orderReq = axios.create({
  baseURL: `${SERVER_URL}/order`
})
