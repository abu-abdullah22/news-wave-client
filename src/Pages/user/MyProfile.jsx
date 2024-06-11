import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const MyProfile = () => {
    const { user, setUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.displayName || '',
            photoURL: user?.photoURL || '',
        }
    });

    const onSubmit = async (data) => {
        try {
            await updateUserProfile(data.name, data.photoURL);
            const response = await axiosSecure.patch(`/users/${user.email}`, data);
            if (response.data) {
                setUser({
                    ...user,
                    ...data,
                });
                toast.success("Your profile has been updated successfully!")
            }
        } catch (error) {
            console.error('Error updating profile', error);
            toast.error('Error updating profile')
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg my-20">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        id="photoURL"
                        {...register('photoURL')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
             
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default MyProfile;
