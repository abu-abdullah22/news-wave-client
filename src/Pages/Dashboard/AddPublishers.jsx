import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY ;
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}` ;

const AddPublishers = () => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        const image = data.image[0]
		const formData = new FormData() // Create a new FormData object
		formData.append('image', image) // Append the photo file to the FormData object
        console.log(image, formData);
        const res =  await axiosPublic.post(image_hosting_api, formData) ;
        console.log(res);
        if(res.data.success){
         const publisherItem = {
           name : data.name , 
           image: res.data.data.display_url ,
         }
         const pubRes = await axiosSecure.post('/publishers', publisherItem)
         if(pubRes.data.insertedId){
         toast.success('Publisher has been added successfully!')
         reset() ;
         }
        } 
       }
    return (
        <div>
            <h2 className="text-3xl text-center"> Add Publisher</h2>
            <form className="space-y-8 md:w-1/2 my-20 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm">Publisher Name</label>
                        <input  {...register("name", { required: true })} type="text" name="name" id="name" placeholder="publisher name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        {errors.name && <span className="text-sm">This field is required</span>}
                    </div>

                    <div className="form-control w-full my-6">
                        <label htmlFor="logo" className="block text-sm">Publisher Logo</label>
                        <input {...register('image', { required: true })}  type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <input type="submit" className="w-full btn border-none px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50" value={'Add Publisher'}></input>
            </form>
        </div>
    );
};

export default AddPublishers;