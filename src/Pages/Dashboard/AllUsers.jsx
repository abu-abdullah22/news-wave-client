import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure() ;
    const {data: users = []} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/users') ;
            return res.data ;
        }
    }) 
    return (
        <div>
            <h2>All users here ; {users.length}</h2>
        </div>
    );
};

export default AllUsers;