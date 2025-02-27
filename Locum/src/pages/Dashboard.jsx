import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()
    const { companyData, setcompanyData, setCompanyToken } = useContext(AppContext)

    // Function to logout
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setcompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (!companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])

    return (
        <div className='min-h-screen'>

            {/* Navbar */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt='' />
                    {companyData && (
                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
                            <div className='relative group'>
                                <img className='w-8 border rounded-full' src={companyData.image} alt='' />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="bg-gray-50 border-r border-gray-200 shadow-md">
                    <ul className="flex flex-col items-start pt-5 text-gray-800">
                        {/* Add Job Link */}
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 transition-colors duration-300 ${isActive ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600' : ''
                                }`
                            }
                            to="/dashboard/add-job"
                        >
                            <img className="w-5 h-5" src={assets.add_icon} alt="" />
                            <p className=" max-sm:hidden text-sm font-medium">Add Job</p>
                        </NavLink>

                        {/* Manage Jobs Link */}
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 transition-colors duration-300 ${isActive ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600' : ''
                                }`
                            }
                            to="/dashboard/manage-jobs"
                        >
                            <img className="w-5 h-5" src={assets.home_icon} alt="" />
                            <p className="max-sm:hidden text-sm font-medium">Manage Jobs</p>
                        </NavLink>

                        {/* View Applications Link */}
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 transition-colors duration-300 ${isActive ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600' : ''
                                }`
                            }
                            to="/dashboard/view-applications"
                        >
                            <img className="w-5 h-5" src={assets.person_tick_icon} alt="" />
                            <p className="max-sm:hidden text-sm font-medium">View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                {/* Content */}
                <div className="flex-1 h-full p-2 sm:p-5">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Dashboard
