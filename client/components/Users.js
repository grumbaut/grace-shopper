import React from 'react';
import { connect } from 'react-redux';

class Users extends React.Component {
    constructor(){
        super()
        
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
        const product = { productId: this.props.id, name: this.state.name, description: this.state.description, price: this.state.price, imageURL: this.state.imageURL, categoryId: this.state.categoryId }
        updateProduct(product)
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
            {
                users.map(user => <option> { user.firstName } </option>)
            }

            <ul>
            <form onSubmit= { onSave }>
                <li> First Name <input name =  'firstName' onChange = { this.onChange } ></input> </li>
                <li> Last Name <input onChange = { this.onChange } name = 'lastName'></input> </li>
                <li> Email <input onChange = { this.onChange } name = 'email'></input> </li>
                <li> Password <input onChange = { this.onChange } name = 'password'></input> </li>
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