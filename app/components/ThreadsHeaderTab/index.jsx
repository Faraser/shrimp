import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class ThreadsHeaderTab extends React.Component {
  static propTypes = {
    isCurrent: PropTypes.bool,
    name: PropTypes.string,
    changeTab: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  changeTab = (e) => {
    e.preventDefault();
    this.props.changeTab(this.props.name);
  }

  render() {
    return (
      <div
        className={cx('threads-header__item', {
          'threads-header__item_active': this.props.isCurrent,
        })}
        onClick={this.changeTab}
      >
        {this.props.name}
      </div>
    );
  }
}
