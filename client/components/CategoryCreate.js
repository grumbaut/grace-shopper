import React from 'react';
import { connect } from 'react-redux';
import { saveCategory } from '../store/categories';

class CategoryCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      error: null
    };
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validator = (value) => {
      if(!value) {
        return 'Enter a category name.';
      }
    };
  }
  onChangeInfo(ev) {
    this.setState({ name: ev.target.value });
  }
  onSave(ev) {
    ev.preventDefault();
    const error = this.validator(this.state.name);
    this.setState({ error });
    if (error) {
      return;
    }
    const category = { name: this.state.name };
    this.props.saveCategory(category);
  }
  render() {
    const { name, error } = this.state;
    const { onChangeInfo, onSave } = this;
    const { user } = this.props;
    if(!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <h2>Add A New Category</h2>
        <form onSubmit={ onSave }>
          <p>Name:<br />
            <input value={ name } onChange={ onChangeInfo } />
          </p>
          <div className='error' >{ error }</div>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
});

const mapDispatch = (dispatch, { history }) => {
  return {
    saveCategory: (category) => dispatch(saveCategory(category, history))
  };
};

export default connect(mapState, mapDispatch)(CategoryCreate);
