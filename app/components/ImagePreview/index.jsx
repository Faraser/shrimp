import React, {PropTypes} from 'react';
import './styles.scss';

export default class ImagePreview extends React.Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.remove(this.props.index);
  };


  render = () => {
    const {src} = this.props;
    return (
      <div className='preview-img'>
        <img src={src} className='preview-img__image' />
        <div className='preview-img__cross' onClick={this.handleClick}>{'✖'}</div>
      </div>
    );
  };
}
