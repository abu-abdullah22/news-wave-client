import { useForm } from "react-hook-form";


const AddPublishers = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {

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
                        <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <input type="submit" className="w-full btn border-none px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50" value={'Sign Up'}></input>
            </form>
        </div>
    );
};

export default AddPublishers;