/* eslint-disable no-unused-vars */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const navigate = useNavigate();

  const handleSubscription = () => {
    if (subscriptionPlan) {
      navigate('/payment', { state: { subscriptionPlan } });
    } else {
      toast.error('Please select a subscription plan and period');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-10">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center rounded-lg shadow-lg w-full mb-10">
        <h1 className="text-5xl font-bold mb-4">Choose Your Subscription Plan</h1>
        <p className="text-xl">Unlock exclusive features with our premium plans</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Select Subscription Plan and Period</h2>
        <select
          className="mb-4 p-2 border rounded-md w-full text-black dark:text-white"
          value={subscriptionPlan}
          onChange={(e) => setSubscriptionPlan(e.target.value)}
        >
          <option value="">Select Subscription Plan and Period</option>
          <optgroup label="Premium Individual">
            <option value="Premium Individual - 1 minute">1 Minute - $0</option>
            <option value="Premium Individual - 5 days">5 Days - $0</option>
            <option value="Premium Individual - 30 days">30 Days - $0</option>
          </optgroup>
          <optgroup label="Premium Duo">
            <option value="Premium Duo - 1 minute">1 Minute - $1.5</option>
            <option value="Premium Duo - 5 days">5 Days - $7.5</option>
            <option value="Premium Duo - 30 days">30 Days - $14.99</option>
          </optgroup>
          <optgroup label="Premium Family">
            <option value="Premium Family - 1 minute">1 Minute - $2</option>
            <option value="Premium Family - 5 days">5 Days - $10</option>
            <option value="Premium Family - 30 days">30 Days - $16.99</option>
          </optgroup>
        </select>
        <button
          onClick={handleSubscription}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full w-full"
        >
          Take Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
