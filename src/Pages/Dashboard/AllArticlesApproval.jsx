import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllArticlesApproval = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/articles');
            return res.data;
        }
    });

    const [selectedArticle, setSelectedArticle] = useState(null);
    const [declineReason, setDeclineReason] = useState("");

    const handleApprove = article => {
        axiosSecure.patch(`/articles/admin/${article._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Article Approved');
                }
            });
    };

    const handleDecline = article => {
        setSelectedArticle(article);
    };

    const handleDeclineSubmit = () => {
        axiosSecure.patch(`/articles/admin/decline/${selectedArticle._id}`, { declineReason })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Article Declined!');
                    setSelectedArticle(null);
                    setDeclineReason("");
                }
            });
    };

    const handlePremium = article => {
        axiosSecure.patch(`/articles/admin/premium/${article._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Article made premium!');
                }
            });
    };
    const handleDelete = article => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/articles/admin/delete/${article._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success('Article Deleted!')
                        }
                    })

            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Articles (for approval)</h2>
                <h2 className="text-3xl">Total articles: {articles.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Author Email</th>
                            <th>Author Image</th>
                            <th>Posted Date</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Decline</th>
                            <th>Premium</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={article._id}>
                                <th>{index + 1}</th>
                                <td>{article.title}</td>
                                <td>{article.author_name}</td>
                                <td>{article.author_email}</td>
                                <td><img src={article.author_image} referrerPolicy="no-referrer" className="w-[60px]" alt="" /></td>
                                <td>{article.postedDate.split('T')[0]}</td>
                                <td>{article.status === 'approved' ? 'Approved' : article.status === 'declined' ? 'Declined' : 'Pending'}</td>
                                <td>{article.status === 'approved' ? 'Approved' : <button onClick={() => handleApprove(article)} className="btn">Approve</button>}</td>
                                <td>{article.status === 'declined' ? 'Declined' : <button onClick={() => handleDecline(article)} className="btn">Decline</button>}</td>
                                <td>{article.premium ? 'Premium' : <button onClick={() => handlePremium(article)} className="btn" disabled={article.status === 'declined'}>Make Premium</button>}</td>
                                <td><button className="btn" onClick={() => handleDelete(article)}><FaTrash /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="font-bold text-lg">Decline Article</h3>
                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Reason for decline"
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button className="btn mr-2" onClick={handleDeclineSubmit}>Submit</button>
                            <button className="btn" onClick={() => setSelectedArticle(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllArticlesApproval;
