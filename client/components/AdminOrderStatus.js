import React from 'react';
import { connect } from 'react-redux';

class AdminOrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      user: null,
      changed: false
    };
  }

  handleChange(event){
    this.setState({ search: event.target.value});
  }

  search(event) {
    event.preventDefault();
    const user = this.props.users.find(user => user.email === this.state.search);
    if(user) {
      this.setState({ user });
    }
    this.setState({ changed: true });
  }

  render(){
    const { user, changed } = this.state;

    return (
      <div>
        <h2 className='header'>Change Order Status</h2>
        <form>
          <input value={ this.state.search } placeholder='Search by user email...' />
          <button className='btn btn-primary btn-sm'>Search</button>
        </form>
        <div>
          { !user && changed ?
            <h2>No users found.</h2>
            :
            null
          }
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  users: state.users
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminOrderStatus);
