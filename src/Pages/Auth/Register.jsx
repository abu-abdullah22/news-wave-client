import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {
    const {createUser, updateUserProfile, googleSignIn} = useAuth() ;
    const navigate = useNavigate() ;
    const axiosPublic = useAxiosPublic() ;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        try {
            const res = await createUser(data.email, data.password);
            console.log(res.data);
    
            await updateUserProfile(data.name, data.photo);
    
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photo,
            };
    
            const response = await axiosPublic.post('/users', userInfo);
            console.log('User added to the database:', response.data);
    
            if (response.data.insertedId) {
                toast.success('Sign Up Successful!');
                navigate('/')
            } 
        } catch (error) {
            console.log('Error during sign up:', error);
            toast.error(error.message || 'Sign up failed. Please try again.');
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
            const res = await googleSignIn();
            const user = res.user;
    
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            };
    
            const existingUserResponse = await axiosPublic.get(`/users/${user.email}`);
            
            if (existingUserResponse.data) {
                toast.success('Google log in Successful!');
                navigate('/');
            } else {
                const response = await axiosPublic.post('/users', userInfo);
    
                if (response.data.insertedId) {
                    toast.success('Google log in Successful!');
                    navigate('/');
                }
            }
        } catch (error) {
            toast.error(error.message || 'Google log in failed. Please try again.');
        }
    }


    return (
        <div className="w-full my-20 container mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Sign Up </h2>
            <div className="my-6 space-y-4">
                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex btn items-center justify-center w-full p-4 space-x-4 border rounded-md  dark:border-gray-600 focus:dark:ring-violet-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm">Name</label>
                        <input  {...register("name", { required: true })} type="text" name="name" id="name" placeholder="name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        {errors.name && <span className="text-sm">This field is required</span>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Email address</label>
                        <input  {...register("email", { required: true })} type="email" name="email" id="email" placeholder="email" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        {errors.email && <span className='text-sm'>This field is required</span>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm">Password</label>
                        </div>
                        <input {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                            validate: {
                                hasUpperCase: value => /[A-Z]/.test(value) || "Password must have at least one uppercase letter",
                                hasLowerCase: value => /[a-z]/.test(value) || "Password must have at least one lowercase letter",
                                hasNumeric: value => /[0-9]/.test(value) || "Password must have at least one numeric character"
                            }
                        })} type="password" name="password" id="password" placeholder="password" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                         {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="photo" className="block text-sm">Photo URL</label>
                        <input {...register("photo", { required: true })} type="text" name="photo" id="photo" placeholder="photo url" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        {errors.photo && <span className='text-sm'>This field is required</span>}
                    </div>
                </div>
                <input type="submit" className="w-full btn border-none px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50" value={'Sign Up'}></input>
            </form>
            <p>Already have an account? <span className="underline"><Link to={'/login'}>Login</Link></span></p>
        </div>
    );
};

export default Register;