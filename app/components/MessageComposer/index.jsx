import React, {PropTypes} from 'react';
import Immutable, {Map, List} from 'immutable';
import cx from 'classnames';
import Textarea from 'react-textarea-autosize';
import Typing from 'components/Typing';
import debounce from 'lodash.debounce';
import './styles.scss';


export default class MessageComposer extends React.Component {

  static propTypes = {
    local: PropTypes.instanceOf(Map).isRequired,
    typing: PropTypes.instanceOf(List).isRequired,
    newMessage: PropTypes.func.isRequired,
    sendStartTyping: PropTypes.func.isRequired,
    sendEndTyping: PropTypes.func.isRequired,
    changeBottom: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.messageMaxLength = 220;
    this.endTyping = debounce((data) => {
      this.setState({typing: false});
      this.props.sendEndTyping(data);
    }, 2000);
    this.state = {
      text: '',
      typing: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextProps.typing, this.props.typing) &&
      Immutable.is(nextState.text, this.state.text)
    );
  }

  textChange = (e) => {
    this.startTyping();
    this.endTyping({
      channelId: this.props.local.get('currentChannelId'),
      senderId: this.props.local.get('userId'),
    });

    if (e.target.value.length === this.messageMaxLength) {
      this.setState({
        text: e.target.value,
      });
    } else {
      this.setState({
        text: e.target.value,
      });
    }
  }

  startTyping = () => {
    if (!this.state.typing) {
      this.props.sendStartTyping({
        channelId: this.props.local.get('currentChannelId'),
        senderId: this.props.local.get('userId'),
      });
      this.setState({typing: true});
    }
  };


  sendMessage = () => {
    const text = this.state.text.trim();
    if (text) {
      this.props.newMessage({
        channelId: this.props.local.get('currentChannelId'),
        senderId: this.props.local.get('userId'),
        text: this.state.text,
      });
      this.setState({
        text: '',
      });
    }
  }


  textKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  }


  render() {
    const {changeBottom, typing} = this.props;
    const leftSymbols = this.messageMaxLength - this.state.text.length;

    return (
      <div className='composer'>
        <Typing typing={typing} />
        <div className='composer__sender'>
          <Textarea
            value={this.state.text}
            onKeyPress={this.textKeyPress}
            onChange={this.textChange}
            onHeightChange={changeBottom}
            minRows={1}
            maxRows={5}
            maxLength={this.messageMaxLength}
            className='composer__textarea'
          />
          <div
            className={cx('composer__info', {
              'composer__info_error': leftSymbols <= 0,
            })}
          >
          {leftSymbols}
          </div>
          <button
            type='button'
            onClick={this.sendMessage}
            className='composer__send-button'
          >Send
          </button>
        </div>
      </div>

    );
  }
}
