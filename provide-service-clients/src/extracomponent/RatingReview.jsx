import React, { useEffect, useState } from 'react';
import AxiosSecure from '../usehooks/AxiosSecure';

const RatingReview = () => {
    const useAxios = AxiosSecure()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchAllReview()
    }, [])
    const fetchAllReview = async () => {
        const { data } = await useAxios.get('/all-review')
        setReviews(data)
    }

    console.log(reviews);

    const generateStars = (rating, maxStars = 10) => {
        const fullStars = Math.floor(rating);
        const partialStar = rating - fullStars;
        const emptyStars = maxStars - fullStars - (partialStar >= 0.5 ? 1 : 0);

        let stars = '';
        stars += '★'.repeat(fullStars);
        if (partialStar >= 0.5) stars += '½';
        stars += '☆'.repeat(emptyStars);

        return stars;
    }

    return (
        <div className='rounded-md p-3'>
            <h2 className='text-2xl mb-4'>Clients Feedback</h2>
            {
                reviews?.map(review =>
                    <div className='mb-3' key={review._id}>
                        <p className=''>{review.review}</p>
                        <div>
                            <img src={review?.buyer?.photo} alt="" />
                            <p className='text-yellow-500'>
                              <span className='text-blue-400'>Ratings </span>
                                {generateStars(review.ratings, 10)}</p>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default RatingReview;