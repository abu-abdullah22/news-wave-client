const Testimonials = () => {
    return (
        <section className="py-12 bg-[#333333] mx-auto container my-20 rounded-md text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center  mb-8">User Experiences</h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="max-w-lg w-full bg-transparent rounded-lg shadow-2xl p-6 mb-6 md:mr-6">
              <p className="text-lg  mb-4">Great platform! I found valuable information here.</p>
              <p className="italic">- John</p>
            </div>
            <div className="max-w-lg w-full bg-transparent rounded-lg shadow-2xl p-6 mb-6 md:ml-6">
              <p className="text-lg  mb-4">Amazing articles! Keep up the good work.</p>
              <p className=" italic">- Smith</p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Testimonials;