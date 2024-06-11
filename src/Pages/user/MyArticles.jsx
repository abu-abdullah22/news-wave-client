/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const MyArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedReason, setSelectedReason] = useState("");
    const { data: articles = [], refetch} = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${user?.email}`);
            return res.data;
        }
    }) ;

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
                axiosSecure.delete(`/delete/${article._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success('Article Deleted!')
                        }
                    })
            }
        });
    }; 

    const handleReason = (reason) => {
        setSelectedReason(reason);
        Swal.fire({
            title: "Reason for Decline",
            text: reason,
            icon: "info",
            confirmButtonColor: "#3085d6",
        });
    };
    return (
        <div className="container mx-auto p-4 min-h-[80vh] my-20">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>isPremium</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={article._id}>
                                <th>{index + 1}</th>
                                <td>{article.title}</td>
                                <td><Link to={`/article/${article._id}`}><button className="btn bg-[#2563EB] text-white">Go</button></Link></td>
                                <td>{article.status} {!article.status && 'pending'}  {article.status === 'declined' && (
                                        <button
                                            className="btn ml-2"
                                            onClick={() => handleReason(article.declineReason)}
                                        >
                                            Why?
                                        </button>
                                    )} </td>
                                <td>{article.premium ? 'Yes' : 'No'}</td>
                                <td><Link to={`/update/${article._id}`}><button className="btn bg-[#7C3AED] text-white">Update</button></Link></td>
                                <td><button className="btn" onClick={() => handleDelete(article)}><FaTrash /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyArticles;