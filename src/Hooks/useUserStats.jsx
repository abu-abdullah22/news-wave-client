import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserStats = () => {
    const axiosPublic = useAxiosPublic();
    const {data , isLoading, error} = useQuery({
        queryKey : ['user-stats'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/user-stats') ;
            return res.data ;
        }
    }) ;
    return {data, isLoading, error} ;
};

export default useUserStats;