import locationReducer from '../location';

test('locationReducer', () => {
  expect(
    locationReducer('Seattle, WA', { type: 'SET_LOCATION', payload: 'San Fransisco, CA' }),
  ).toBe('San Fransisco, CA');
});
