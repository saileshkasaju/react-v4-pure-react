import React from 'react';
import pf, { PetResponse, PetMedia } from 'petfinder-client';
import { navigate, RouteComponentProps } from '@reach/router';
import Carousel from './Carousel';
import Modal from './Modal';

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error('no Api key');
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    name: '',
    animal: '',
    location: '',
    description: '',
    media: {} as PetMedia,
    breed: '',
  };
  public componentDidMount() {
    if (!this.props.id) {
      return;
    }
    petfinder.pet
      .get({
        output: 'full',
        id: this.props.id,
      })
      .then((data: PetResponse) => {
        if (!data.petfinder.pet) {
          navigate('/');
          return;
        }
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
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
  public toggleModal = () => this.setState({ showModal: !this.state.showModal });
  public render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const { name, animal, breed, location, description, media, showModal } = this.state;
    let modal;
    if (showModal) {
      modal = (
        <Modal>
          <h1>Would you like to adopt {name}?</h1>
          <div className="buttons">
            <button onClick={this.toggleModal}>Yes</button>
            <button onClick={this.toggleModal}>No</button>
          </div>
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
