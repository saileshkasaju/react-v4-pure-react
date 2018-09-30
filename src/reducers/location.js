const locationReducer = (state = 'Seattle, WA', action) =>
  action.type === 'SET_LOCATION' ? action.payload : state;

export default locationReducer;
