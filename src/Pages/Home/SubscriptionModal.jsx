/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const SubscriptionModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dark:text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl font-semibold mb-4">Subscribe Now</h2>
        <p className="mb-4">Get access to premium features and more.</p>
        <Link to={'/subscription'}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
            Take Subscription
          </button>
        </Link>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 bg-blue-400 p-2 rounded-lg text-white ml-2 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
