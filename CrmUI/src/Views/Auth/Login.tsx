import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { AuthUserContext } from "../../Provider/AuthUserContext";
import { useNavigate } from "react-router-dom";



const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const{setToken, setUser} = useContext(AuthUserContext);
    const navigate  = useNavigate();

    const handleLogin = async () => {

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
        
        axios.post("/api/login", { email, password }).then((res) => {
            let mainResponse = res.data;

            if(mainResponse.success){
                localStorage.setItem("token", mainResponse.data.token);
                setToken(mainResponse.data.token);
                setUser(mainResponse.data);
                navigate("/");
            }else{
                setError(mainResponse.message);
            }

        }).catch((err) => {

            if (err instanceof AxiosError) {
                console.error(err.response?.data);
                setError(err.response?.data.message);
                return;
            }
            
            console.error(err);
            setError("Login Failed ! try again later.");
            
        });
            
            
    };

    return (
        <div className="flex items-center justify-center min-h-screen border bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;