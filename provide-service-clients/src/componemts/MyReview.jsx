import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth-provider/AuthProvider";
import ReviewCard from "./ReviewCard";
import Loader from "../Router/Loader";
import { Helmet } from "react-helmet-async";
import AxiosSecure from "../usehooks/AxiosSecure";



const MyReview = () => {
    const { user, setLoading, loading } = useContext(AuthContext)
    const [reviews, setReviews] = useState([])
    const [search, setSearch] = useState('')
    const useAxios = AxiosSecure()

    useEffect(() => {
        fetchMyReview()
    }, [user?.email])

    const fetchMyReview = async () => {
        const { data } = await useAxios.get(`/my-review?email=${user?.email}`)
        setReviews(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchMyReview()
    }, [user])

  //  console.log(reviews);

    return (
        <div>
         <Helmet><title>My Review</title></Helmet>
            <h2 className="text-3xl text-center mb-4">Your Experience, Our Commitment Service Reviews</h2>
            <div className="w-[300px] mx-auto mb-4">
                <label className="input input-bordered flex items-center gap-2">
                    <input onChange={e => setSearch(e.target.value)}
                        type="text"
                        className="grow" placeholder="Search your review" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>
            {
                reviews?.length === 0 ?
                    <div>
                        <h3 className="text-2xl text-center mb-4">No Data Found</h3>
                        <Loader />
                    </div>
                    :
                    <div>
                        {
                            reviews?.map(review =>
                                <ReviewCard
                                    fetchMyReview={fetchMyReview}
                                    key={review._id}
                                    review={review}
                                    setReviews={setReviews}
                                />)
                        }
                    </div>
            }

        </div>
    );
};

export default MyReview;