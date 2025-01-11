import clients from '.././assets/clients.jpg'
import clients2 from '.././assets/03.jpg'
import clients3 from '.././assets/clients2.jpg'

const Latest = () => {
    return (
        <div className="mt-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-extrabold mb-4 text-blue-700">
            Latest News and Inspirational Stories
          </h3>
          <p className="text-gray-600 text-lg">
            Explore our latest blog posts, inspiring stories, and essential
            announcements to stay updated.
          </p>
        </div>
      
        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Featured Article */}
          <div className="lg:col-span-7">
            <div className="relative group">
              <img
                src={clients}
                alt="Featured Article"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-600 text-sm px-4 py-1 rounded-full">
                    Marketing
                  </span>
                  <span className="text-gray-300 text-sm">Feb 4, 2020</span>
                </div>
                <h3 className="text-3xl font-bold">
                  From a Small Startup to a Leading Global Agency in 10 Years
                </h3>
                <p className="text-gray-300">
                  Explore the inspiring journey of transforming challenges into
                  opportunities with impactful solutions.
                </p>
              </div>
            </div>
          </div>
      
          {/* Secondary Articles */}
          <div className="lg:col-span-5 space-y-8">
            {/* Article 1 */}
            <div className="flex gap-6 items-start">
              <img
                src={clients2}
                alt="Article 1"
                className="h-[120px] w-[120px] object-cover rounded-lg shadow-md"
              />
              <div>
                <h4 className="text-sm font-semibold text-blue-600">Finance</h4>
                <p className="text-sm text-gray-400">December 4, 2020</p>
                <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  How Google’s BERT Algorithm Affects Your Website Traffic
                </h3>
              </div>
            </div>
      
            {/* Article 2 */}
            <div className="flex gap-6 items-start">
              <img
                src={clients3}
                alt="Article 2"
                className="h-[120px] w-[120px] object-cover rounded-lg shadow-md"
              />
              <div>
                <h4 className="text-sm font-semibold text-blue-600">Operations</h4>
                <p className="text-sm text-gray-400">Sep 4, 2015</p>
                <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  How Google’s BERT Algorithm Affects Your Website Traffic
                </h3>
              </div>
            </div>
      
            {/* Article 3 */}
            <div className="flex gap-6 items-start">
              <img
                src={clients}
                alt="Article 3"
                className="h-[120px] w-[120px] object-cover rounded-lg shadow-md"
              />
              <div>
                <h4 className="text-sm font-semibold text-blue-600">Development</h4>
                <p className="text-sm text-gray-400">Oct 10, 2022</p>
                <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  10 Best Practices for Scalable Application Development
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    );
};

export default Latest;