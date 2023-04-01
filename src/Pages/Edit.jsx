import React from 'react'
import EmpForm from '../Components/EmpForm'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const fetchEmployee = async (id) => {
    return await axios.get(`http://localhost:4000/employees/${id}`)
}

const updateEmployee = async (updatedPost) => {
    return await axios.put(`http://localhost:4000/employees/${updatedPost.id}`, updatedPost)
}

const Edit = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { id } = useParams()
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
        ['employees', id],
        () => fetchEmployee(id)
    )
    const updatePostMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries('employees');
            navigate('/');
            refetch()
        }
    })

    if (isLoading) {
        return <h1>Loading......</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const initialData = data?.data

    const handleSubmit = (updatedEmployee) => {
        updatePostMutation.mutate({ id, ...updatedEmployee });
    }

    return (
        <div>
            <EmpForm onSubmit={handleSubmit} initialValue={initialData} />
        </div>
    )
}

export default Edit