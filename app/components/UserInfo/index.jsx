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
          <div className='user-info__header'>Information</div>
          <div className='user-info__back'>
            <img className='user-info__avatar' src={user.get('avatar')} />
            <div className='user-info__name'>
              {user.get('name')}
            </div>
            <div className='user-info__fullname'>
              Full name: {user.get('fullName')}
            </div>
            <div className='user-info__email'>
              <span>Email: {user.get('email')}</span>
            </div>
            <div className='user-info__country'>
              Country: {user.get('country')}
            </div>
            <div className='user-info__city'>
              City: {user.get('city')}
            </div>
            <div className='user-info__age'>
              Age: {user.get('age')}
            </div>
            <div className='user-info__info'>{user.get('info')}</div>
          </div>
        </PopUp>
        <Link to='/'>_
          <div className='user-info__overlay'/>
        </Link>
      </div>
    );
  }
}

