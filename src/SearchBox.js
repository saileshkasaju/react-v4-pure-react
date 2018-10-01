import React, { Component } from 'react';
import { ANIMALS } from 'petfinder-client';
import { connect } from 'react-redux';
import getBreeds from './actionCreators/getBreeds';
import changeBreed from './actionCreators/changeBreed';
import changeAnimal from './actionCreators/changeAnimal';
import changeLocation from './actionCreators/changeLocation';

class SearchBox extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.search();
  };
  render() {
    const {
      breeds,
      breed,
      animal,
      location,
      handleAnimalChange,
      handleBreedChange,
      handleLocationChange,
    } = this.props;
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
  }
}

const mapStateToProps = ({ animal, breed, breeds, location }) => ({
  animal,
  breed,
  breeds,
  location,
});

const mapDispatchToProps = dispatch => ({
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  },
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
