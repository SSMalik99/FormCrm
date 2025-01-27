import React from "react";
import { FormData } from "../../Responses/FormResponse";



interface LandInputProps {
    formData: FormData;
}



const LandInput: React.FC<LandInputProps> = ({ formData }) => {
    
    return <>
        {GrabMeInput(formData)}
    </>
};

const GrabMeInput = (formData: FormData) => {
    switch (formData.type) {
        case "text":
            return (
                <div>
                    <label>
                        {formData.label} 
                        {formData.isRequired && <span className="text-red-500">*</span>}

                    </label>
                    <input
                        type="text"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        min={formData.validation?.minLength}
                        max={formData.validation?.maxLength}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "password":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="password"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        min={formData.validation?.minLength}
                        max={formData.validation?.maxLength}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break; 
        case "email":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="email"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        min={formData.validation?.minLength}
                        max={formData.validation?.maxLength}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "number":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="number"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        min={formData.validation?.minLength}
                        max={formData.validation?.maxLength}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "range":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="range"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        min={formData.validation?.minLength}
                        max={formData.validation?.maxLength}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "date":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="date"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "month":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="month"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "time":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="time"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
                
            );
            break;
        case "checkbox":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="checkbox"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "radio":
            return (
                <div>

                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="radio"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "file":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="file"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800  dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "image":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <input
                        type="image"
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        case "textarea":
            return (
                <div>
                    <label>{formData.label}{formData.isRequired && <span className="text-red-500">*</span>}</label>
                    <textarea
                        placeholder={formData.placeholder}
                        required={formData.isRequired}
                        className="w-full p-2 border border-gray-800 dark:border-gray-200 rounded"
                    />
                </div>
            );
            break;
        default:
                return <></>
    }
}

export default LandInput;