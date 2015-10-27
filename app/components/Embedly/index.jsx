import React, {PropTypes} from 'react';
import cx from 'classnames';
import Linkify from 'linkify-it';
import './styles.scss';

export default class Embedly extends React.Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    other: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.link = new Linkify();
  }


  render = () => {
    console.log(this.props);
    const {children, other, embeded} = this.props;
    const url = embeded ? embeded.find(item => item.get('text') === children) : null;
    if (!url) {
      return (
        <a
          href={this.link.match(children)[0].url}
          target='_blank'
          className='embedly__link'
        >{children}</a>
      );
    }
    const data = url.toJS();
    return (
      <div className={cx('embedly', {'embedly_other': other})}>
        <h3 className='embedly__title'>{data.title}</h3>
        <a href={data.url} className='embedly__link' target='_blank'>{data.provider_url}</a><br/>
        <img src={data.thumbnail_url} className='embedly__image'/>
        <div className='embedly__descr'>{data.description}</div>
      </div>
    );
  };
}
