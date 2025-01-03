import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import ApplyJob from '../pages/ApplyJob';

const JobCard = ({ job }) => {

    const navigate = useNavigate()
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
            {/* Company Logo */}
            <div className="flex mb-4">
                <img
                    src={job.companyId.image}
                    alt={`${job.companyName || 'Company'} logo`}
                    className="h-12 w-12 object-contain"
                />
            </div>

            {/* Job Title */}
            <h4 className="text-lg font-bold mb-2 text-gray-800">{job.title}</h4>

            {/* Job Location and Level */}
            <div className="flex justify-between text-gray-500 text-sm mb-4">
                <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
                <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
            </div>

            {/* Job Description */}
            <p
                className="text-gray-600 text-sm mb-4"
                dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
            ></p>

            {/* Action Buttons */}
            <div className="flex justify-between">
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Apply Now
                </button>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default JobCard;
