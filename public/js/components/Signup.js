
'use strict';

var React = require('react/addons');
var Select = require('react-select');
var Router = require('react-router');
var Link = Router.Link;

var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');

var COUNTRIES = require('../constants/countries');

var Signup = React.createClass({

  displayName: 'Signup',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      username: null,
      email: '',
      password: '',
      country: ''
    };
  },

  handleSignup: function(event) {
    event.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    var passwordConfirm = React.findDOMNode(this.refs.passwordConfirm).value.trim();
    var country = React.findDOMNode(this.refs.country).value.trim();

    if(password !== passwordConfirm){

      alert("The passwords you entered do not match.  Please fix.")
    } else {

      AuthActions.signup(email, password, country);
    }

  },

  _onChange : function(){
    this.setState ({
      user: AuthStore.getUser()
    });
    if(this.state.user.isAuth){
      this.transitionTo('/home');
    }
  },


  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var countryOptions = COUNTRIES.map(function(country) {
      return (<option value={country.value}> {country.label} </option>)
    });
    
    return (
      <div className="grid-block login">
        <div className="grid-content">
          <div className="grid-container">
            <form onSubmit={this.handleSignup} className= "formContainer">
              <a className="instagramLogin" href= '/auth/instagram'> <i className="fa fa-instagram fa-3x"></i><span>Log in with Instagram!</span> </a>
              <input type="email" placeholder="Enter your email" ref="email" />
              <select type="select" placeholder="Select your country" ref="country" >
                <div id='countries-container'>
                  {countryOptions}
                </div>
              </select>
              <input type="password" placeholder="Enter your password" ref="password" />
              <input type="password" placeholder="Re-enter your password" ref="passwordConfirm" />
              <input type="submit" className="loginButton button" value="Let's Get Coding!" />
                <Link to="login" className="signUpLink">Already have an account? Log in!</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Signup;
