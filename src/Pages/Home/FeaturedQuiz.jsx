const FeaturedQuiz = () => {
    return (
        <section className="py-12 bg-[#111827] text-white container mx-auto rounded-md my-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-8" style={{ fontFamily: 'Cursive, sans-serif' }}>Need some quiz fun in your life?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1F2937] rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Cursive, sans-serif' }}>What is Your Personality Type?</h3>
              <p className="text-lg mb-4">Discover your personality type with our fun quiz! Find out if you are an introvert, extrovert, or somewhere in between.</p>
              <a href="#" className="block text-black font-semibold bg-[#FFD2D7] hover:bg-[#F472B6] py-2 px-4 rounded">Take the Quiz</a>
            </div>
            <div className="bg-[#1F2937] rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Cursive, sans-serif' }}>Test Your Knowledge: Science Quiz</h3>
              <p className="text-lg mb-4">Put your science knowledge to the test with our challenging quiz! From physics to biology, how much do you really know?</p>
              <a href="#" className="block text-black font-semibold bg-[#A5BBD1] hover:bg-[#F472B6] py-2 px-4 rounded">Take the Quiz</a>
            </div>
          </div>
        </div>
      </section>
    );
};

export default FeaturedQuiz;