import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { QueryClient } from "@tanstack/react-query";

const axiosPublic = useAxiosPublic();

export const articleDetailsLoader = (queryClient) => async ({ params }) => {
  const { id } = params;
  await queryClient.prefetchQuery(['article', id], async () => {
    const res = await axiosPublic.get(`/articles/${id}`);
    return res.data;
  });
  return { id };
};
