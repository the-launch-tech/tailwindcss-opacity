import * as Constants from '../src/constants'

test('Check default opacities', () => {
  expect(Constants.defaultOpacities).toStrictEqual([0.1, 0.25, 0.5, 0.8])
})
