import React, {useState, useEffect} from 'react'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'


const ProfileScreen = ({location, history}) => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
   
    const dispatch = useDispatch();

    const userDetail = useSelector(state => state.userDetail);
    const {loading, error, user} = userDetail;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy;
   
    useEffect(() => {
        if(!userInfo){
            history.push('/login');
        } else {
          if(!user.name){
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
          } else {
            setName(user.name)
            setEmail(user.email)
          }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
          setMessage('Password do not match');
        } else {
          //dispatch update profile
          dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }
    return (
        <Row>
          <Col md={3}>
          <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler} className='py-3'>
                <Form.Group controlId='name' className='mb-4'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                    type="name" 
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='mb-4'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='mb-4'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='mb-4'>
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className="mb-4">
                    Update
                </Button>
            </Form>


          </Col>

          <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.ispaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red' }}></i>)}</td>
                      <td>{order.isdelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red' }}></i>)}</td>
                      <td><LinkContainer to={`/order/${order._id}`}><Button variant='light' className='btn-sm'>Details</Button></LinkContainer></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
    )
}

export default ProfileScreen;
