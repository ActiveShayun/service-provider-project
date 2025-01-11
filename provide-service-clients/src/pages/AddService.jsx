import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../Auth-provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import AxiosSecure from '../usehooks/AxiosSecure';



const AddService = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const useAxios = AxiosSecure()

    const handleAddService = async (e) => {
        e.preventDefault();

        // Extract form data into an object
        const form = new FormData(e.target);
        const initialData = Object.fromEntries(form.entries());
        const { max_price, min_price, ...newService } = initialData;

        // Add additional fields to the service object
        newService.priceRange = {
            max_price: parseFloat(max_price),
            min_price: parseFloat(min_price)
        };
        newService.deadline = startDate;
        newService.reviewCount = 0; // Initialize review count
        newService.buyerInfo = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
        };

        try {
            // Make a POST request using the AxiosSecure instance
            const response = await useAxios.post(
                `/add-service?email=${user?.email}`,
                newService
            );

            // Show success toast and log response
            toast.success('Service added successfully');
            //  console.log('Response:', response);

            // Optionally navigate or clear the form
            navigate('/'); // Uncomment if redirection is needed
            // e.target.reset(); // Reset the form if necessary
        } catch (err) {
            // Show error toast and log error
            toast.error('Service post failed');
            //  console.error('Error:', err);
        }
    };



    return (
        <div className="card bg-[#F4F3F0] lg:w-[700px] bg-service mx-auto  shrink-0 shadow-2xl rounded-lg bg-register min-h-screen bg-cover bg-no-repeat bg-center relative z-40">
            <Helmet><title>Add service</title></Helmet>
            <form onSubmit={handleAddService} className="card-body  ">
                <div className="text-center  space-y-3 text-white  rounded-lg">
                    <h1 className="text-4xl font-bold">Add Your Best Service</h1>
                </div>
                {/* service img and title row */}
                <div className="lg:flex gap-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Service Image</span>
                        </label>
                        <input type="url" name="image" placeholder="Enter your img URL" className="py-3 px-3 rounded-lg input-bordered border border-gray-400 bg-transparent text-gray-300" required />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Service Title</span>
                        </label>
                        <input type="text" name="title" placeholder="Enter a movie title" className="py-3 px-3 rounded-lg input-bordered text-gray-300 bg-transparent border border-gray-300" required />
                        {/* error handling */}
                        {
                            // error && <p className="text-center text-yellow-500">{error}</p>
                        }
                    </div>

                </div>
                {/* Company name and wev site link row */}
                <div className="lg:flex gap-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Company Name</span>
                        </label>
                        <input type="text" name="company_name" placeholder="Enter your company name" className="py-3 px-3 rounded-lg input-bordered text-gray-300 bg-transparent border border-gray-300" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white ">Wev Site</span>
                        </label>
                        <input type="url" name="wevsite" placeholder="Enter your wev site link" className="p-3 rounded-lg px-2  border border-gray-300 bg-transparent text-gray-300" required />
                        {/* error handling */}
                        {
                            //error2 && <p className="text-center text-yellow-500">{error2}</p>
                        }
                    </div>

                </div>
                {/* deadline and price row */}
                <div className="lg:flex gap-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-white text-lg">Deadline </span>
                        </label>
                        <DatePicker
                            className='bg-transparent text-gray-300 border py-3 px-2 w-full rounded-lg'
                            selected={startDate}
                            onChange={(date) => setStartDate(date)} />

                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Price</span>
                        </label>
                        <div className='flex gap-2 items-center'>
                            <input type="number" name="min_price" placeholder="min_price"
                                className="py-3 px-3 lg:w-1/2 rounded-lg 
                      input-bordered border border-gray-400 

                      bg-transparent text-gray-300" required />
                            <input type="number" name="max_price" placeholder="max price" className="py-3 px-3 w-1/2 rounded-lg
                       input-bordered border border-gray-400
                        bg-transparent text-gray-300" required />
                        </div>
                    </div>

                </div>
                {/* service category and email row */}
                <div className="lg:flex gap-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-white text-lg">Category </span>
                        </label>
                        <select name="category" id=""
                            className="border-2 border-gray-400 
                        bg-transparent p-3 text-gray-400 rounded-lg
                         input-bordered">
                            <option disabled>Pick A Category</option>
                            <option value="Web Development">
                                Web Development</option>
                            <option value="Graphics Design">
                                Graphics Design</option>
                            <option value="Digital Marketing">
                                Digital Marketing</option>
                            <option value="Electrical services">
                                Electrical services</option>
                            <option value="Car Wash">
                                Car Wash</option>
                        </select>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Email</span>
                        </label>
                        <input
                            defaultValue={user?.email}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="py-3 px-3 rounded-lg input-bordered border border-gray-400 bg-transparent text-gray-300" required />
                    </div>

                </div>
                {/* description row */}
                <div>
                    <label className="label">
                        <span className="label-text text-lg text-white">Descriptions</span>
                    </label>
                    <textarea name="description" id="" rows='5' className="border bg-transparent w-full rounded-lg  p-4 text-gray-300" placeholder="Enter a descriptions"></textarea>
                    {/* error handling */}
                    {
                        //error3 && <p className="text-center text-yellow-500">{error3}</p>
                    }
                </div>
                <div className="form-control mt-4">
                    <button type='submit' className="btn bg-gradient-to-tr from-[#1bc0ea] to-gray-500 text-white">Add Service</button>
                </div>
            </form>

            <div className="w-full h-full bg-black opacity-80 absolute top-0 left-0 -z-10 rounded-md"></div>

        </div>
    );

};

export default AddService;