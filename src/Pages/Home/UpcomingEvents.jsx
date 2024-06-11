const UpcomingEvents = () => {
    return (
        <section className="bg-gray-100 py-12 my-20 container mx-auto rounded-md">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-gray-950">Upcoming Events</h2>
          <div className="flex justify-center">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl dark:text-black font-semibold mb-2">Webinar: Future of Technology</h3>
              <p className="text-gray-600 italic mb-4">June 25, 2024</p>
              <p className="text-lg mb-4 dark:text-gray-900">Join us for an insightful webinar on the future of technology.</p>
              <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</a>
            </div>
            <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6 mb-6 ml-4">
              <h3 className="text-xl dark:text-black font-semibold mb-2">Workshop: Health and Wellness</h3>
              <p className="text-gray-600 italic mb-4">July 10, 2024</p>
              <p className="text-lg mb-4 dark:text-gray-900">Participate in our workshop focused on health and wellness.</p>
              <a href="#" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    );
};

export default UpcomingEvents;