import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const { data: articles = [] } = useQuery({
        queryKey: ['allArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allArticles');
            return res.data;
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 container mx-auto my-20">
            {articles.map((article) => (
                <div 
                    key={article.id} 
                    className={`relative p-4 border rounded-lg ${
                        article.premium ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white'
                    }`}
                >
                    {article.premium && (
                        <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                            Premium
                        </div>
                    )}
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                    <p className="text-sm font-medium text-gray-600 mb-4">{article.publisher}</p>
                    <p className="text-gray-700 mb-4">{article.description.slice(0, 200)}...</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Read More</button>
                </div>
            ))}
        </div>
    );
};

export default AllArticles;
