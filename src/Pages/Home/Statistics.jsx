/* eslint-disable no-unused-vars */
import CountUp from 'react-countup';
import useUserStats from '../../Hooks/useUserStats';
import { motion } from 'framer-motion';

const bookOpenVariant = {
  hidden: { opacity: 0, rotateY: 90, scaleX: 0, transformOrigin: "down" },
  visible: {
    opacity: 1,
    rotateY: 0,
    scaleX: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Statistics = () => {
  const { data, isLoading, error } = useUserStats();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading statistics</p>;

  const { totalUsers, normalUsers, premiumUsers } = data;

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Normal Users", value: normalUsers },
    { label: "Premium Users", value: premiumUsers },
  ];

  return (
    <motion.div
      className="statistics-section p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md container mx-auto my-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <h2 className="text-4xl font-bold text-center mb-8">User Statistics</h2>
      <div className="flex justify-around flex-wrap gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={bookOpenVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="stat flex flex-col items-center bg-white bg-opacity-20 p-6 rounded-lg shadow-lg w-64"
            style={{ perspective: 1000 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{stat.label}</h3>
            <CountUp end={stat.value} duration={2.5} className="text-3xl font-bold" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Statistics;

