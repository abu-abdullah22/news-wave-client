import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Premium Individual",
    price: "FREE FOR 1 MONTH",
    color: "#FFD2D7",
    features: [
      "1 Premium account",
      "Cancel anytime",
      "15 hours/month of listening time from our audiobooks subscriber catalog",
    ],
    button: "Try free for 1 month",
  },
  {
    title: "Premium Duo",
    price: "$14.99 PER MONTH",
    color: "#FFC862",
    features: [
      "2 Premium accounts",
      "Cancel anytime",
      "15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
    ],
    button: "Get Premium Duo",
  },
  {
    title: "Premium Family",
    price: "$16.99 PER MONTH",
    color: "#A5BBD1",
    features: [
      "Up to 6 Premium or Kids accounts",
      "Block explicit music",
      "Access to Spotify Kids",
      "Cancel anytime",
      "15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
    ],
    button: "Get Premium Family",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60 },
  },
};

const SubscriptionPlans = () => {
  return (
    <motion.div
      className="flex justify-center my-20 p-10 bg-gray-900 container mx-auto rounded-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            variants={cardVariants}
            className="bg-gray-800 text-white border-2 p-6 rounded-lg shadow-lg w-64 flex flex-col"
            style={{ borderColor: plan.color }}
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.title}</h2>
            <p
              className="mb-4 p-2 rounded-md text-black text-center"
              style={{ backgroundColor: plan.color }}
            >
              {plan.price}
            </p>
            <ul className="list-disc list-inside mb-4 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Link to="/subscription">
                <button
                  className="hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-full w-full"
                  style={{ backgroundColor: plan.color }}
                >
                  {plan.button}
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SubscriptionPlans;
