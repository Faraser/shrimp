import React, {PropTypes} from 'react';
import './styles.scss';

export default class Message extends React.Component {

  static propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }


  render() {
    const {text} = this.props;
    return (
      <li>
        <div className='message'>
          <div className='message__text-item'>
            {text}
          </div>
        </div>
      </li>
    );
  }
}
