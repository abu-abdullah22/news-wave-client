import { useEffect, useState } from "react";
import AllPublisher from "./AllPublisher";
import SubscriptionPlans from "./SubscriptionPlans";
import TrendingArticles from "./TrendingArticles";
import SubscriptionModal from "./SubscriptionModal";


const Home = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); 
  
      return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            <TrendingArticles></TrendingArticles>
            <AllPublisher></AllPublisher>
            <SubscriptionPlans></SubscriptionPlans>
            <SubscriptionModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default Home;