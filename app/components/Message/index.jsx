import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import moment from 'moment';
import Linkify from 'react-linkify';
import Textarea from 'react-textarea-autosize';
import {M} from '../../../constants';
import Embedly from 'components/Embedly';
import {Link} from 'react-router';
import ImagePreviews from 'components/ImagePreviews';

export default class Message extends React.Component {

  static propTypes = {
    sender: PropTypes.instanceOf(Map).isRequired,
    images: PropTypes.instanceOf(List).isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    edited: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
    senderRepeated: PropTypes.bool.isRequired,
    nextMessageIsMain: PropTypes.bool.isRequired,
    sendEditedMessage: PropTypes.func.isRequired,
    embeded: PropTypes.instanceOf(List),
  };


  constructor(props) {
    super(props);
    this.messageMaxLength = M.MESSAGE_MAX_LENGTH;
    this.state = {
      date: null,
      isEdit: false,
      editorHeight: 0,
      editorWidth: 0,
      editorValue: this.props.text,
      editorImages: this.props.images,
    };
  }


  componentDidMount = () => {
    // this.updateTime(this.props.timestamp);
    // this.timer = setInterval(()=> {
    //  this.updateTime(this.props.timestamp);
    // }, 5000);
  };


  componentDidUpdate = () => {
    if (this.state.isEdit) {
      this.refs.editor.focus();
    }
  };


  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  updateTime = (timestamp) => {
    const date = moment.duration(moment().diff(moment(timestamp))).humanize();
    this.setState({
      date: date,
    });
  };


  editStart = () => {
    const textCloud = window.getComputedStyle(this.refs.text);
    this.setState({
      isEdit: true,
      editorHeight: textCloud.height,
      editorWidth: textCloud.width,
      editorValue: this.props.text,
      editorImages: this.props.images,
    });
  };


  editEnd = () => {
    const newText = this.state.editorValue.trim();
    const newImages = this.state.editorImages;
    const isImagesChanged = newImages !== this.props.images;
    const isTextChanged = newText !== this.props.text;
    const isImagesEmpty = newImages.isEmpty();
    if (newText && isTextChanged ||
        isTextChanged && !isImagesEmpty ||
        isImagesChanged && !isImagesEmpty ||
        isImagesChanged && newText) {
      this.props.sendEditedMessage({
        text: newText,
        edited: true,
        messageId: this.props.messageId,
        images: newImages,
      });
      this.setState({
        isEdit: false,
      });
    } else {
      this.cancelEdit();
    }
  };


  editorKeyDown = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.editEnd();
    } else if (e.which === 27) {
      this.cancelEdit();
    }
  };


  cancelEdit = () => {
    this.setState({
      isEdit: false,
      editorValue: this.props.text,
      editorImages: this.props.images,
    });
  };

  editorChange = (e) => {
    this.setState({
      editorValue: e.target.value.slice(0, this.messageMaxLength = 220),
    });
  };

  removeImage = (index) => {
    this.setState({
      editorImages: this.state.editorImages.remove(index),
    });
  };

  renderAvatar = (sender) => {
    return (
      <img
        className='message__avatar'
        src={sender.get('avatar')}
        width='50'
        height='50'
      />
    );
  };


  render() {
    const {sender, text, currentUserId, senderRepeated, nextMessageIsMain, edited, images, messageId, embeded} = this.props;
    const isSelfMessage = sender.get('id') === currentUserId;
    const userName = (() => {
      if (isSelfMessage || senderRepeated) return null;
      const name = sender.get('name');
      return <div className='message__username'>{name}</div>;
    }());
    return (
      <li className={cx('message', {
        'message_repeated': senderRepeated,
        'message_last': !nextMessageIsMain,
        'message_foreign': !isSelfMessage,
      })}>
        {isSelfMessage ? null : this.renderAvatar(sender)}
        {userName}
        <div className='message__cloud'>
          <div className='message__edit' hidden={!isSelfMessage || this.state.isEdit}>
            <a
              onClick={this.editStart}
              className='message__edit-btn'>{'✎'}</a>
          </div>
          <div className='message__text' ref='text'>
            <div hidden={this.state.isEdit}>
              <Linkify
                component={Embedly}
                properties={{other: !isSelfMessage, messageId: messageId, embeded: embeded}}>
                {text}
              </Linkify>
              <div className='message__images' >
                {images.map((image, i) => (
                <Link to={`/gallery/${image.split('/').slice(-1)}`} key={i}>
                  <img src={image} className='message__image' key={i}/>
                </Link>
                ))}
              </div>
            </div>
            <div hidden={!this.state.isEdit}>
              <Textarea
                value={this.state.editorValue}
                onKeyDown={this.editorKeyDown}
                onChange={this.editorChange}
                // onBlur={this.cancelEdit}
                className='message__editor'
                ref='editor'
                minRows={2}
                maxRows={10}
                style={{width: this.state.editorWidth, height: this.state.editorHeight}}
              />
              <ImagePreviews
                className='message__preview-image'
                links={this.state.editorImages}
                remove={this.removeImage}
                />
              <div
                className='message__save-btn'
                onClick={this.editEnd}
                >{'enter to '}<u>{'save'}</u>{' changes'}</div>
              <div
                className='message__cancel-btn'
                onClick={this.cancelEdit}
                >{'esc to '}<u>{'cancel'}</u>
              </div>
            </div>
          </div>
          <div
            className='message__date'
            hidden={this.state.isEdit}
            >{edited ? 'edited ' + this.state.date + ' ago' : this.state.date + ' ago' }</div>
        </div>
      </li>
    );
  }
}

