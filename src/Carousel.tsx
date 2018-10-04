import React, { Component } from 'react';
import { PetMedia, PetPhoto } from 'petfinder-client';

interface Props {
  media: PetMedia;
}

interface State {
  active: number;
  photos: PetPhoto[];
}

class Carousel extends Component<Props, State> {
  public state = {
    photos: [],
    active: 0,
  };

  public static getDerivedStateFromProps({ media }: Props) {
    let photos: PetPhoto[] = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }

    return { photos };
  }

  public handleIndexClick = (e: React.MouseEvent) => this.setState({ active: +e.target.dataset.index });

  public render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              key={photo.value}
              src={photo.value}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
              data-index={index}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
