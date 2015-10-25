import React, {PropTypes} from 'react';
import {List} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import {connect} from 'react-redux';

@connect(state => ({
  urls: state.urls,
}))
export default class Embedly extends React.Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    other: PropTypes.bool,
    urls: PropTypes.instanceOf(List).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    const foundedUrl = this.props.urls.find(url => url.get('url') === this.props.children);
    if (!foundedUrl) {
      this.props.addUrl({url: this.props.children, messageId: this.props.messageId});
    }
  };


  render = () => {
    const {urls, children, other} = this.props;
    const url = urls.find(item => item.get('url') === children);
    if (!url || !url.get('data')) {
      return (
        <a
          href={children}
          target='_blank'
          className='embedly__link'
        >{children}</a>
      );
    }
    const data = url.get('data');
    if (data.type === 'photo') {
      return null;
    }
    return (
      <div className={cx('embedly', {'embedly_other': other})}>
        <h3 className='embedly__title'>{data.title}</h3>
        <a href={children} className='embedly__link' target='_blank'>{data.provider_url}</a><br/>
        <img src={data.thumbnail_url} className='embedly__image'/>
        <div className='embedly__descr'>{data.description}</div>
      </div>
    );
  };
}
