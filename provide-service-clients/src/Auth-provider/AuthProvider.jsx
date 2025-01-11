import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.init";
import toast from "react-hot-toast";
import AxiosSecure from "../usehooks/AxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const useAxios = AxiosSecure()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create user 
    const handleCreateUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login with email and password
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign with google 
    const googleProvider = new GoogleAuthProvider()
    const loginWithGoggle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // updated user
    const handleUserUpdated = (updated) => {
        return updateProfile(auth.currentUser, updated)

    }
    // onAuthStateChanged
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
          //  console.log(currentUser?.email);
            if (currentUser?.email) {
                const user = currentUser.email

                useAxios.post('/jwt', { user },
                    { withCredentials: true })
                    .then(res => {
                      //  console.log('login user', res.data)
                        setLoading(false)
                      //  console.log(user);
                    })
            }
            else {
                useAxios.post('/logout', {},
                    { withCredentials: true })
                    .then(res => {
                      //  console.log('logout user', res.data)
                        setLoading(false)
                    })
            }

        })
        return () => {
            unSubscribe()
        }
    }, [])

    // handle reset password
    const handlePasswordReset = (emailRef) => {
        const email = emailRef.current.value

        if (!email) {
            toast.error("please provide a valid email")
        }
        else {
            sendPasswordResetEmail(auth, email)
        }
    }

    // sign out 
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                toast.success("sign out successful")
            })
            .catch(err => toast.error(err.message))
    }

    const profile = {
        handleCreateUser,
        setUser,
        user,
        loading,
        setLoading,
        loginWithGoggle,
        loginWithEmailAndPassword,
        handlePasswordReset,
        handleLogOut,
        handleUserUpdated
    }

    return (
        <AuthContext.Provider value={profile}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;