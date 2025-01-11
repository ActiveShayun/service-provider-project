import axios from "axios";
import toast from "react-hot-toast";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AxiosSecure from "../usehooks/AxiosSecure";


const MyServiceTable = ({ service, idx, fetchMyService, setServices }) => {
    const { title, company_name, category, buyerInfo, _id } = service
    const navigate = useNavigate()
    const useAxios = AxiosSecure()

    // go for updated route func...
    const handleUpdate = async (id) => {
        Swal.fire({
            title: "Do you want to update the service?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                navigate(`/update-myService/${id}`)
            } else if (result.isDenied) {
                Swal.fire("Changes are not update", "", "info");
            }
        })
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to delete the service?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (result.isConfirmed) {
            try {
                const { data } = await useAxios.delete(`/service-delete/${id}`); // Asynchronous API Call
                toast.success("Delete successful");

                // Fetch updated data after deletion
                fetchMyService(); // Optional: If you want to refetch all data

                // Or directly update state without refetching:
                setServices((prevServices) => prevServices.filter(service => service._id !== id));

              //  console.log('Deleted Data:', data);
            } catch (err) {
              //  console.error('Error deleting service:', err);
                toast.error("Failed to delete service");
            }
        } else {
            Swal.fire("Changes are not updated", "", "info");
        }
    };


    return (
        <>
            <tr>
                <th>
                    <label>
                        {idx + 1}
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={buyerInfo?.photo} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{buyerInfo?.name}</div>
                            <div className="text-sm opacity-50">{company_name}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {title}
                    <br />
                </td>
                <td className="hidden md:block">{category}</td>
                <th>
                    <Link onClick={() => handleDelete(_id)}
                        className="btn btn-ghost btn-xs text-xl">
                        <CiCircleRemove /></Link>
                </th>
                <th>
                    <Link onClick={() => handleUpdate(_id)}
                        className="btn btn-ghost btn-xs text-xl">
                        <CiEdit /></Link>
                </th>
            </tr>

        </>
    );
};

export default MyServiceTable;