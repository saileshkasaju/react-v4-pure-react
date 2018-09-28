import React, { Component } from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

class SearchBox extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {context => {
          const {
            breeds,
            breed,
            location,
            animal,
            handleLocationChange,
            handleAnimalChange,
            handleBreedChange,
          } = context;
          return (
            <div className="search-params">
              <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="location">
                  Location
                  <input
                    id="location"
                    value={location}
                    placeholder="Location"
                    name="location"
                    onChange={handleLocationChange}
                  />
                </label>
                <label htmlFor="animal">
                  Animal
                  <select
                    id="animal"
                    value={animal}
                    onBlur={handleAnimalChange}
                    onChange={handleAnimalChange}
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
                    onChange={handleBreedChange}
                    onBlur={handleBreedChange}
                    disabled={!breeds.length}
                  >
                    <option value="">All breeds</option>
                    {breeds.map(eachBreed => (
                      <option key={eachBreed} value={eachBreed}>
                        {eachBreed}
                      </option>
                    ))}
                  </select>
                </label>
                <button>Submit</button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SearchBox;
