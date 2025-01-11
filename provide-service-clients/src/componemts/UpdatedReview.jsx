import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Auth-provider/AuthProvider";
import DatePicker from "react-datepicker";
import ReactStars from "react-rating-stars-component";
import { Helmet } from "react-helmet-async";
import AxiosSecure from "../usehooks/AxiosSecure";


const UpdatedReview = () => {
    const { setLoading, user } = useContext(AuthContext)
    const [rating, setRating] = useState()
    const [error, setError] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams()
  //  console.log(id);
    const [reviews, setReviews] = useState({})
    const navigate = useNavigate()
    const useAxios = AxiosSecure()

    useEffect(() => {
        fetchMyReview()
    }, [])
    const fetchMyReview = async () => {
        try {
            const { data } = await useAxios.get(`/update-review/${id}`)
            setReviews(data)
            fetchMyReview()
            setLoading(false)
        }
        catch (err) {
            toast.error(err)
        }
    }

    const handleUpdateReview = async e => {
        e.preventDefault()
            // rating validation
         //   console.log(rating);
            if (!rating) {
                return setError('please select rating')
            } else {
                setError('')
            }
            
    
        const form = new FormData(e.target)
        const initialData = Object.fromEntries(form.entries())
      //  console.log(initialData);
      

    
        const { ...newReview } = initialData
        newReview.title = reviews?.title
        newReview.deadline = startDate
        newReview.ratings = rating

       // console.log(newReview);

        try {
            await useAxios.put(`/update-myReview/${id}`, newReview)
            toast.success('review updated successful')
            navigate('/myReview')
        }
        catch (err) {
            toast.error(err)
        }
    }

    // updated rating and set state
    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

  // console.log(reviews);
    return (
        <div>
              <Helmet><title>Update Review </title></Helmet>
            <div className="card bg-base-100 w-full max-w-lg mx-auto shrink-0 shadow-2xl">
          
                <form onSubmit={handleUpdateReview} className="card-body">
                    {/* service title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input defaultValue={reviews?.title}
                            type="text" name="title"
                            placeholder="service title"
                            className="input input-bordered" disabled />
                    </div>
                    {/* review */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Review</span>
                        </label>
                        <input defaultValue={reviews?.review}
                            type="text" name="review"
                            placeholder="your review" className="input input-bordered" required />
                    </div>

                    {/* user email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input defaultValue={reviews?.email}
                            type="email" name="email"
                            placeholder="your email" className="input input-bordered" required />
                    </div>

                    {/* deadline and review  */}
                    <div className='mb-4 w-full'>
                        <span className='block text-lg mb-2'>Deadline</span>
                        <DatePicker
                            className='bg-transparent text-gray-300 border py-3 px-2 w-[450px] rounded-lg text-gray-500'
                            selected={startDate}
                            onChange={date => setStartDate(date)} />
                    </div>

                    {/* rating */}
                    <div>
                        <p className='text-lg'>Please select the rating</p>
                        <ReactStars
                            color='#1BC0EA'
                            count={10}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#E24B4E"
                        />
                        {/* rating error handling */}
                        {
                            <p className='text-red-800'>{error}</p>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-tr from-[#1BC0EA] to-yellow-500 text-white">Update Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatedReview;