import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PopUp from 'components/PopUp';
import Immutable, {Map, List} from 'immutable';
import cx from 'classnames';
import store from 'store';
import {Link} from 'react-router';
import {changeUserInfo} from 'actions/local';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import InfoMessage from 'components/InfoMessage';
import Input from 'components/Input';
import Button from 'components/Button';
import {M} from '../../../constants';
import './styles.scss';


@connect(state => ({
  location: state.router.location.pathname,
  local: state.local,
  users: state.users,
}))

export default class Settings extends React.Component {

  static propTypes = {
    location: PropTypes.string.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Edit your data',
      },
      shakeInfo: false,
      email: '',
      name: '',
      fullName: '',
      password: '',
      city: '',
      country: '',
      age: 0,
      about: '',
      repeatedPassword: '',
      showPasswordError: false,
      showSecondPasswordError: false,
      showEmailError: false,
      showNameError: false,
      inProgress: false,
    };
  }


  componentWillMount = () => {
    if (this.props.users.size) {
      const currentUser = this.props.users.find(user => user.get('id') === this.props.local.get('userId'));

      this.setState({
        email: currentUser.get('email'),
        name: currentUser.get('name'),
        fullName: currentUser.get('fullName'),
        city: currentUser.get('city'),
        country: currentUser.get('country'),
        age: currentUser.get('age'),
        about: currentUser.get('info'),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.users, this.props.users)) {
      const currentUser = nextProps.users.find(user => user.get('id') === nextProps.local.get('userId'));
      this.setState({
        email: currentUser.get('email'),
        name: currentUser.get('name'),
        fullName: currentUser.get('fullName'),
        city: currentUser.get('city'),
        country: currentUser.get('country'),
        age: currentUser.get('age'),
        about: currentUser.get('info'),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.users.size > 0 && !Immutable.is(nextProps.users, this.props.users)) {
      nextProps.history.pushState(null, '/');
    }

    return true;
  }

  checkEmailExists(email) {
    const userWithSuchEmail = this.props.users.find(item => item.get('email') === email);
    return (!userWithSuchEmail || (userWithSuchEmail.get('id') === this.props.local.get('userId'))) ? false : true;
  }

  changeInfo = (e) => {
    e.preventDefault();

    if (!this.state.email) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: 'Email is required',
        },
      });
    }

    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: 'Valid email is required',
        },
      });
    }

    if (this.checkEmailExists(this.state.email)) {
      return this.setState({
        showEmailError: true,
        info: {
          type: 'error',
          text: 'Email already exsisted',
        },
      });
    }

    if (!this.state.name) {
      return this.setState({
        showNameError: true,
        info: {
          type: 'error',
          text: 'Name is required',
        },
      });
    }

    const changedData = {
      email: this.state.email,
      name: this.state.name,
      fullName: this.state.fullName ? this.state.fullName.trim() : null,
      city: this.state.city ? this.state.city.trim() : null,
      country: this.state.country ? this.state.country.trim() : null,
      age: this.state.age,
      info: this.state.about ? this.state.about.trim() : null,
    };


    this.setState({
      inProgress: true,
    });
    store.dispatch(changeUserInfo(changedData));
  }

  emailChange = e => {
    this.setState({
      email: e.target.value,
      showEmailError: false,
    });
  }


  nameChange = e => {
    this.setState({
      name: e.target.value,
      showNameError: false,
    });
  }


  handleChange = e => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div className='settings'>
        <PopUp className='settings__window'>
          <Tabs
            className='settings__tabs'
            currentTabId={1}
          >
            <Tab id={1}>Settings</Tab>
          </Tabs>
          <form
            className='settings__form'
            onSubmit={this.changeInfo}
          >
            <InfoMessage
              className='settings__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <Input
              className={cx('settings__input', {
                'input_type_error': this.state.showEmailError,
              })}
              value={this.state.email}
              name='email'
              placeholder='Email'
              onChange={this.emailChange}
              maxLength={M.SETTINGS_EMAIL_MAX_LENGTH}
            />
            <Input
              className={cx('settings__input', {
                'input_type_error': this.state.showNameError,
              })}
              value={this.state.name}
              name='name'
              placeholder='Name'
              onChange={this.nameChange}
              maxLength={M.SETTINGS_NAME_MAX_LENGTH}
            />
            <Input
              className={cx('settings__input', 'settings__input_fullname')}
              value={this.state.fullName}
              name='fullName'
              placeholder='Full Name'
              onChange={this.handleChange}
              maxLength={M.SETTINGS_FULLNAME_MAX_LENGTH}
              />
            <Input
              className={cx('settings__input', 'settings__input_age')}
              value={this.state.age}
              type='number'
              name='age'
              placeholder='Age'
              min='1'
              max='99'
              onChange={this.handleChange}
              />
            <Input
              className={cx('settings__input', 'settings__input_country')}
              value={this.state.country}
              name='country'
              placeholder='Country'
              onChange={this.handleChange}
              maxLength={M.SETTINGS_COUNTRY_MAX_LENGTH}
              />
            <Input
              className={cx('settings__input', ' settings__input_city')}
              value={this.state.city}
              name='city'
              placeholder='City'
              onChange={this.handleChange}
              maxLength={M.SETTINGS_CITY_MAX_LENGTH}
              />
            <textarea
              className={cx('settings__input', ' settings__input_about')}
              value={this.state.about}
              name='about'
              placeholder='About self'
              maxLength={M.SETTINGS_INFO_MAX_LENGTH}
              onChange={this.handleChange}
              />
            <Button
              className='settings__submit-button'
              type='submit'
              inProgress={this.state.inProgress}
            >{this.state.inProgress ? 'Saving' : 'Save'}</Button>
          </form>
        </PopUp>
        <Link to='/'>
          <div className='settings__overlay' />
        </Link>
      </div>
    );
  }
}
