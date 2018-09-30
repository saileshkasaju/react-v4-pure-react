import changeLocation from '../changeLocation';

test('changeLocation action creator', () => {
  expect(changeLocation('Seattle, WA')).toMatchSnapshot();
  expect(changeLocation('Seattle, WA')).toEqual({ type: 'SET_LOCATION', payload: 'Seattle, WA' });
});
