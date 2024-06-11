import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import usePremium from "../../Hooks/usePremium";

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTitle, setSearchTitle] = useState('');
    const [isPremium] = usePremium();
    const [filterParams, setFilterParams] = useState({
        publisher: '',
        tags: ''
    });

    const { data: articles = [] } = useQuery({
        queryKey: ['allArticles', filterParams, searchTitle],
        queryFn: async () => {
            const res = await axiosSecure.get('/allArticles', {
                params: {
                    ...filterParams,
                    title: searchTitle
                }
            });
            return res.data;
        }
    });

    const handleTitleChange = (e) => {
        setSearchTitle(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterParams((prevParams) => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
      
    };

    return (
        <div className="xl:container xl:mx-auto mx-10 my-20">
            <div className="xl:flex justify-between">
            <form onSubmit={handleSearch} className="mb-10 flex items-center space-x-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={handleTitleChange}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Search
                </button>
            </form>
            <div className="mb-10 flex items-center space-x-4">
                <select
                    name="publisher"
                    value={filterParams.publisher}
                    onChange={handleFilterChange}
                    className="border p-2 rounded"
                >
                    <option value="">Publisher</option>
                    <option value="Athens">Athens</option>
                    <option value="Mercury">Mercury</option>
                    <option value="Prometheus">Prometheus</option>
                    <option value="Knowledge">Knowledge</option>
                   
                </select>
                <select
                    name="tags"
                    value={filterParams.tags}
                    onChange={handleFilterChange}
                    className="border p-2 rounded"
                >
                    <option value="">Tags</option>
                    <option value="science">Science</option>
                    <option value="technology">Technology</option>
                    <option value="health">Health</option>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
              
                </select>
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {articles.map((article) => (
                    <div 
                        key={article._id} 
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
                        <h2 className="text-xl font-bold dark:text-black mb-2">{article.title}</h2>
                        <p className="text-sm font-medium text-gray-600 mb-4">{article.publisher}</p>
                        <p className="text-gray-700 mb-4">{article.description.slice(0, 200)}...</p>
                        <Link to={`/article/${article._id}`}>
                            <button disabled={!isPremium && article.premium} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                Read More
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllArticles;
