import React from 'react';

const MeetOurTeam = () => {
    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 mt-20 text-white py-20 rounded-md">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-8">Meet Our Partners</h2>
                <p className="text-lg mb-12 max-w-2xl mx-auto">
                    Our success is powered by partnerships with industry leaders offering
                    cutting-edge IT solutions and services.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Partner Card 1 */}
                    <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXF8gU-6K0FyH5K6iKT14p4uldvM_SzCPwA&s"
                            alt="CloudTech Logo"
                            className="w-[200px] object-cover mx-auto  mb-4 h-24 rounded-md"
                        />
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                            CloudTech
                        </h3>
                        <p className="text-sm mb-4">
                            Specializes in scalable cloud infrastructure, ensuring secure and
                            reliable services for businesses.
                        </p>
                        <a href="#" className="text-blue-500 hover:underline text-sm">
                            Visit Website
                        </a>
                    </div>

                    {/* Partner Card 2 */}
                    <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxr7IiHbG3mYlNDa2hy6XyzKJB9pA8nIog9Q&s"
                            alt="CyberSecure Logo"
                            className="w-[200px] mx-auto object-cover mb-4 h-24 rounded-md"
                        />
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                            CyberSecure
                        </h3>
                        <p className="text-sm mb-4">
                            Provides state-of-the-art cybersecurity solutions, protecting
                            against evolving threats.
                        </p>
                        <a href="#" className="text-blue-500 hover:underline text-sm">
                            Visit Website
                        </a>
                    </div>

                    {/* Partner Card 3 */}
                    <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9r0mdSZz-sZ2XPyjNCSsS-TKIOnqu3HP-A&s"
                            alt="AI Dynamics Logo"
                            className="w-[200px] object-cover mx-auto mb-4 h-24 rounded-md"
                        />
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                            AI Dynamics
                        </h3>
                        <p className="text-sm mb-4">
                            Innovates with AI-powered analytics and automation, optimizing IT
                            operations for our clients.
                        </p>
                        <a href="#" className="text-blue-500 hover:underline text-sm">
                            Visit Website
                        </a>
                    </div>

                    {/* Partner Card 4 */}
                    <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
                        <img
                            src="https://netsecure.es/uploads/noticias/666/directiva_NIS2.jpg"
                            alt="NetSecure Logo"
                            className="w-[200px] object-cover mx-auto mb-4 h-24 rounded-md"
                        />
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                            NetSecure
                        </h3>
                        <p className="text-sm mb-4">
                            Ensures robust network security solutions, offering advanced
                            firewall and intrusion detection systems.
                        </p>
                        <a href="#" className="text-blue-500 hover:underline text-sm">
                            Visit Website
                        </a>
                    </div>

                    {/* Partner Card 5 */}
                    <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
                        <img
                            src="https://ittechcert.com/wp-content/uploads/2024/03/google-DevOps-pro-768x432.png"
                            alt="DevOpsPro Logo"
                            className="w-[200px] object-cover mx-auto rounded-md mb-4 h-24"
                        />
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                            DevOpsPro
                        </h3>
                        <p className="text-sm mb-4">
                            Leading in DevOps automation tools, helping us streamline software
                            delivery and deployment.
                        </p>
                        <a href="#" className="text-blue-500 hover:underline text-sm">
                            Visit Website
                        </a>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default MeetOurTeam;