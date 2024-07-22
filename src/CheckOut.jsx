// src/components/Checkout.js
import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Process the checkout
      console.log('Checkout Data:', formData);
      dispatch(clearCart());
      alert('Checkout completed successfully!');
      setFormData({
        name: '',
        email: '',
        address: '',
        paymentMethod: '',
        cardName: '',
        cardExpiry: '',
        cardCVV: '',
        upiId: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.paymentMethod) errors.paymentMethod = 'Payment method is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardName) errors.cardName = 'Cardholder name is required';
      if (!formData.cardExpiry) errors.cardExpiry = 'Card expiry date is required';
      if (!formData.cardCVV) errors.cardCVV = 'Card CVV is required';
    }
    
    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId) errors.upiId = 'UPI ID is required';
      else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(formData.upiId)) errors.upiId = 'Invalid UPI ID format';
    }
    
    return errors;
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a payment method</option>
            <option value="pay_on_delivery">Pay on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>
          {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
        </div>

        {formData.paymentMethod === 'card' && (
          <>
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name:</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className="form-control"
              />
              {errors.cardName && <p className="error-message">{errors.cardName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cardExpiry">Card Expiry Date:</label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="form-control"
              />
              {errors.cardExpiry && <p className="error-message">{errors.cardExpiry}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cardCVV">Card CVV:</label>
              <input
                type="text"
                id="cardCVV"
                name="cardCVV"
                value={formData.cardCVV}
                onChange={handleChange}
                className="form-control"
              />
              {errors.cardCVV && <p className="error-message">{errors.cardCVV}</p>}
            </div>
          </>
        )}

        {formData.paymentMethod === 'upi' && (
          <div className="form-group">
            <label htmlFor="upiId">UPI ID:</label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="form-control"
            />
            {errors.upiId && <p className="error-message">{errors.upiId}</p>}
          </div>
        )}

        <button type="submit" className="checkout-button">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
