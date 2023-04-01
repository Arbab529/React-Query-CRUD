import React, { useState } from 'react'

const EmpForm = ({ onSubmit, initialValue }) => {
    const [data, setData] = useState({
        emp_name: initialValue?.emp_name || '',
        emp_position: initialValue?.emp_position || '',
        emp_age: initialValue?.emp_age || '',
        emp_mobile: initialValue?.emp_mobile || '',
        emp_salary: initialValue?.emp_salary || '',
    })

    console.log(initialValue);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(data);
        setData({
            emp_name: '',
            emp_position: '',
            emp_age: '',
            emp_mobile: '',
            emp_salary: '',
        })
    }
    return (
        <div>
            <h1>Employee Record System</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" required name='emp_name' id='name' value={data.emp_name} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="position">Employee Position</label>
                    <input type="text" name='emp_position' id='position' value={data.emp_position} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="position">Employee Age</label>
                    <input type="text" required name='emp_age' id='age' value={data.emp_age} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="age">Employee Mobile</label>
                    <input type="text" required name='emp_mobile' id='phone' value={data.emp_mobile} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="salary">Employee Salary</label>
                    <input type="text" required name='emp_salary' id='salary' value={data.emp_salary} onChange={handleChange} />
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}

export default EmpForm