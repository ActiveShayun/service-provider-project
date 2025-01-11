import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../Auth-provider/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AxiosSecure from '../usehooks/AxiosSecure';


const UpdateMyservice = () => {
    const { id } = useParams()
    const [startDate, setStartDate] = useState(new Date());
    const [services, setService] = useState([])
    const [categories, setCategories] = useState('')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const useAxios = AxiosSecure()

    const { _id, bidCount, image, title, description, category, priceRange, company_name, email, wevsite, deadline, buyerInfo } = services 

    const handleUpdatedService = async (e) => {
        e.preventDefault()

        const form = new FormData(e.target);
        const initialData = Object.fromEntries(form.entries());
        const { max_price, min_price, ...newService } = initialData;
    
        newService.priceRange = { max_price, min_price };
        newService.deadline = startDate;
        newService.category = categories;
        newService.reviewCount = 0;
        newService.buyerInfo = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
        };
    
       // console.log('update service:', newService);
    
        try {
            const response = await useAxios.put(`/update-myService?email=${user?.email}&id=${id}`, newService);
           // console.log('Response:', response);
            toast.success('Updated successfully');
            navigate('/myService');
        } catch (err) {
          //  console.error('Error:', err);
            toast.error('Update failed');
        }

    }

    useEffect(() => {
        fetchMyService()
    }, [])

    const fetchMyService = async () => {
        const { data } = await useAxios.get(`/serviceDetails/${id}`)
        setService(data)
    }
   // console.log(services);

    return (
        <div className="card bg-[#F4F3F0] lg:w-[700px] bg-service mx-auto  shrink-0 shadow-2xl rounded-lg bg-register min-h-screen bg-cover bg-no-repeat bg-center relative z-40">
            {/* <Helmet><title>Update My service</title></Helmet> */}
            <form onSubmit={handleUpdatedService} className="card-body  ">
                <div className="text-center  space-y-3 text-white  rounded-lg">
                    <h1 className="text-4xl font-bold">Updated Your Service</h1>
                </div>
                {/* service img and title row */}
                <div className="lg:flex gap-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Service Image</span>
                        </label>
                        <input defaultValue={image}
                            type="url" name="image"
                            placeholder="Enter your img URL"
                            className="py-3 px-3 rounded-lg input-bordered border border-gray-400 bg-transparent text-gray-300" required />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white">Service Title</span>
                        </label>
                        <input defaultValue={title}
                            type="text" name="title" placeholder="Enter a movie title" className="py-3 px-3 rounded-lg input-bordered text-gray-300 bg-transparent border border-gray-300" required />
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
                        <input defaultValue={company_name}
                            type="text" name="company_name" placeholder="Enter your company name" className="py-3 px-3 rounded-lg input-bordered text-gray-300 bg-transparent border border-gray-300" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg text-white ">Wev Site</span>
                        </label>
                        <input defaultValue={wevsite}
                            type="url" name="wevsite" placeholder="Enter your wev site link" className="p-3 rounded-lg px-2  border border-gray-300 bg-transparent text-gray-300" required />
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
                            <input defaultValue={priceRange?.min_price}
                                type="number" name="min_price" placeholder="min_price"
                                className="py-3 px-3 lg:w-1/2 rounded-lg 
                             input-bordered border border-gray-400 
       
                             bg-transparent text-gray-300" required />
                            <input defaultValue={priceRange?.max_price}
                                type="number" name="max_price" placeholder="max price" className="py-3 px-3 w-1/2 rounded-lg
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
                        <select
                            onChange={(e) => setCategories(e.target.value)}
                            name="category" id=""
                            className="border-2 border-gray-400 
                               bg-transparent p-3 text-gray-400 rounded-lg
                                input-bordered" required>
                            <option value={category}>{category}</option>
                            <option value="Wev Development">
                                Wev Development</option>
                            <option value="Graphic Design">
                                Graphic Design</option>
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
                    <textarea defaultValue={description}
                        name="description" id="" rows='5' className="border bg-transparent w-full rounded-lg  p-4 text-gray-300" placeholder="Enter a descriptions"></textarea>
                    {/* error handling */}
                    {
                        //error3 && <p className="text-center text-yellow-500">{error3}</p>
                    }
                </div>
                <div className="form-control mt-4">
                    <button type='submit' className="btn bg-gradient-to-tr from-[#1bc0ea] to-gray-500 text-white">Update Service</button>
                </div>
            </form>

            <div className="w-full h-full bg-black opacity-80 absolute top-0 left-0 -z-10 rounded-md"></div>

        </div>
    );
};

export default UpdateMyservice;