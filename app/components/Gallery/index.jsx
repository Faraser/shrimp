import React, {PropTypes} from 'react';
import {List} from 'immutable';
import './styles.scss';
import ImageGallery from 'react-image-gallery';
import PopUp from 'components/PopUp';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {imagesChannelSelector} from 'selectors/messagesSelector';

@connect(state => ({
  images: imagesChannelSelector(state),
}))
export default class Gallery extends React.Component {

  static propTypes = {
    images: PropTypes.instanceOf(List).isRequired,
  };


  render() {
    const {images} = this.props;
    const photos = images.toJS().map(image => ({original: image, thumbnail: image}));
    return (
      <div className='gallery'>
        <PopUp className='gallery__window'>
          <div>
            <ImageGallery
              items={photos}
              />
          </div>
        </PopUp>
        <Link to='/'>
          <div className='gallery__overlay'/>
        </Link>
      </div>
    );
  }
}

