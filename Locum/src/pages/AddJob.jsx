import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState(''); // Initialize empty
    const [category, setCategory] = useState(''); // Initialize empty
    const [level, setLevel] = useState('');      // Initialize empty
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const { backendUrl, companyToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // Extract the job description from Quill
            const description = quillRef.current.root.innerHTML;

            // Validate the dropdown selections before submission
            if (!category || !location || !level) {
                return toast.error('Please select all required fields.');
            }

            // Send the job posting data to the backend
            const { data } = await axios.post(
                `${backendUrl}/api/company/post-job`,
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success(data.message || 'Job posted successfully!');
                // Reset form fields
                setTitle('');
                setSalary(0);
                setLocation('');
                setCategory('');
                setLevel('');
                quillRef.current.root.innerHTML = '';
            } else {
                toast.error(data.message || 'Failed to post the job. Please try again.');
            }
        } catch (error) {
            console.error('Error while posting job:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>
            <div className='w-full'>
                <p className='mb-2'>Job Title</p>
                <input
                    type='text'
                    placeholder='Type Here'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>
            <div className='w-full max-w-lg'>
                <p className='my-2'>Job Description</p>
                <div ref={editorRef}></div>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Job Category</p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                        required
                    >
                        <option value=''>Select Category</option>
                        {JobCategories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Job Location</p>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                        required
                    >
                        <option value=''>Select Location</option>
                        {JobLocations.map((loc, index) => (
                            <option key={index} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Job Level</p>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                        required
                    >
                        <option value=''>Select Level</option>
                        <option value='Beginner Level'>Beginner Level</option>
                        <option value='Intermediate Level'>Intermediate Level</option>
                        <option value='Senior Level'>Senior Level</option>
                    </select>
                </div>
            </div>
            <div>
                <p className='mb-2'>Job Salary</p>
                <input
                    min={0}
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
                    onChange={(e) => setSalary(e.target.value)}
                    type='number'
                    value={salary}
                    placeholder='2500'
                />
            </div>
            <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
        </form>
    );
};

export default AddJob;
