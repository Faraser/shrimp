import React, {PropTypes} from 'react';
import {List} from 'immutable';
import './styles.scss';

class ImagePreview extends React.Component {

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
        <img src={src} className='preview-img__image'/>

        <div className='preview-img__cross' onClick={this.handleClick}>{'✖'}</div>
      </div>
    );
  };
}


export default class ImagePreviews extends React.Component {

  static propTypes = {
    files: PropTypes.instanceOf(List).isRequired,
    remove: PropTypes.func.isRequired,
    changeBottom: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate = () => {
    this.props.changeBottom();
  };

  render = () => {
    const {files, remove} = this.props;
    const previews = files.map((file, i) => <ImagePreview
      src={file.preview}
      index={i}
      remove={remove}
      key={i}/>);

    return (
      <div className={this.props.className}>{previews}</div>
    );
  }
}
