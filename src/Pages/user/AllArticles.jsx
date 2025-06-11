import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import usePremium from "../../Hooks/usePremium";
import 'animate.css';

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
        <div className="xl:container xl:mx-auto mx-5 md:mx-10 my-20">
            <div className="xl:flex justify-between">
                <form onSubmit={handleSearch} className="mb-10 flex items-center space-x-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={handleTitleChange}
                        className="border p-2 rounded w-64"
                    />
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-full transition duration-200"
                    >
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <div
                        key={article._id}
                        className={`relative p-4 animate__animated animate__fadeInUp cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition duration-300 group border ${
                            article.premium ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white'
                        }`}
                    >
                        {article.premium && (
                            <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                                Premium
                            </div>
                        )}
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {article.title.length > 45 ? `${article.title.slice(0, 45)}...` : article.title}
                        </h2>
                        <p className="text-sm font-medium text-gray-600 mb-2">{article.publisher}</p>
                        <p className="text-gray-700 mb-4">
                            {article.description.length > 100
                                ? `${article.description.slice(0, 100)}...`
                                : article.description}
                        </p>
                        <Link to={`/article/${article._id}`}>
                            <button
                                disabled={!isPremium && article.premium}
                                className={` py-2 px-4 rounded-lg text-white font-semibold transition duration-300 ease-in-out shadow-md ${
                                    !isPremium && article.premium
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-900 to-pink-900 hover:from-indigo-700 hover:to-pink-700'
                                }`}
                            >
                                Read More →
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllArticles;
