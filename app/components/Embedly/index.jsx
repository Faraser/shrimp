import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';

export default class Embedly extends React.Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    other: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }


  render = () => {
    const {children, other, embeded, href} = this.props;
    const url = embeded ? embeded.find(item => item.get('text') === children) : null;
    if (!url) {
      return (
        <a
          href={href}
          target='_blank'
          className='embedly__link'
        >{children}</a>
      );
    }
    const data = url.toJS();
    if (data.type === 'video') {
      const html = {__html: data.html};
      return (
        <div className={cx('embedly', {'embedly_other': other})}>
          <h3 className='embedly__title'>{data.title}</h3>
          <a href={data.url} className='embedly__link' target='_blank'>{data.provider_url}</a><br/>
          <div className='embedly__video' dangerouslySetInnerHTML={html} />
        </div>
      );
    }
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
