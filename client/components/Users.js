import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers, gotAddresses } from '../store';
import Datamap from 'datamaps';
import data from './mapData';


class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getUsers, user } = this.props;

    if (user.isAdmin) {
      getUsers();

      this.map = new Datamap({
        scope: 'usa',
        element: document.getElementById('container'),
        responsive: true,
        geographyConfig: {
          highlightBorderColor: '#5F9EA0',
          highlightFillColor: '#66ff66',
          popupTemplate: function (geography, data) {
            return `<div class="hoverinfo">${geography.properties.name}: ${data.members} users`;
          },
          highlightBorderWidth: 3
        },

        fills: {
          'noMembers': '#ccffff',
          'oneMember': '#66ffff',
          'overFive': '#00ccff',
          'overTen': '#0066ff',
          'overTwenty': '#0000ff',
          defaultFill: '#ffffff'
        },
        data: data
      });
      this.map.labels();
      window.addEventListener('resize', ()=> {
        this.map.resize();
    });
    }
  }



  render() {
    const { users, user } = this.props;
    console.log(users);
    if (!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <h3> Users </h3>
        <div>
          <ul>
            {
              users.map(user => <li key={user.id}><Link to={`/users/${user.id}`}>{user.firstName} {user.lastName}</Link></li>)
            }
          </ul>
          <div id="container" style={{ position: 'relative', width: '700px', height: '500px' }} />
        </div>
      </div>
    );
  }
}

const mapState = ({ users, user }) => {
  return {
    users,
    user
  };
};

const mapDispatch = dispatch => ({
  getUsers: ()=>{
    dispatch(getUsers());
  },
  gotAddresses: ()=>{
    dispatch(gotAddresses());
  }
});

export default connect(mapState, mapDispatch)(Users);
