import React from 'react'
import { connect } from 'react-redux'

//need to define loggedIn here or elsewhere (nav)

class Login extends React.Component {
    constructor(){
      super()

      this.onChange = this.onChange.bind(this)
      this.attemptLogin = this.attemptLogin.bind(this)

      this.state = {
       email: '',
       password: ''
      }
    }
    attemptLogin(ev){
      ev.preventDefault()
      this.props.attemptLogin(this.state)
    }
    onChange(ev){
      const change = {}
      change[ev.target.name] = ev.target.value;
      this.setState(change)
    }
    render(){
      const { email, password } = this.state
      const { onChange, attemptLogin } = this
      return (
        <div>
        <ul>
        <h3> Login </h3>
            <form>
                Email: <input value = { email } onChange = { onChange } name = 'email'></input> 
                Password: <input value = { password } onChange = { onChange } name = 'password'></input> 
              <button onClick= { attemptLogin } className="btn btn-primary btn-sm"> Login </button>
            </form>
        </ul>
        </div>
      )
    }
}

const mapDispatch = (dispatch)=> {
  return {
    attemptLogin: (credentials) => {
      dispatch(attemptLogin(credentials))
    }
  }
}

export default connect(null, mapDispatch)(Login);