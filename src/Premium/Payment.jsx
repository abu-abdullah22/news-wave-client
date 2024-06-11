import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = () => {
  const location = useLocation();
  const { subscriptionPlan } = location.state;

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <Elements stripe={stripePromise}>
            <CheckoutForm subscriptionPlan={subscriptionPlan} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
