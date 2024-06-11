import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllPublisher = () => {
    const axiosPublic = useAxiosPublic();
    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/publishers');
            return res.data;
        }
    })
    return (
        <div className="container xl:mx-auto mx-2">
            <h2 className="text-3xl text-center font-bold my-10">All Publisher</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {publishers?.map(publisher =>
                    <div key={publisher._id} className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                        <img src={publisher.image} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" data--h-bstatus="5PROCESSED" />
                        <div className="mt-6 mb-2">
                            <h2 className="text-xl font-semibold tracking-wide">{publisher.name}</h2>
                        </div>

                    </div>)}
            </div>
        </div>
    );
};

export default AllPublisher;