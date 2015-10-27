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
            <dl hidden={!user.get('name')}>
              <dt className='user-info__field-name'>Nickname:</dt>
              <dd className='user-info__field-value'>{user.get('name')}</dd>
            </dl>
            <dl hidden={!user.get('fullName')}>
              <dt className='user-info__field-name'>Full name:</dt>
              <dd className='user-info__field-value'>{user.get('fullName')}</dd>
            </dl>
            <dl hidden={!user.get('email')}>
              <dt className='user-info__field-name'>Email:</dt>
              <dd className='user-info__field-value'>{user.get('email')}</dd>
            </dl>
            <dl hidden={!user.get('country')}>
              <dt className='user-info__field-name'>Country:</dt>
              <dd className='user-info__field-value'>{user.get('country')}</dd>
            </dl>
            <dl hidden={!user.get('city')}>
              <dt className='user-info__field-name'>City:</dt>
              <dd className='user-info__field-value'>{user.get('city')}</dd>
            </dl>
            <dl hidden={!user.get('age')}>
              <dt className='user-info__field-name'>Age:</dt>
              <dd className='user-info__field-value'>{user.get('age')}</dd>
            </dl>
            <div className='user-info__info' hidden={!user.get('info')}>
              <div className='user-info__info-title'>Bio</div>
              <div className='user-info__info-content'>{user.get('info')}</div>
            </div>
          </div>
        </PopUp>
        <Link to='/'>_
          <div className='user-info__overlay'/>
        </Link>
      </div>
    );
  }
}

