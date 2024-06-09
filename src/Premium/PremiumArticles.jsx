import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure() ;
    const {data : articles = []} = useQuery({
        queryKey: ['articles'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/premiumArticles')
            return res.data ;
        }
    })
    return (
        <div>
            <h1>{articles.length}</h1>
        </div>
    );
};

export default PremiumArticles;