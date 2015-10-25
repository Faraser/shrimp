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
    params: PropTypes.object.isRequired,
  };


  render() {
    const {images, params} = this.props;
    const photos = images.toJS().map(image => ({original: image, thumbnail: image}));
    const startIndex = images.findIndex(item => item.endsWith(params.startIndex));
    return (
      <div className='gallery'>
        <PopUp className='gallery__window'>
          <div>
            <ImageGallery
              items={photos}
              startIndex={startIndex}
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

