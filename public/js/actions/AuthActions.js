/* 
* @Author: nimi
* @Date:   2015-05-21 16:17:55
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-02 19:22:11
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var authActions = {

  login: function(email, password){
    var user = { email: email, password: password};
    $.ajax({
      url: '/api/users/login',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data){
        AppDispatcher.dispatch({
          actionType: AppConstants.LOGIN_USER,
          data: data
        })
      },
      error: function(xhr, status, error){
        throw(error);
      }.bind(this) //NOTE: we may need a .bind(this) here-ish
    })
  },

  signup: function(email, password, country){
    var user = { email: email, password: password, country: country};
    $.ajax({
      url: '/api/users/signup',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data){
        AppDispatcher.dispatch({
          actionType: AppConstants.SIGNUP_USER,
          data: data
        })
      },
      error: function(xhr, status, error){
        console.error(xhr, status, error)
      }.bind(this) 
    })
  },

  logout: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.LOGOUT_USER
    })
  },

  instagramSetCurrentUser: function(data){
    $.ajax({
      url: '/api/users/user',
      dataType: 'json',
      type: 'GET',
      data: data,
      success: function(user){
        AppDispatcher.dispatch({
          actionType: AppConstants.INSTAGRAM_SET_CURRENT_USER,
          data: user
        })
      },
      error: function(xhr, status, error){
        throw(error);
      }.bind(this) //NOTE: we may need a .bind(this) here-ish

    })
  }
};

module.exports = authActions;
