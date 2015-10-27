import React, {PropTypes} from 'react';
import './styles.scss';
import moment from 'moment';

export default class MessageDate extends React.Component {
  static propTypes = {
    timestamp: PropTypes.string.isRequired,
    edited: PropTypes.bool.isRequired,
    hidden: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }


  componentDidMount = () => {
    this.updateTime(this.props.timestamp);
    this.timer = setInterval(()=> {
      this.updateTime(this.props.timestamp);
    }, 5000);
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


  render() {
    const {edited, hidden, className} = this.props;
    return (
      <div
        className={className}
        hidden={hidden}
        >{edited ? 'edited ' + this.state.date + ' ago' : this.state.date + ' ago' }
      </div>
    );
  }
}
