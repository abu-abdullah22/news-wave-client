/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await axiosPublic.get('/trendingArticles');
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading trending articles: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplayspeed: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto my-20 p-4">
      <h2 className="text-4xl font-bold mb-4 text-center md:text-left">Trending Articles</h2>
      <Slider {...settings}>
        {articles.map((article) => (
          <div key={article._id} className="p-2">
            <div className="bg-white h-[400px] rounded-lg shadow-lg overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold dark:text-black">{article.title.slice(0,45)}...</h3>
                <p className="text-gray-600 font-medium">By {article.author_name}</p>
                <p className="text-gray-700">{article.description.substring(0, 75)}...</p>
                <Link to={`/article/${article._id}`}>
                  <button className="bg-gradient-to-r from-purple-900 to-pink-900 hover:opacity-90 text-white font-semibold py-2 px-3 mt-4 rounded shadow-md transition duration-200 ">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingArticles;
