import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const hanldeMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Admin added`)
                }
            });
    }
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users </h2>
                <h2 className="text-3xl">Total Users : {users.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra ">
                    {/* head */}
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
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td><img src={user?.photo} referrerPolicy="no-referrer" className="w-[60px]" alt="" /></td>
                                <td>{user.email}</td>
                                <td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' : <button onClick={() => hanldeMakeAdmin(user)} className="btn bg-[#7C3AED]"><FaUsers className="text-white text-xl"></FaUsers></button>}
                                    </td>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;