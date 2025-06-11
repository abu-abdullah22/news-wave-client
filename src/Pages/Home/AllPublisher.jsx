import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";

const AllPublisher = () => {
  const axiosPublic = useAxiosPublic();

  const { data: publishers = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/publishers');
      return res.data;
    }
  });

  // Duplicate publishers list to create seamless loop
  const marqueePublishers = [...publishers, ...publishers];

  return (
    <div className="overflow-hidden py-10 bg-gray-100">
      <h2 className="text-4xl text-center font-bold mb-10 dark:text-black">All Publishers</h2>

      <motion.div
        className="flex w-max gap-6 px-4"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30 
        }}
      >
        {marqueePublishers.map((publisher, i) => (
          <div
            key={`${publisher._id}-${i}`}
            className="min-w-[250px] p-6 rounded-md shadow-md bg-white text-gray-900"
          >
            <img
              src={publisher.image}
              alt={publisher.name}
              className="object-cover w-full h-48 rounded-md"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-center">{publisher.name}</h2>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllPublisher;
