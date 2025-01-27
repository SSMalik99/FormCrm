import React, { useContext } from "react";
import { AuthUserContext } from "../Provider/AuthUserContext";


const Home : React.FC = () => {


    const {user} = useContext(AuthUserContext);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {user ? (
                <>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to your Dashboard!</h1>
                    <p className="text-lg text-gray-600">Hello, {user.name} We're glad to see you.</p>
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Platform!</h1>
                    <p className="text-lg text-gray-600">This platform is basically to manage forms for the survey.</p>
                </>
            )}
        </div>
    );
}

export default Home;