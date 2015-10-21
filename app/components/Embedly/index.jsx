import React, {PropTypes} from 'react';
import cx from 'classnames';
import './styles.scss';
import {M} from '../../../constants';

export default class Embedly extends React.Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    other: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      data: null,
    };
  }

  componentDidMount = () => {
    console.log('mount');
    if (!this.state.load) {
      fetch(`http://api.embed.ly/1/oembed?url=${this.props.children}&key=${M.API_KEY}`)
        .then(response => response.json())
        .then(data => {
          console.log('get');
          this.setState({data: data, load: true});
        });
    }
  };

  componentDidUpdate = () => {
    console.log('update');
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return !!(nextState.load && !this.state.load);
  };

  render = () => {
    if (!this.state.load) {
      return (
        <a
          href={this.props.children}
          target='_blank'
          className='embedly__link'
        >{this.props.children}</a>
      );
    }
    const data = this.state.data;
    return (
      <div className={cx('embedly', {'embedly_other': this.props.other})}>
        <h3 className='embedly__title'>{data.title}</h3>
        <a href={data.provider_url} className='embedly__link' target='_blank'>{data.provider_url}</a><br/>
        <img src={data.thumbnail_url} className='embedly__image'/>
        <div className='embedly__descr'>{data.description}</div>
      </div>
    );
  };
}
