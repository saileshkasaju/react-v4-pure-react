import React, { Component } from 'react';
import pf from 'petfinder-client';
import Loadable from 'react-loadable';
import { navigate } from '@reach/router';
import Carousel from './Carousel';
import Modal from './Modal';

const loading = () => <h1>loading content ...</h1>;

const LoadableContent = Loadable({
  loader: () => import('./AdoptModalContent'),
  loading,
});

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Details extends Component {
  state = { loading: true, showModal: false };
  componentDidMount() {
    petfinder.pet
      .get({
        output: 'full',
        id: this.props.id,
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = pet.breeds.breed.join(', ');
        } else {
          breed = pet.breeds.breed;
        }
        this.setState({
          loading: false,
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
        });
      })
      .catch(() => {
        navigate('/');
      });
  }
  toggleModal = () => this.setState(state => ({ showModal: !state.showModal }));
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const { name, animal, breed, location, description, media, showModal } = this.state;
    let modal;
    if (showModal) {
      modal = (
        <Modal>
          <LoadableContent toggleModal={this.toggleModal} name={name} />
        </Modal>
      );
    } else {
      modal = null;
    }
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {modal}
        </div>
      </div>
    );
  }
}

export default Details;
