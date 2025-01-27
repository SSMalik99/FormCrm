import axios, { AxiosError } from 'axios';
import React, { useReducer } from 'react';
import {useNavigate}  from 'react-router-dom';
import Swal from 'sweetalert2'
import { initialState, reducer } from '../../Utility/RegisterReducer';




const Register: React.FC = () => {
    // or via CommonJS

    const [state, dispatch] = useReducer(reducer, initialState);

    const navigation = useNavigate();

    const validate = () => {
        let valid = true;
        dispatch({ type: 'CLEAR_ERRORS' });

        if (!state.name) {
            dispatch({ type: 'SET_ERROR', field: 'name', error: 'Name is required' });
            valid = false;
        }

        if (!state.email) {
            dispatch({ type: 'SET_ERROR', field: 'email', error: 'Email is required' });
            valid = false;
        }

        if (!state.password) {
            dispatch({ type: 'SET_ERROR', field: 'password', error: 'Password is required' });
            valid = false;
        }

        if (state.password !== state.confirmPassword) {
            dispatch({ type: 'SET_ERROR', field: 'confirmPassword', error: 'Passwords do not match' });
            valid = false;
        }

        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            
            axios.post('/api/register', {
                name: state.name,
                email: state.email,
                password: state.password,
                password_confirmation: state.confirmPassword
            }).then(response => {
                

                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'Login',
                });
                navigation('/login');
                
                
            }).catch(error => {

                if(error instanceof AxiosError) {
                    
                    const errors = error.response?.data;                
                    Object.keys(errors.data).forEach(field => {
                        dispatch({ type: 'SET_ERROR', field, error: errors.data[field] });
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }

                
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={state.name}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state.errors.name && <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state.errors.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state.errors.password && <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    value={state.confirmPassword}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword}</p>}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Register
            </button>
        </form>
    );
};

export default Register;