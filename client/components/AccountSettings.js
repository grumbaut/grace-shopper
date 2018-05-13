import React from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../store';

class AccountSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        email: nextProps.user.email,
        password: nextProps.user.password
      });
    }
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSave(ev){
    ev.preventDefault();
    const userInfo =  {
      id: this.props.user.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      passwordPrompt: false
    };
    this.props.passwordReset(userInfo);
  }

  render() {
    const { onChange, onSave } = this;
    const { user, password } = this.props;
    return (
      <div>
        <h1>Change Account Settings</h1>
        {user.name}
        <form onSubmit={ onSave }>
            Password: <input value={ password } name="password" onChange ={ onChange }/>
          <button type="submit" className="btn btn-primary btn-sm"> Change password </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  const user = state.user;
  const products = state.products.filter(product => product.displayItem === true);
  const firstProduct = products.shift();
  return { products, firstProduct, user };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    passwordReset: (userInfo) => dispatch(passwordReset(userInfo, history))
  };
};

export default connect(mapState, mapDispatch)(AccountSettings);
