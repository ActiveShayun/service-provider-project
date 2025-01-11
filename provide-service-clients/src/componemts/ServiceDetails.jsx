import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { AuthContext } from '../Auth-provider/AuthProvider';
import toast from 'react-hot-toast';
import AxiosSecure from '../usehooks/AxiosSecure';
import { Helmet } from 'react-helmet-async';
import RatingReview from '../extracomponent/RatingReview';
import CountUp from 'react-countup';


const ServiceDetails = () => {
    const { user } = useContext(AuthContext)
    const [services, setServices] = useState([])
    const [rating, setRating] = useState(0)
    const [error, setError] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams()
    const useAxios = AxiosSecure()
 //   console.log(id);
    const navigate = useNavigate()

    useEffect(() => {
        fetchSingleService()
    }, [id])

    const fetchSingleService = async () => {
        const { data } = await useAxios.get(`/serviceDetails/${id}`)
        setServices(data)
    }
   // console.log(services);
    const { _id, reviewCount, image, title, description, category, priceRance, company_name, email, wevsite, deadline, buyerInfo } = services
console.log(priceRance?.max_price);
   // console.log(rating);
   // console.log(services);

    // add review
    const submitReview = async (e) => {
        e.preventDefault()
        // rating validation
       // console.log(rating);
        if (rating === 0) {
            return setError('please select rating')
        } else {
            setError('')
        }

        const form = new FormData(e.target)
        const initialData = Object.fromEntries(form.entries())
      //  console.log(initialData);


        const { ...newReview } = initialData
        newReview.deadline = startDate
        newReview.ratings = rating
        newReview.email = user?.email
        newReview.title = title
        newReview.buyerEmail = buyerInfo?.email
        newReview.JobId = _id
        newReview.Buyer = {
            name: buyerInfo?.name,
            photo: buyerInfo?.photo
        }

        // review add/post method
        try {
            await useAxios.post(`/addReview`, newReview)
            toast.success('Service review successful')
        }
        catch (err) {
            toast.error(err)
        }
    }

    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    return (
        <div className="mx-auto p-8 bg-gradient-to-r from-purple-800 via-gray-900 to-black text-white rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12 ">
            {/* Service Details Section */}
            <Helmet><title>Service Details</title></Helmet>
            <div className="space-y-6 pb-8">
                <h1 className="text-4xl font-extrabold text-blue-400">{title}</h1>
                <h2 className="text-2xl font-semibold">{company_name}</h2>
                <p className="text-lg text-gray-300">{category}</p>
                <p className="leading-relaxed">{description}</p>
                <p className="text-xl font-semibold text-yellow-300">
                    Price Range: {priceRance?.min_price} - {priceRance?.max_price} $
                </p>
                <p className="text-sm">
                    Website:{" "}
                    <Link
                        rel="noopener noreferrer"
                        className="underline text-blue-400 hover:text-blue-500 transition duration-200"
                    >
                        {wevsite}
                    </Link>
                </p>
                <p className="text-sm">Review Count:
                    <span className='ml-1'>
                        <CountUp
                            duration={5}
                            delay={2}
                            end={reviewCount} />
                    </span>
                </p>
                {deadline && (
                    <p className="text-sm">
                        Deadline: <span className="text-yellow-400">{format(new Date(deadline), "P")}</span>
                    </p>
                )}
                <div className="overflow-hidden rounded-lg shadow-md mt-4 ">
                    <img className="w-full h-auto object-cover" src={image} alt="Service" />
                </div>
                {/* rating review component */}
                <div className='relative top-7 block mt-20'>
                    <RatingReview />
                </div>
            </div>

            {/* Review and Service Provider Section */}
            <div className="space-y-12">
                {/* Review Section */}
                <div>
                    <h3 className="text-3xl font-bold text-green-400">Leave a Review</h3>
                    <form onSubmit={submitReview} className="space-y-6 mt-6">
                        <div>
                            <label className="block text-lg mb-2">Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                className="w-full p-3 rounded-md text-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Deadline</label>
                            <DatePicker
                                className="w-full p-3 rounded-md text-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Review</label>
                            <textarea
                                name='review'
                                rows="4"
                                className="w-full p-3 rounded-md text-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Write your review..."
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Rating</label>
                            <ReactStars count={10} onChange={ratingChanged} size={30} activeColor="#FFD700" />
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-lg font-bold rounded-lg text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* Enhanced Service Provider Section */}
                <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Service Provider</h2>
                    <div className="flex items-center gap-6">
                        <img
                            className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
                            src={buyerInfo?.photo}
                            alt="Service Provider"
                        />
                        <div>
                            <p className="text-lg font-medium text-white mb-1">
                                Name: <span className="text-blue-300">{buyerInfo?.name}</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Email:{" "}
                                <Link
                                    to={``}
                                    className="text-blue-400 underline hover:text-blue-500 transition duration-200"
                                >
                                    {buyerInfo?.email}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-md shadow-inner">
                        <h3 className="text-lg font-semibold text-white mb-2">Contact the Provider</h3>
                        <p className="text-sm text-gray-200">
                            For further details about this service, feel free to reach out to the provider directly via email or other contact methods.
                        </p>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default ServiceDetails;