import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const AllArticlesApproval = () => {
    const axiosSecure = useAxiosSecure();
    const {data: articles = [],refetch} = useQuery({
        queryKey: ['articles'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/articles');
            return res.data ;
        }
    })

    
    const hanldeApprove = article => {
        console.log(article);
        axiosSecure.patch(`/articles/admin/${article._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0) {
                refetch() ;
               toast.success('Article Approved')      
            }
        }) ;
    }
    return (
        <div>
            <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Articles (for approval)</h2>
                <h2 className="text-3xl">Total articles : {articles.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Author Email</th>
                            <th>Author Image</th>
                            <th>Posted Date</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          articles.map((article, index) => <tr key={article._id}>
                                <th>{index + 1}</th>
                                <td>{article.title}</td>
                                <td>{article.author_name}</td>
                                <td>{article.author_email}</td>
                                <td><img src={article.author_image} referrerPolicy="no-referrer" className="w-[60px]" alt="" /></td>
                                <td>{article.postedDate.split('T')[0]}</td>
                                <td>{article.status == 'approved' ? 'Approved': <button onClick={()=> hanldeApprove(article)} className="btn">pending</button>}</td>
                                <td><FaTrash /> </td>
                            </tr>)

                        }
                    </tbody>
                </table>
            </div>
        </div>

        </div>
    );
};

export default AllArticlesApproval;