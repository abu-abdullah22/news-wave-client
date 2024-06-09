import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [] } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premiumArticles');
            return res.data;
        }
    });

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {articles.map(article => (
                    <div key={article._id} className="border rounded-lg shadow-lg p-4 bg-white">
                        <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-sm font-medium text-gray-600 mb-4">{article.publisher}</p>
                        <p className="text-gray-700 mb-4">{article.description.slice(0, 200)}...</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Read More</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumArticles;
