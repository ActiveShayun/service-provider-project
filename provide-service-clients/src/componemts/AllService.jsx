import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import AxiosSecure from "../usehooks/AxiosSecure";

const AllService = () => {
    const [services, setService] = useState([])
    const [search, setSearch] = useState('')
    const useAxios = AxiosSecure()

    useEffect(() => {
        fetchAllService()
    }, [search])

    const fetchAllService = async () => {
        try {
            const { data } = await useAxios.get(`/home-service`, {
                params: { search }
            });
            setService(data);
            //  console.log(data)
            //  console.error('Response error:', error.response.data);
        }
        catch (err) {
            console.log(err);
        }

    };



    // console.log(services)

    return (
        <div className="mt-10 lg:mt-20">
            <div className="text-center md:w-4/5 mx-auto space-y-3 mb-5">
                <h2 className="text-4xl font-bold">Featured Services Section</h2>
                <p className="mb-4">
                    Discover the best we have to offer in our Featured Services section. Tailored to meet your unique needs, these services are designed to deliver exceptional results with precision and care. Whether you’re seeking innovative solutions, expert guidance, or personalized support, our offerings are crafted to help you achieve your goals efficiently and effectively. Explore now and experience top-tier services that prioritize your success!
                </p>

            </div>
            <div className="my-4">
                <label className="input md:w-2/5 mx-auto input-bordered flex items-center gap-2">
                    <input type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="grow"
                        placeholder="Search service" />
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
            <div className="lg:w-[950px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
                {
                    services?.map(service =>
                        <ServiceCard
                            key={service._id}
                            service={service}
                        ></ServiceCard>)
                }
            </div>

        </div>
    );
};

export default AllService;