import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component"

import axios from 'axios';
const List = () => {
  const[employees,setEmployees]=useState([])
  const [emploading, setEmpLoading] = useState(false);
  const[filteredEmployee,setFilteredEmployee]=useState([])


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://employee-management-backend-2bs2.onrender.com/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name:emp.userId.name,
            dob:new Date(emp.dob).toLocaleDateString(),
 profileImage: (
  <img
    width={40}
    className="rounded-full"
    src={emp.userId.profileImage} // No need for `/uploads/...`
    alt="profile"
  />
),


            action: (
              <EmployeeButtons Id={emp._id}/>
            ),
          }));
          setEmployees(data);
          setFilteredEmployee(data);
          
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  const handlefilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter((emp) => 
      emp.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployee(records);
  };
  
  return (
    <div className='p-6'>
                <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp Name"
              onChange={handlefilter}
              className="px-4 py-0.5 border"
            
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div>
            <DataTable columns={columns} data={filteredEmployee} pagination/>
          </div>
    </div>
  )
}

export default List
