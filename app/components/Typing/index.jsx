import React, {PropTypes} from 'react';
import {List} from 'immutable';
import './styles.scss';
import Loader from 'react-dots-loader';
import 'react-dots-loader/index.css';

export default class Typing extends React.Component {

  static propTypes = {
    typing: PropTypes.instanceOf(List).isRequired,
  }


  constructor(props) {
    super(props);
  }


  render() {
    const {typing} = this.props;
    let users = null;
    if (typing.size === 1) {
      users = typing.get(0) + ' is typing message   ';
    } else if (typing.size === 2) {
      users = typing.get(0) + ' and ' + typing.get(1) + ' are typing messages   ';
    } else if (typing.size > 2) {
      users = 'Several users are typing messages   ';
    }
    return (
        <div className='typing'>
          {users}
          {users ? <Loader size={2} distance={5} color={'white'}/> : null }
        </div>
    );
  }
}
