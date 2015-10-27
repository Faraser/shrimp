import React, {PropTypes} from 'react';
import {List} from 'immutable';
import './styles.scss';
import PopUp from 'components/PopUp';
import {Link} from 'react-router';
import {connect} from 'react-redux';

@connect(state => ({
  users: state.users,
}))
export default class UserInfo extends React.Component {

  static propTypes = {
    users: PropTypes.instanceOf(List).isRequired,
    params: PropTypes.object.isRequired,
  };


  render() {
    const {users, params} = this.props;
    const user = users.find(item => item.get('id') === params.userId);
    return (
      <div className='user-info'>
        <PopUp className='user-info__window'>
          <div className='user-info__back'>
            <img className='user-info__avatar' src={user.get('avatar')} />
            <div>{user.get('name')}</div>
            <div>{user.get('fullName')}</div>
            <div>{user.get('email')}</div>
            <div>{user.get('country')}</div>
            <div>{user.get('city')}</div>
            <div>{user.get('age')}</div>
            <div>{user.get('info')}</div>
          </div>
        </PopUp>
        <Link to='/'>
          <div className='user-info__overlay'/>
        </Link>
      </div>
    );
  }
}

