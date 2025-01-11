import React from 'react';

const Clients = () => {
    return (
        <div className="mt-20">
        {/* Header Section */}
        <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          We Excel in Our Industry So That You Can Excel in Yours
        </h3>
      
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-gradient-to-r from-blue-500 to-blue-400 py-10 px-6 rounded-lg shadow-lg">
          {/* Card 1 */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-5 gap-5 hover:scale-105 transform transition-transform">
            <img
              className="w-20 h-20 object-cover rounded-full border-4 border-blue-400"
              src="https://media.istockphoto.com/id/1405156781/photo/businessman-and-woman-shake-hands-like-hello-in-office-closeup.jpg?s=612x612&w=0&k=20&c=TmocbWNBk3VMmPXVZ5R0YyrOS7SaFOpEbD5TuIQPAm4="
              alt="Happy Clients"
            />
            <div>
              <p className="text-4xl font-bold text-gray-800">3,050</p>
              <p className="text-xl font-semibold text-gray-600">Happy Clients</p>
            </div>
          </div>
      
          {/* Card 2 */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-5 gap-5 hover:scale-105 transform transition-transform">
            <img
              className="w-20 h-20 object-cover rounded-full border-4 border-blue-400"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGiMN283C4xJsP67zVoAwFk0R7aeH41Fxbw&s"
              alt="Skill Experts"
            />
            <div>
              <p className="text-4xl font-bold text-gray-800">570</p>
              <p className="text-xl font-semibold text-gray-600">Skill Experts</p>
            </div>
          </div>
      
          {/* Card 3 */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-5 gap-5 hover:scale-105 transform transition-transform">
            <img
              className="w-20 h-20 object-cover rounded-full border-4 border-blue-400"
              src="https://media.licdn.com/dms/image/v2/C5112AQEv9bKMI2sdiQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520101818936?e=2147483647&v=beta&t=yT81JugvykHzsHeI89V9YkuVkAOxC1aJ_loALWVIMhA"
              alt="Finished Projects"
            />
            <div>
              <p className="text-4xl font-bold text-gray-800">2,050</p>
              <p className="text-xl font-semibold text-gray-600">Finished Projects</p>
            </div>
          </div>
      
          {/* Card 4 */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-5 gap-5 hover:scale-105 transform transition-transform">
            <img
              className="w-20 h-20 object-cover rounded-full border-4 border-blue-400"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp9V5owIYt-YTgXMZPSYkrgqtr7Wiz9YYUbg&s"
              alt="More Posts"
            />
            <div>
              <p className="text-4xl font-bold text-gray-800">1,050</p>
              <p className="text-xl font-semibold text-gray-600">More Posts</p>
            </div>
          </div>
        </div>
      </div>
      
    );
};

export default Clients;