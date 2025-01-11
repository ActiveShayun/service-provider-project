import { useContext, useState } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { AuthContext } from "../Auth-provider/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si";
import { Helmet } from "react-helmet-async";




const Register = () => {
    const navigate = useNavigate()
    const { handleCreateUser, setUser, loginWithGoggle, handleUserUpdated } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("");

    const handleRegister = e => {
        e.preventDefault()
        const form = new FormData(e.target)
        const photo = form.get('photo')
        const name = form.get('name')
        const email = form.get('email')
        const password = form.get('password')

      //  console.log(email, password, name, photo);

        // with regex password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setError("Password must have at least one uppercase letter ,one lowercase letter and 6 characters long")
        }
        else {
            setError("")
        }
        // clean setError
        setError("")

        handleCreateUser(email, password)
            .then(result => {
              //  console.log(result.user);
                handleUserUpdated({ displayName: name, photoURL: photo })
                setUser(result.user)
                toast.success("Register Successful!!!")
                navigate("/")
            })
            .catch(err => toast.error(err))
    }

    // login google
    const handleLoginWithGoogle = () => {
        loginWithGoggle()
            .then(result => {
                setUser(result.user)
               // console.log(result.user);
                toast.success("Sign in successful !")
                navigate("/")
            })
            .catch(err => {
                toast.error(err.message)
            })
    }
    return (
        <div className=" lg:w-[450px] mx-auto ">
            <Helmet><title>Register Page</title></Helmet>
            <form onSubmit={handleRegister}>
                <div >
                    <h2 className="text-3xl mb-5 text-center">Your Information Is Very Important For Me</h2>
                    <p className="mx-auto text-lg mb-4 text-center">Please Register </p>
                    <p className="flex justify-center text-3xl text-[#1bc0ea] mb-4"><span ><GiArchiveRegister /></span></p>
                </div>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="Url" name="photo" className="grow" placeholder="Enter your photo URL" required />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" name="name" className="grow" placeholder="Username" required />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name="email" className="grow" placeholder="Email" required />
                </label>

                <label className="input input-bordered flex items-center gap-2 mb-6">

                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" className="grow" required />

                    <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>

                </label>
                {/* error handling */}
                <p className="text-red-600 text-center mb-4">{error}</p>

                <input type="submit" value="Register" className="text-center mx-auto block bg-[#1bc0ea] w-full py-2 font-medium rounded-lg text-white" />
            </form>

            <div className="flex justify-center items-center mt-4 gap-3">

                <p className=""> Do You Have An Account ?
                    <Link className="hover:underline text-[#1bc0ea]" to={'/login'}> Login</Link></p>
            </div>
        </div>
    );
};

export default Register;