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
                <li> First Name <input name =  'firstName' onChange = { this.onChange } ></input> </li>
                <li> Last Name <input onChange = { this.onChange } name = 'lastName'></input> </li>
                <li> Email <input onChange = { this.onChange } name = 'email'></input> </li>
                <li> Password <input onChange = { this.onChange } name = 'password'></input> </li>
                <button type='submit'> Create </button>
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