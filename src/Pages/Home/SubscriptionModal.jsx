/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SubscriptionModal = ({ showModal, setShowModal }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-8 w-96 text-white relative"
          >
            <h2 className="text-3xl font-bold mb-3 tracking-wide">Subscribe Now</h2>
            <p className="mb-6 text-sm text-gray-200">
              Unlock all premium features to enhance your experience!
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/subscription">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-200">
                  Take Subscription
                </button>
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-full transition duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;

