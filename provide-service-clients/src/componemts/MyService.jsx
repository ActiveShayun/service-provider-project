import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth-provider/AuthProvider";
import axios from "axios";
import MyServiceTable from "./MyServiceTable";
import AxiosSecure from "../usehooks/AxiosSecure";
import { Helmet } from "react-helmet-async";


const MyService = () => {
    const [services, setServices] = useState([]);
    const { user, loading, setLoading } = useContext(AuthContext)
    const [search, setSearch] = useState('')
    const [email, setEmail] = useState(user?.email || '');
    const useAxios = AxiosSecure()

    useEffect(() => {
        setEmail(user?.email || '');
    }, [user]);

    useEffect(() => {
        fetchMyService()
    }, [search, email, services?.length])

    const fetchMyService = async () => {
        const {data} = await useAxios.get(`/my-service`, {
            params: { email, search },
        })
        setServices(data)
    }

  //  console.log(search);
   // console.log(services);
    return (
        <div>
            <Helmet><title>MyService</title></Helmet>
            {/* search functionality for finding service*/}
            <div className="md:w-[400px] mx-auto mb-4">
                <h2 className="text-4xl text-center mb-6">Your Exclusive Service</h2>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            type="text"
                            className="grow"
                            placeholder="Search" />
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
            </div>
            <div className="">
                <table className="table lg:w-5/6 mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    ID
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Service Title</th>
                            <th className=" hidden md:block">Service Category</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services?.map((service, idx) =>
                                <MyServiceTable
                                    fetchMyService={fetchMyService}
                                    setServices={setServices}
                                    idx={idx}
                                    key={service._id}
                                    service={service}
                                ></MyServiceTable>)
                        }

                    </tbody>

                </table>
            </div>



        </div>
    );
};

export default MyService;