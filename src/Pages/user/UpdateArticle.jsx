import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const tagsOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
];

const UpdateArticle = () => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: publishers = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/publishers');
      return res.data;
    }
  });

  const { id } = useParams();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        publisher: article.publisher,
        tags: article.tags.map(tag => ({ value: tag, label: tag })),
      });
    }
  }, [article, reset]);

  const onSubmit = async (data) => {
    let imageUrl = article.image; 

    if (data.image.length > 0) { 
      const image = data.image[0];
      const formData = new FormData();
      formData.append('image', image);
      const res = await axiosPublic.post(image_hosting_api, formData);
      if (res.data.success) {
        imageUrl = res.data.data.display_url;
      }
    }

    const currentDateTime = new Date().toISOString();
    const articleItem = {
      title: data.title,
      image: imageUrl,
      description: data.description,
      publisher: data.publisher,
      tags: data.tags.map(tag => tag.value),
      author_email: user?.email,
      author_name: user?.displayName,
      author_image: user?.photoURL,
      postedDate: currentDateTime,
    };

    const articleRes = await axiosSecure.put(`/update/${id}`, articleItem);
    if (articleRes.data.modifiedCount > 0) {
      toast.success('Article has been updated successfully!');
      reset();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading article: {error.message}</div>;
  }

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl text-center my-10">Update Article</h2>
      <form className="space-y-8 md:w-1/2 my-20 mx-10 md:mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm">Title</label>
            <input {...register("title", { required: true })} type="text" placeholder="title" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
            {errors.title && <span className="text-sm">This field is required</span>}
          </div>

          <div className="form-control w-full my-6">
            <label className="block text-sm">Image</label>
            <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
            {errors.image && <span className="text-sm">This field is required</span>}
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea {...register('description', { required: true })} className="textarea textarea-bordered h-24" placeholder="description"></textarea>
            {errors.description && <span className="text-sm">This field is required</span>}
          </label>

          <div className="space-y-2">
            <label className="block text-sm">Publisher</label>
            <select {...register("publisher", { required: true })} className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600">
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher.name}>{publisher.name}</option>
              ))}
            </select>
            {errors.publisher && <span className="text-sm">This field is required</span>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Tags</label>
            <Controller
              name="tags"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={tagsOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.tags && <span className="text-sm">This field is required</span>}
          </div>
        </div>
        <input type="submit" className="btn border-none px-8 font-semibold rounded-md bg-violet-600 text-gray-50" value={'Update Article'} />
      </form>
    </div>
  );
};

export default UpdateArticle;
