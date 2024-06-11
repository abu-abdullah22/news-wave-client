import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const { data: usersData, refetch } = useQuery({
        queryKey: ['allUsers', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${page}&limit=${itemsPerPage}`);
            return res.data;
        }
    });

    const { users = [], total } = usersData || {};

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Admin added');
                }
            });
    };

    const totalPages = Math.ceil(total / itemsPerPage);

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {total}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{(page - 1) * itemsPerPage + index + 1}</th>
                                <td>{user.name}</td>
                                <td><img src={user?.photo} referrerPolicy="no-referrer" className="w-[60px]" alt="" /></td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#7C3AED]"><FaUsers className="text-white text-xl"></FaUsers></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`btn mx-1 ${page === index + 1 ? "btn-active" : ""}`}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
