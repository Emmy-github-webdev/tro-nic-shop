import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { 
    productListReducer,
    productDetailReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedeReducer,
} from './reducers/productReducers';
import {userLoginReducer, 
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
}
from './reducers/userReducer';

import {
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers';

import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedeReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

const cartItemsFormStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfor')) : null

const shippingAddressFormStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {cartItems: cartItemsFormStorage, 
    shippingAddress: shippingAddressFormStorage,
    },
    
    userLogin: {userInfo: userInfoFormStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools (applyMiddleware(...middleware)))



export default store