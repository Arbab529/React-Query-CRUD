import React from 'react'
import EmpForm from '../Components/EmpForm'
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

// GET
const fetchEmployee = async () => {
    return await axios.get('http://localhost:4000/employees')
}

// DELETE
const deleteEmployee = async (id) => {
    return await axios.delete(`http://localhost:4000/employees/${id}`)
}

// POST
const addEmployee = async (data) => {
    return await axios.post('http://localhost:4000/employees', data)
}

// // UPDATE
// const fetchSingleEmployee = async (employeeID) => {
//     return await axios.get(`http://localhost:4000/employees/${employeeID}`)
// }
// const updateEmployee = async (updatedPost) => {
//     return await axios.put(`http://localhost:4000/employees/${updatedPost.id}`, updatedPost)
// }

// Component
const Employees = () => {

    // Hooks
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Get Client
    const { data, isLoading, isError, error } = useQuery({
        queryKey: "employees",
        queryFn: fetchEmployee,
    })

    // Delete Employee
    const deleteMutationFn = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries('employees')
        }
    })
    const handleDelete = (id) => {
        deleteMutationFn.mutate(id);
        console.log('Employee Deleted');
    }

    //Add Employee
    const addMutationFn = useMutation({
        mutationFn: addEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries('employees')
        }
    })
    const handleAddEmployee = (employee) => {
        addMutationFn.mutate({ ...employee });
    }

    // Update Employee
    // const { id } = useParams();
    // const { data: uData, isLoading: uIsLoading, isError: uIsError, error: uError } = useQuery(
    //     ['employees', id],
    //     fetchSingleEmployee(id)
    // )

    // Main Page Loaders
    if (isLoading) {
        return <h1>Loading.......</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    // console.log(uData?.data);
    // Body
    return (
        <div>
            <EmpForm onSubmit={handleAddEmployee} initialValue={{}}/>
            <table border={1} cellPadding={5} cellSpacing={5}>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Employee Position</th>
                        <th>Employee Age</th>
                        <th>Employee phone</th>
                        <th>Employee Salary</th>
                        <th>Settings</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map((employee) => {
                        return (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.emp_name}</td>
                                <td>{employee.emp_position}</td>
                                <td>{employee.emp_age}</td>
                                <td>{employee.emp_mobile}</td>
                                <td>{employee.emp_salary}</td>
                                <td>
                                    <button onClick={() => navigate(`/employee/${employee.id}`)}>View</button>
                                    <button onClick={() => navigate(`/employee/${employee.id}/edit`)}>Edit</button>
                                    <button onClick={() => handleDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Employees