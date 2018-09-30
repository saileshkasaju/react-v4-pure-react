import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import pf from 'petfinder-client';
import Loadable from 'react-loadable';
import { injectGlobal } from 'react-emotion';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from './SearchContext';
import NavBar from './NavBar';
import store from './store';

injectGlobal`
  * {
    color: red;
  }
`;

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>loading split out code ...</h1>;
  },
});

const LoadableResults = Loadable({
  loader: () => import('./Results'),
  loading() {
    return <h1>loading split out code ...</h1>;
  },
});

const LoadableSearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading() {
    return <h1>loading split out code ...</h1>;
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Seattle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds,
    };
  }

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
    return (
      <div>
        <NavBar />
        <ReduxProvider store={store}>
          <Provider value={this.state}>
            <Router>
              <LoadableResults path="/" />
              <LoadableDetails path="/details/:id" />
              <LoadableSearchParams path="/search-params" />
            </Router>
          </Provider>
        </ReduxProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
