import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardService from '../componemts/CardService';
import { Helmet } from 'react-helmet-async';
import AxiosSecure from '../usehooks/AxiosSecure';


const Service = () => {

    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [services, setService] = useState([])
    const useAxios = AxiosSecure()

    useEffect(() => {
        const fetchAllService = async () => {
            const { data } = await useAxios.get(`/service?filter=${filter}&search=${search}&sort=${sort}`)
            setService(data)
        }
        fetchAllService()
    }, [filter, search, sort])

    const refreshPage = () => {
        setFilter('')
        setSort('')
        setSearch('')
    }
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                <Helmet><title>All Service</title></Helmet>
                <div>
                    <select
                        name='category'
                        id='category'
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Web Development'>Web Development</option>
                        <option value='Graphics Design'>Graphics Design</option>
                        <option value='Digital Marketing'>Digital Marketing</option>
                    </select>
                </div>

                <form>
                    <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <input
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                            className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            name='category'
                            placeholder='Enter Job Title'
                            aria-label='Enter Job Title'
                        />

                        <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                            Search
                        </button>
                    </div>
                </form>
                <div>
                    <select
                        name='category'
                        id='category'
                        onChange={(e) => setSort(e.target.value)}
                        value={sort}
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Sort By Deadline</option>
                        <option value='dsc'>Descending Order</option>
                        <option value='asc'>Ascending Order</option>
                    </select>
                </div>
                <button onClick={refreshPage} className='btn'>Reset</button>
            </div>


            {
                services.length === 0 ?
                    <p className='text-2xl font-bold text-center mt-6'> No Data Found</p>
                    :
                    <div className="lg:w-[950px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center mt-8">
                        {
                            services?.map(service =>
                                <CardService
                                    key={service._id}
                                    service={service}
                                ></CardService>)
                        }
                    </div>


            }

        </div >
    );
};

export default Service;