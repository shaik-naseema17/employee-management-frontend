import React, { useState } from 'react'
import {useAuth} from '../../context/authContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Add = () => {
    const {user}=useAuth();
    const[leave,setLeave]=useState({
        userId:user._id,

    })
    const handleChange=(e)=>{
        const{name,value}=e.target
        setLeave((prevState)=>({...prevState,[name]:value}))
    };
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(`https://employee-management-backend-2bs2.onrender.com/api/leave/add`, leave, {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          });
          if (response.data.success) {
              // Navigate based on user role
              if (user.role === "employee") {
                  navigate(`/employee-dashboard/leaves/${user._id}`);
              } else {
                  navigate(`/admin-dashboard/employees/leaves/${user._id}`);
              }
          }
      } catch (error) {
          if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
          }
      }
  }
  return (
    <div className='max-w-4x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
    <h2 className='text-2x1 font-bold mb-6'>Request for Leave</h2>
    <form onSubmit={handleSubmit}>
        <div className=' flex flex-col space-y-4'>
        <div>
            <label className='block text-sm font-medium text-gray-700'>
            Leave Type

            </label>
            <select
            name='leaveType'
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required>
            <option value="">Select Leave </option>
            <option value="Sick Leave">Sick Leave </option>
            <option value="Casual Leave">Casual Leave </option>
            <option value="Annual Leave">Annual Leave </option>

            </select>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/*from data*/}
        <div>
            <label className='block text-sm font-medium text-gray-700'>
            Form Date

            </label>
            <input
            type='date'
            name='startDate'
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
            />
        </div>
        {/*to data*/}
        <div>
            <label className='block text-sm font-medium text-gray-700'>
            To Date

            </label>
            <input
            type='date'
            name='endDate'
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
            />
        </div>

        </div>
        {/*  description */}
        <div>
            <label className='block text-sm font-medium text-gray-700'>
            Description

            </label>
            <textarea
            name='reason'
            placeholder='Reason'
            onChange={handleChange}
            className='w-full border border-gray-300'
            ></textarea>
        </div>

        </div>
        <button
        type='submit'
        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>
        Add Leave

        </button>
    </form>
      
    </div>
  )
}

export default Add
