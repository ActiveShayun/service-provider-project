import axios from "axios";
import toast from "react-hot-toast";
import { CiBookmarkRemove, CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AxiosSecure from "../usehooks/AxiosSecure";


const ReviewCard = ({ review, setReviews, fetchMyReview }) => {
    const navigate = useNavigate()
  //  console.log(review);
    const useAxios = AxiosSecure()
    
    // updated  review 
    const handleUpdate = id => {
       // console.log(id);
        Swal.fire({
            title: "Do you want to update the review?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                navigate(`/update-myReview/${id}`)
            } else if (result.isDenied) {
                Swal.fire("Changes are not update", "", "info");
            }
        });
    }
    // delete  review 
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to update the service?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (result.isConfirmed) {
            try {
                const { data } = await useAxios.delete(`/review-delete/${id}`); // Asynchronous API Call
                toast.success("Delete successful");

                // Fetch updated data after deletion
                fetchMyReview(); // Optional: If you want to refetch all data

                // Or directly update state without refetching:
                setReviews((prevServices) => prevServices.filter(service => service._id !== id));

              // console.log('Deleted Data:', data);
            } catch (err) {
               // console.error('Error deleting service:', err);
                toast.error("Failed to delete service");
            }
        } else {
            Swal.fire("Changes are not updated", "", "info");
        }
    };

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
        <div className="card bg-white md:w-96 w-full mb-6 mx-auto shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body p-6">
                <h2 className="card-title text-2xl font-bold text-gray-800 mb-2">
                    {review?.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                    {review?.review}
                </p>
                <div className="card-actions flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">{generateStars(review?.ratings)}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleUpdate(review._id)}
                            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            title="Edit Review"
                        >
                            <CiEdit size={20} />
                        </button>
                        <button
                            onClick={() => handleDelete(review._id)}
                            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                            title="Delete Review"
                        >
                            <CiBookmarkRemove size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ReviewCard;