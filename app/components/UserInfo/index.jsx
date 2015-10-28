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
            <dl hidden={!user.get('email')}>
              <dt className='user-info__field-name'>Email:</dt>
              <dd className='user-info__field-value'>{user.get('email')}</dd>
            </dl>
            <br/>
            <dl hidden={!user.get('fullName')}>
              <dt className='user-info__field-name user-info__field-name_left'>Full name:</dt>
              <dd className='user-info__field-value user-info__field-value_left'>{user.get('fullName')}</dd>
            </dl>
            <dl hidden={!user.get('country')}>
              <dt className='user-info__field-name user-info__field-name_left'>Country:</dt>
              <dd className='user-info__field-value user-info__field-value_left'>{user.get('country')}</dd>
            </dl>
            <dl hidden={!user.get('city')}>
              <dt className='user-info__field-name user-info__field-name_left'>City:</dt>
              <dd className='user-info__field-value user-info__field-value_left'>{user.get('city')}</dd>
            </dl>
            <dl hidden={!user.get('age')}>
              <dt className='user-info__field-name user-info__field-name_left'>Age:</dt>
              <dd className='user-info__field-value user-info__field-value_left'>{user.get('age')}</dd>
            </dl>
            <dl hidden={!user.get('info')}>
              <dt className='user-info__field-name user-info__field-name_left'>Bio:</dt>
              <dd className='user-info__field-value user-info__field-value_left'>{user.get('info')}</dd>
            </dl>
          </div>
        </PopUp>
        <Link to='/'>_
          <div className='user-info__overlay'/>
        </Link>
      </div>
    );
  }
}

