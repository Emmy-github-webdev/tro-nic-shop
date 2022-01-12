import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {
  const cart = useSelector(state => state.cart);
  const shippingAddress = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, SetCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country }));
    history.push('/payment');
  }



  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <form onSubmit={submithandler}>
        <Form.Group controlId='address'className="mb-4">
          <Form.Label>Address</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter your address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className="mb-4">
          <Form.Label>City</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter your city"
          value={city}
          required 
          onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className="mb-4">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter your postal code"
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className="mb-4">
          <Form.Label>Country</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter your country"
          value={country}
          required
          onChange={(e) => SetCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </form>
    </FormContainer>
  )
}

export default ShippingScreen;