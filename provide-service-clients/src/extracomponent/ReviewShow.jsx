import axios from "axios";


const ReviewShow = () => {
    const fetchAllReview  = async()=>{
             const {data} = axios.get(`${import.meta.env.VITE_API_URI}/`)
    }
    return (
        <div>
            
        </div>
    );
};

export default ReviewShow;