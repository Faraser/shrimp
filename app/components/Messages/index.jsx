import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';

export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    docked: PropTypes.bool.isRequired,
    sendEditedMessage: PropTypes.func.isRequired,
    typing: PropTypes.instanceOf(List).isRequired,
  };


  constructor(props) {
    super(props);
    this.state = {
      listBottom: 0,
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.typing, this.props.typing) &&
      Immutable.is(nextProps.local, this.props.local) &&
        nextProps.docked === this.props.docked &&
        nextState.listBottom === this.state.listBottom
    );
  }


  componentDidUpdate = () => {
    this.scrollToBottom();
  };


  changeBottom = (height) => {
    this.setState({listBottom: height});
  };


  scrollToBottom = () => {
    const list = this.refs.list;
    list.scrollTop = list.scrollHeight;
  };


  render() {
    const {messages, local, sendEditedMessage, typing} = this.props;
    return (
      <div
        className='messages'
        ref='list'
        style={{bottom: this.state.listBottom}}
      >
        <MessageList
          {...this.props}
          messages={messages}
          scroll={this.scrollToBottom}
          local={local}
          sendEditedMessage={sendEditedMessage}
        />

        <MessageComposer
          {...this.props}
          local={local}
          typing={typing}
          changeBottom={this.changeBottom}
        />
      </div>
    );
  }
}
