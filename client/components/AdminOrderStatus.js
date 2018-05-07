import React from 'react';
import { connect } from 'react-redux';

class AdminOrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  render(){
    return (
      <div>
        <h2 className='header'>Change Order Status</h2>
        <form>
          <input value={ this.state.search } placeholder='Search by user email...' />
          <button className='btn btn-primary btn-sm'>Search</button>
        </form>
      </div>
    );
  }
}

const mapState = ({

})
