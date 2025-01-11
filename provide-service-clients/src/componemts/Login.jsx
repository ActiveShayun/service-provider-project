import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth-provider/AuthProvider";
import { Helmet } from "react-helmet-async";


const Login = () => {
    const emailRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state '/'
    const { loginWithEmailAndPassword, loginWithGoggle, handlePasswordReset, setUser } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')
      //  console.log(email, password);

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

        // login user
        loginWithEmailAndPassword(email, password)
            .then(result => {
              //  console.log(result.user);
                toast.success("Sign in successful")
                setUser(result.user)
                navigate(from, { replace: true })
            })
            .catch(err => toast.error(err.message))

    }

    // login google
    const handleLoginWithGoogle = () => {
        loginWithGoggle()
            .then(result => {
                setUser(result.user)
              //  console.log(result.user);
                toast.success("Sign in successful !")
                navigate("/")
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    return (
        <div>
           <Helmet><title>Login Page</title></Helmet>
            <div className=" lg:w-[450px] mx-auto ">
                <form onSubmit={handleLogin}>
                    <div >
                        <h2 className="text-3xl mb-5 text-center">Your Information Is Very Important For Me</h2>
                        <p className="mx-auto text-lg mb-4 text-center">Please Login </p>

                    </div>

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
                        <input type="email" ref={emailRef} name="email" className="grow" placeholder="Email" required />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mb-10 relative">
                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" className="grow" required />
                        <label onClick={() => handlePasswordReset(emailRef)} className="label absolute left-0 top-12 mb-4">

                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>

                    </label>
                    {/* error handling */}
                    <p className="text-red-600 text-center mb-4">{error}</p>

                    <input type="submit" value="Login" className="text-center mx-auto block bg-[#1bc0ea] w-full py-2 font-medium rounded-lg text-white" />
                </form>

                <div className="flex justify-center items-center mt-4 gap-3">
                    <button onClick={handleLoginWithGoogle}
                        className="flex items-center gap-3 border-2  border-[#1bc0ea]  p-2 rounded-lg  hover:bg-[#1bc0ea] hover:text-white">
                        <span className="text-blue-700"><SiGoogle /></span>
                        Sign In with Google</button>
                    <p className=""> New To The Wev Site ?
                        <Link className="hover:underline text-[#1bc0ea]"
                            to={'/register'}> Register</Link></p>
                </div>

            </div>
        </div>
    );
};

export default Login;