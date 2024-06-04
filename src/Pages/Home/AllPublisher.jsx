import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllPublisher = () => {
    const axiosPublic = useAxiosPublic() ;
    const {data : publishers = []} = useQuery({
        queryKey : ['publishers'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/publishers');
            return res.data ;
        }
    })
    return (
        <div>
            <h2>{publishers.length}</h2>
        </div>
    );
};

export default AllPublisher;