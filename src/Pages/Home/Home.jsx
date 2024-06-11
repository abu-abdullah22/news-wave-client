import { useEffect, useState } from "react";
import AllPublisher from "./AllPublisher";
import SubscriptionPlans from "./SubscriptionPlans";
import TrendingArticles from "./TrendingArticles";
import SubscriptionModal from "./SubscriptionModal";
import usePremium from "../../Hooks/usePremium";
import Statistics from "./Statistics";
import UpcomingEvents from "./UpcomingEvents";


const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isPremium] = usePremium();

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
            <Statistics></Statistics>
            <UpcomingEvents></UpcomingEvents>
            {!isPremium && <SubscriptionModal showModal={showModal} setShowModal={setShowModal} />}
        </div>
    );
};

export default Home;