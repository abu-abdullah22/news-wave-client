import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyArticles = () => {
    const axiosSecure = useAxiosSecure() ;
    const {user} = useAuth() ;
    const {data : articles = []} = useQuery({
        queryKey: ['articles'],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/articles/${user?.email}`);
            return res.data ;
        }
    })
    return (
        <div>
            <h1>{articles.length}</h1>
        </div>
    );
};

export default MyArticles;