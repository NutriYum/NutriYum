import React from 'react'
import Camera from '../Camera'
import renderer from 'react-test-renderer'

// this mock is needed to get around a FormData undefined problem
// jest.mock.only('react-native-aws3', () => {
//   return { Request: { FormData: {} } }
// })
beforeAll(()=> {

})

test('renders without crashing', () => {
  const rendered = renderer.create(<Camera />).toJSON()
//   console.log(Camera())
  expect(rendered).toBeTruthy()
})

test('routing configurations', () => {
    const configurations = Camera.navigationOptions
    expect(configurations.tabBarLabel).toEqual('Camera')
})