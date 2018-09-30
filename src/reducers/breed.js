const animalReducer = (state = '', action) => {
  if (action.type === 'SET_BREED') {
    return action.payload;
  }
  return action.type === 'SET_ANIMAL' ? '' : state;
};

export default animalReducer;
