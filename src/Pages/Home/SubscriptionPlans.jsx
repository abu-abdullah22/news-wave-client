import { Link } from "react-router-dom";

const SubscriptionPlans = () => {
  return (
    <div className="flex justify-center my-20 p-10 bg-gray-900 container mx-auto rounded-md">
      <div className="flex flex-col lg:flex-row gap-6 space-y-2 lg:space-y-0 lg:space-x-6">
        <div className="bg-gray-800 border-2 border-[#FFD2D7] text-white p-6 rounded-lg shadow-lg w-64 flex flex-col ">
          <h2 className="text-2xl font-semibold mb-4">Premium Individual</h2>
          <p className="mb-4 bg-[#FFD2D7] p-2 rounded-md text-black">FREE FOR 1 MONTH</p>
          <ul className="list-disc list-inside mb-4 text-left">
            <li className="mb-2">1 Premium account</li>
            <li className="mb-2">Cancel anytime</li>
            <li className="mb-2">15 hours/month of listening time from our audiobooks subscriber catalog</li>
          </ul>
          <div className="mt-auto">
          <Link to={'/subscription'}><button
            className="bg-[#FFD2D7] hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-full mt-auto"
          >
            Try free for 1 month
          </button></Link>
          </div>
        </div>
        <div className="bg-gray-800 border-2 border-[#FFC862] text-white p-6 rounded-lg shadow-lg w-64 flex flex-col ">
          <h2 className="text-2xl font-semibold mb-4">Premium Duo</h2>
          <p className="mb-4 bg-[#FFC862] p-2 rounded-md text-black">$14.99 PER MONTH</p>
          <ul className="list-disc list-inside mb-4 text-left">
            <li className="mb-2">2 Premium accounts</li>
            <li className="mb-2">Cancel anytime</li>
            <li className="mb-2">15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)</li>
          </ul>
        <div className="mt-auto">
        <Link to={'/subscription'}> <button
            className="bg-[#FFC862] hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-full mt-auto"
          >
            Get Premium Duo
          </button></Link>
        </div>
        </div>
        <div className="bg-gray-800 border-2 border-[#A5BBD1] text-white p-6 rounded-lg shadow-lg w-64 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Premium Family</h2>
          <p className="mb-4 bg-[#A5BBD1] p-2 rounded-md text-black">$16.99 PER MONTH</p>
          <ul className="list-disc list-inside mb-4 text-left">
            <li className="mb-2">Up to 6 Premium or Kids accounts</li>
            <li className="mb-2">Block explicit music</li>
            <li className="mb-2">Access to Spotify Kids</li>
            <li className="mb-2">Cancel anytime</li>
            <li className="mb-2">15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)</li>
          </ul>
        <div className="mt-auto">
        <Link to={'/subscription'}> <button
            className="bg-[#A5BBD1] hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-full mt-auto"
          >
            Get Premium Family
          </button></Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
