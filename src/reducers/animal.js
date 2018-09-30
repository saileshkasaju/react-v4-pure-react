const animalReducer = (state = '', action) =>
  action.type === 'SET_ANIMAL' ? action.payload : state;

export default animalReducer;
