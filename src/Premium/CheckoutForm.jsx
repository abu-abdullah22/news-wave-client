/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const { subscriptionPlan } = location.state || {};
  const { user } = useAuth();

  useEffect(() => {
    const subscriptionPrices = {
      'Premium Individual - 1 minute': 1,
      'Premium Individual - 5 days': 5,
      'Premium Individual - 30 days': 10,
      'Premium Duo - 1 minute': 1.5,
      'Premium Duo - 5 days': 7.5,
      'Premium Duo - 30 days': 14.99,
      'Premium Family - 1 minute': 2,
      'Premium Family - 5 days': 10,
      'Premium Family - 30 days': 16.99,
    };

    const price = subscriptionPrices[subscriptionPlan];

    if (price === undefined) {
      setError('Invalid subscription plan');
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await axiosSecure.post('/create-payment-intent', { price });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent', error);
        setError('Error creating payment intent');
      }
    };

    createPaymentIntent();
  }, [axiosSecure, subscriptionPlan]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setLoading(true);
    setError('');

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      setError('Client secret is not set');
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'Customer Name',
        },
      },
    });

    if (confirmError) {
      console.log('[confirmError]', confirmError);
      setError(confirmError.message);
      setLoading(false);
      return;
    }

    const currentTime = new Date();
    const premiumExpiry = new Date(currentTime);

    const [plan, period] = subscriptionPlan.split(' - ');

    switch (period) {
      case '1 minute':
        premiumExpiry.setMinutes(premiumExpiry.getMinutes() + 1);
        break;
      case '5 days':
        premiumExpiry.setDate(premiumExpiry.getDate() + 5);
        break;
      case '30 days':
        premiumExpiry.setDate(premiumExpiry.getDate() + 30);
        break;
      default:
        break;
    }

    const userEmail = user?.email;

    try {
      const response = await axiosSecure.patch(`/users/premium/${userEmail}`, {
        subscriptionPlan,
        premiumExpiry,
      });
      navigate('/');
      toast.success('Successfully subscribed!');
    } catch (error) {
      console.error('Error updating user premium status', error);
      setError('Failed to update premium status');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="my-4 bg-[#7C3AED] btn border-none text-white" type="submit" disabled={!stripe || !clientSecret || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      <p className="text-red-700">{error}</p>
    </form>
  );
};

export default CheckoutForm;
