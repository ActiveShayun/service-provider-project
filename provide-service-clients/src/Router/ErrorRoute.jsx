import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorRoute = () => {
    const navigate = useNavigate()
    const backHome = () => {
        navigate('/')
    }
    return (
        <div>
            <div>
                <img className='mx-auto ' src="https://miro.medium.com/v2/resize:fit:924/1*ZvwdIQkolJ2z1MILFrQjOQ.jpeg" alt="" />
                <button onClick={backHome}
                    className='p-3 rounded-md bg-red-700 text-white block mx-auto'>Back Home</button>
            </div>
        </div>
    );
};

export default ErrorRoute;