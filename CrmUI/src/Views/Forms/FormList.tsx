
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import FormListResponse from '../../Responses/FormListResponse';
import axios from 'axios';
import { AuthUserContext } from '../../Provider/AuthUserContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { token } = useContext(AuthUserContext);

    const [data, setData] = useState<FormListResponse>();
    const navigate = useNavigate();

    const fetchData = () => {

        axios.get(`/api/forms/list?page=${currentPage}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {

                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const deleteForm = (id: number) => {
        axios.delete(`/api/forms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    fetchData()

                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
    }


    return (
        <div className="container mx-auto p-4" >

            {data?.data.pagination.total === 0 ? (

                <div className="flex items-center justify-between h-full">
                    <h2 className="text-2xl font-bold mb-4">No Form available to show</h2>
                    <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/forms/create">
                        Create New Form
                    </Link>
                </div>

            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">List of Forms</h1>

                    <ul className="mb-4">
                        {data?.data.forms.map(form => (
                            <li key={form.id} className="border p-2 mb-2">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-xl">{form.form_name}</h2>
                                        <p>Created at: {new Date(form.created_at).toLocaleString()}</p>
                                    </div>


                                    <div className=" flex space-x-1.5 justify-end">

                                        <button className=" bg-blue-500 p-2 rounded" onClick={() => {
                                            navigate(`/forms/view/${form.id}`)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-10 h-5 fill-white " viewBox="0 0 50 50">
                                                <path d="M 40 0 C 34.53125 0 30.066406 4.421875 30 9.875 L 15.90625 16.9375 C 14.25 15.71875 12.207031 15 10 15 C 4.488281 15 0 19.488281 0 25 C 0 30.511719 4.488281 35 10 35 C 12.207031 35 14.25 34.28125 15.90625 33.0625 L 30 40.125 C 30.066406 45.578125 34.53125 50 40 50 C 45.511719 50 50 45.511719 50 40 C 50 34.488281 45.511719 30 40 30 C 37.875 30 35.902344 30.675781 34.28125 31.8125 L 20.625 25 L 34.28125 18.1875 C 35.902344 19.324219 37.875 20 40 20 C 45.511719 20 50 15.511719 50 10 C 50 4.488281 45.511719 0 40 0 Z M 40 2 C 44.429688 2 48 5.570313 48 10 C 48 14.429688 44.429688 18 40 18 C 38.363281 18 36.859375 17.492188 35.59375 16.65625 C 35.46875 16.238281 35.089844 15.949219 34.65625 15.9375 C 34.652344 15.933594 34.628906 15.941406 34.625 15.9375 C 33.230469 14.675781 32.292969 12.910156 32.0625 10.9375 C 32.273438 10.585938 32.25 10.140625 32 9.8125 C 32.101563 5.472656 35.632813 2 40 2 Z M 30.21875 12 C 30.589844 13.808594 31.449219 15.4375 32.65625 16.75 L 19.8125 23.1875 C 19.472656 21.359375 18.65625 19.710938 17.46875 18.375 Z M 10 17 C 11.851563 17 13.554688 17.609375 14.90625 18.65625 C 14.917969 18.664063 14.925781 18.679688 14.9375 18.6875 C 14.945313 18.707031 14.957031 18.730469 14.96875 18.75 C 15.054688 18.855469 15.160156 18.9375 15.28125 19 C 15.285156 19.003906 15.308594 18.996094 15.3125 19 C 16.808594 20.328125 17.796875 22.222656 17.96875 24.34375 C 17.855469 24.617188 17.867188 24.925781 18 25.1875 C 17.980469 25.269531 17.96875 25.351563 17.96875 25.4375 C 17.847656 27.65625 16.839844 29.628906 15.28125 31 C 15.1875 31.058594 15.101563 31.132813 15.03125 31.21875 C 13.65625 32.332031 11.914063 33 10 33 C 5.570313 33 2 29.429688 2 25 C 2 20.570313 5.570313 17 10 17 Z M 19.8125 26.8125 L 32.65625 33.25 C 31.449219 34.5625 30.589844 36.191406 30.21875 38 L 17.46875 31.625 C 18.65625 30.289063 19.472656 28.640625 19.8125 26.8125 Z M 40 32 C 44.429688 32 48 35.570313 48 40 C 48 44.429688 44.429688 48 40 48 C 35.570313 48 32 44.429688 32 40 C 32 37.59375 33.046875 35.433594 34.71875 33.96875 C 34.742188 33.949219 34.761719 33.929688 34.78125 33.90625 C 34.785156 33.902344 34.808594 33.910156 34.8125 33.90625 C 34.972656 33.839844 35.113281 33.730469 35.21875 33.59375 C 36.554688 32.597656 38.199219 32 40 32 Z"></path>
                                            </svg>
                                        </button>
                                        <button className=" bg-black p-2 rounded" onClick={() => {
                                            navigate(`/forms/update/${form.id}`);

                                        }} ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-10 h-5 fill-white " viewBox="0 0 24 24">
                                                <path strokeMiterlimit="10" strokeWidth="2" d="M18.4,3.1L4,17.4V20h2.6L20.9,5.6V5.5L18.4,3.1L18.4,3.1z"></path><path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M15.5,5.5l3,3"></path>
                                            </svg></button>

                                        <button className="bg-red-500 text-white p-2 rounded" onClick={() => {

                                            if (form.id) {
                                                deleteForm(form.id);
                                            }

                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-10 h-5  fill-white" viewBox="0 0 30 30">
                                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {data?.data.pagination.lastPage}</span>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === data?.data.pagination.lastPage}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormList;