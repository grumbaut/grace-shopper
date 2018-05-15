import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePromoCode, deletePromoCode } from '../store';

class PromoCode extends Component {
  constructor(promoCode) {
    super(promoCode);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      name: promoCode.name ? promoCode.name : '',
      discount: promoCode.discount ? promoCode.discount : 1,
      password: promoCode.password ? promoCode.password : '',
      valid: promoCode.valid ? promoCode.valid : true,
    };
  }

  onSave(ev) {
    ev.preventDefault();
    const promoCode = this.state;
    this.props.savePromoCode(promoCode)
  }
  onChange(ev){
    if(ev.target.value === 'true'){
        ev.target.value = true
    }  
    if(ev.target.value === 'false'){
        ev.target.value = false
    }
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onDelete(){
    this.props.deletePromoCode({ id: this.props.id });
  } 
  render(){
    const { user, promoCode } = this.props;
    const { onDelete } = this;
    if (!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div id='style'>
        <ul>
          <h3 className='header'>Edit Promotion</h3>
          <form onSubmit={this.onSave}>
            <div className='form-group'>
              <input name='name' className='element' onChange={this.onChange} placeholder= {promoCode.name} />
            </div>
            <div className='form-group'>
              <input name='discount' className='element' onChange={this.onChange} placeholder={promoCode.discount} />
            </div>
            <div className='form-group'>
              <input name='password' className='element' onChange={this.onChange} placeholder={promoCode.password} />
            </div>
            <div className='form-group'>
              <select name='valid' className='element' onChange={this.onChange}>
                <option> Promo currently active?</option>
                <option value= { true }> True </option>
                <option value= { false }> False </option>
              </select>
            </div>
            <button type='submit' className="btn btn-primary btn-sm"> Update </button>
          </form>
          <form onSubmit = { onDelete }>
            <button type='submit' className="btn btn-primary btn-sm"> Delete </button>
          </form>  
        </ul>
      </div>
    );
  }
}

const mapState = ({ user, promoCodes }, { id }) => {
    const promoCode = promoCodes.find(promoCode => promoCode.id === id)
    return {
    promoCode,
    user, 
    id
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    savePromoCode: (promoCode) => dispatch(savePromoCode(promoCode, history)),
  };
};

export default connect(mapState, mapDispatch)(PromoCode);