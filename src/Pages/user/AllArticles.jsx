import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic() ;
    const {data : articles = []} = useQuery({
        queryKey: ['allArticles'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/allArticles');
            return res.data ;
        }
    })
    return (
        <div>
            {articles.length}
        </div>
    );
};

export default AllArticles;