import React, {PropTypes} from 'react';
import Immutable, {Map, List} from 'immutable';
import cx from 'classnames';
import Textarea from 'react-textarea-autosize';
import Typing from 'components/Typing';
import debounce from 'lodash.debounce';
import {M} from '../../../constants';
import Dropzone from 'react-dropzone';
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
    this.messageMaxLength = M.MESSAGE_MAX_LENGTH;
    this.endTyping = debounce((data) => {
      this.setState({typing: false});
      this.props.sendEndTyping(data);
    }, M.TYPING_DEBOUNCE);
    this.state = {
      text: '',
      typing: false,
      paths: [],
      files: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextProps.typing, this.props.typing) &&
      Immutable.is(nextState.files, this.state.files) &&
      Immutable.is(nextState.text, this.state.text)
    );
  }


  onDrop = (files) => {
    const data = new FormData();
    files.map(file => data.append('images', file));
    fetch('/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(res => this.setState({
        paths: this.state.paths.concat(res.paths),
        files: this.state.files.concat(files),
      }));
  };


  sendMessage = () => {
    const text = this.state.text.trim();
    if (text || this.state.files.length > 0) {
      this.props.newMessage({
        channelId: this.props.local.get('currentChannelId'),
        senderId: this.props.local.get('userId'),
        text: this.state.text,
        images: this.state.paths,
      });
      this.setState({
        text: '',
        paths: [],
        files: [],
      });
    }
  };


  openUpload = (e) => {
    e.preventDefault();
    this.refs.dropzone.open();
  };


  textKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  };

  startTyping = (data) => {
    if (!this.state.typing) {
      this.props.sendStartTyping(data);
      this.setState({typing: true});
    }
  };


  textChange = (e) => {
    const data = {
      channelId: this.props.local.get('currentChannelId'),
      senderId: this.props.local.get('userId'),
    };
    this.startTyping(data);
    this.endTyping(data);

    if (e.target.value.length === this.messageMaxLength) {
      this.setState({
        text: e.target.value,
      });
    } else {
      this.setState({
        text: e.target.value,
      });
    }
  };


  render() {
    const {changeBottom, typing} = this.props;
    const leftSymbols = this.messageMaxLength - this.state.text.length;

    return (

      <div className='composer'>
        <Dropzone onDrop={this.onDrop} disableClick className='composer__dropzone' ref='dropzone'>
          <Typing typing={typing}/>

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

            <div className={cx('composer__info', {composer__info_error: leftSymbols <= 0})}>
              {leftSymbols}
            </div>
            <button
              type='button'
              onClick={this.sendMessage} s
              className='composer__send-button'
              >Send
            </button>
            <div
              type='button'
              onClick={this.openUpload}
              className='composer__upload-button'
              >
            </div>

            <div className='composer__preview'>
              {this.state.files.map((file, i) => <img className='composer__preview-img' src={file.preview} key={i}/>)}
            </div>
          </div>
        </Dropzone>
      </div>
    );
  }
}
