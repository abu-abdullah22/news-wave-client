import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useCallback, useEffect } from "react";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article/${id}`);
      return res.data;
    },
  });


  const updateViewCount = useCallback(async () => {
    await axiosSecure.patch(`/articles/${id}/incrementViewCount`);
  }, [axiosSecure, id]);

  useEffect(() => {
    updateViewCount();
  }, [updateViewCount]);


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
    <div className="container mx-auto my-20 p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-[500px] h-[300px] object-cover rounded-lg mb-4" />
      <p className="text-gray-600 mb-4 font-medium">By {article.author_name} | Publisher: {article.publisher}</p>
      <div className="mb-4">
        {article.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2">{tag}</span>
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-50">{article.description}</p>
    </div>
  );
};

export default ArticleDetails;
