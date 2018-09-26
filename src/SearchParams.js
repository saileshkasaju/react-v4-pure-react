import React, { Component } from 'react';
import pf, { ANIMALS } from 'petfinder-client';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class SearchParams extends Component {
  state = {
    location: 'Seattle, WA',
    animal: '',
    breed: '',
    breeds: [],
  };

  handleLocationChange = e => this.setState({ location: e.target.value });

  handleAnimalChange = e => {
    this.setState({ animal: e.target.value, breed: '' }, this.getBreeds);
  };

  handleBreedChange = e => this.setState({ breed: e.target.value });

  getBreeds = () => {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (data.petfinder && data.petfinder.breeds && Array.isArray(data.petfinder.breeds.breed)) {
          this.setState({ breeds: data.petfinder.breeds.breed });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  };
  render() {
    const { breeds, breed, location, animal } = this.state;
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            name="location"
            onChange={this.handleLocationChange}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onBlur={this.handleAnimalChange}
            onChange={this.handleAnimalChange}
          >
            <option value="">All breeds</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            disabled={!this.state.breeds.length}
          >
            <option value="">All breeds</option>
            {breeds.map(eachBreed => (
              <option key={eachBreed} value={eachBreed}>
                {eachBreed}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default SearchParams;
