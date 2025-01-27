import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import FormResponse, { FormData } from '../../Responses/FormResponse';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import LandInput from './LandInput';
import { AuthUserContext } from '../../Provider/AuthUserContext';


const FormShare: React.FC = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState<FormResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { token } = useContext(AuthUserContext);

    useEffect(() => {
        const fetchFormData = () => {
            axios.get(`/api/forms/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {

                console.log(res.data)
                if (res.data.success) {
                    setFormData(res.data.data)
                    setLoading(false)
                } else {
                    Swal.fire({
                        title: "Error",
                        text: res.data.message,
                        icon: "error"

                    })
                    navigate("/forms")
                }
            }).catch(err => {
                if (err instanceof AxiosError) {
                    Swal.fire({
                        title: "Error",
                        text: err.message,
                        icon: "error"
                    })

                } else {
                    Swal.fire({
                        title: "Error",
                        text: err.message,
                        icon: "error"
                    })
                }

                navigate("/forms")
            });
        };

        fetchFormData();
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (

        <div>
            <form onSubmit={handleSubmit} className="max-w-xl mt-10 mx-auto p-8 bg-white shadow-2xl border rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">{formData?.form_name}</h2>
                {formData?.form_data.sort(a => a.stage_id).map((element, index) => {
                    return <LandInput formData={element} key={index + element.stage_id} />
                })}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 my-4 rounded hover:bg-blue-600 transition duration-300">Submit</button>
            </form>
            
        </div>


    );
};

export default FormShare;