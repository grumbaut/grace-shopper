import React from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from '../store'

class Users extends React.Component {
    constructor(user){
        super(user)
        
        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
        
        this.state = {
            firstName: '',
            lastName: '', 
            email: '',
            password: '',
            isAdmin: false
        }
    }
    onSave(ev){
        ev.preventDefault()
        const user = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password }
        saveUser(user)
      }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    render(){
        const { users } = this.props
        const { onSave, onChange } = this
        return (
            <div>
            <select value={ this.state.filter } onChange={ onChange }>
            <option value={ 0 }>Current Users</option>
            { users.map(user => (
              <option key={ user.id } value={ user.id }>
                { user.firstName }
              </option>
            ))}
          </select>

            <ul>
            <form onSubmit= { onSave }>
                <li> First Name <input name =  'firstName' onChange = { onChange } ></input> </li>
                <li> Last Name <input onChange = { onChange } name = 'lastName'></input> </li>
                <li> Email <input onChange = { onChange } name = 'email'></input> </li>
                <li> Password <input onChange = { onChange } name = 'password'></input> </li>
                <li> Admin <select onChange = { onChange } name = 'isAdmin'><option> Yes </option><option> No </option></select> </li>
                <button type='submit'> Update </button>
            </form>
            </ul>   
            </div>
        )
    }
}

const mapState = ({ users })=> {
    console.log(users, 'where are the users')
    return {
        users
    }
}

export default connect(mapState)(Users);