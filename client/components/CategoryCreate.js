import React from 'react';
import { connect } from 'react-redux';
import { saveCategory } from '../store/categories';

class CategoryCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSave(ev) {
    ev.preventDefalut();
    const category = { name: this.state.name };
    this.props.saveCategory(category);
  }
  render() {
    const { name } = this.state;
    const { onChangeInfo, onSave } = this;
    return (
      <div>
        <h2>Add A New Category</h2>
        <form onSubmit={ onSave }>
          <p>Name:<br />
          <input value={ name } name="name" onChange={ onChangeInfo } />
          </p>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    saveCategory: (category) => dispatch(saveCategory(category, history))
  };
};

export default connect(null, mapDispatch)(CategoryCreate);
