import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchEmployee = async (id) => {
    return await axios.get(`http://localhost:4000/employees/${id}`)
}

const EmpDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery(
        ['employees', id],
        () => fetchEmployee(id)
    )
    if (isLoading) {
        return <h1>Loading....</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }
    console.log(data);
    return (
        <div>
            <h1>Employee Details</h1>
            {
                <>
                    <h3>Name: {data?.data.emp_name}</h3>
                    <h3>Position: {data?.data.emp_position}</h3>
                    <h3>Age: {data?.data.emp_age}</h3>
                    <h3>Mobile Number: {data?.data.emp_mobile}</h3>
                    <h3>Salary: {data?.data.emp_salary}</h3>
                    <button onClick={() => navigate(-1)}>Go back</button>
                </>
            }
        </div>
    )
}

export default EmpDetails