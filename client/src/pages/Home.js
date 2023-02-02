import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
const HOME = () => {
    //coming this data from server index.js
    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };
    //using useEffect hook for loading the fresh data
    useEffect(() => {
        loadData();
    },
        []);

    //delete data function
    const deleteContact = (id) => {
        if (window.confirm("Are you sure that want to delete ?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("data deleted");
            setTimeout(() => loadData(), 500);
        }
    }
    return (
        <div style={{ marginTop: "30px" }}>
            <Link to="/addName">
                <button className='btn btn-name'>Add Name</button>
            </Link>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>
                            Id
                        </th>
                        <th style={{ textAlign: "center" }}>
                            Name
                        </th>
                        <th style={{ textAlign: "center" }}>
                            Address
                        </th>
                        <th style={{ textAlign: "center" }}>
                            Operation
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope='row'>
                                    {item.id}
                                </th>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.address}
                                </td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HOME;