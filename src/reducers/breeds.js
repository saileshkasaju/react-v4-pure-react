const breedsReducer = (state = [], action) =>
  action.type === 'SET_BREEDS' ? action.payload : state;

export default breedsReducer;
