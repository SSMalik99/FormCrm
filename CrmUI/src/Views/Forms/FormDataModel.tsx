import React, { useState } from "react";
import { FormData } from "../../Responses/FormResponse";

interface FormDataModalProps {
    onSubmit: (label: string, placeholder: string, isRequired: boolean, validation : {
        minLength: number,
        maxLength: number,
        fileSize: number
    }, stage_id: number | null) => void;
    onClose: () => void;
    validationType: string|undefined;
    preViousData?: FormData|undefined;
}

const FormDataModal: React.FC<FormDataModalProps> = ({ onSubmit, onClose, validationType, preViousData }) => {
    const [label, setLabel] = useState(preViousData?.label || '');
    const [placeholder, setPlaceholder] = useState(preViousData?.placeholder || '');
    const [isRequired, setIsRequired] = useState(preViousData?.isRequired || false);
    
    const [minLength, setMinLength] = useState(preViousData?.validation?.minLength || 0);
    const [maxLength, setMaxLength] = useState(preViousData?.validation?.maxLength || 0);
    const [fileSize, setFileSize] = useState(preViousData?.validation?.fileSize || 0);

    // // Normal validation will be ask for min and max length
    // if (
    //     name?.toLocaleLowerCase() == "text" ||
    //     name?.toLocaleLowerCase() == "password" ||
    //     name?.toLocaleLowerCase() == "number" ||
    //     name?.toLocaleLowerCase() == "range"
    // ) {
    //     setAskForNormalValidation(true);
    // }

    // if (name?.toLocaleLowerCase() == "file" || name?.toLocaleLowerCase() == "image") {
    //     setAskForFileSize(true);
    // }
    const handleSubmit = () => {
        onSubmit(label, placeholder, isRequired, { minLength, maxLength, fileSize }, preViousData?.stage_id || null);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-1000 bg-gray-500 bg-opacity-75">
            <div className="bg-white p-4 w-2xl rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Enter Field Details</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Label</label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Placeholder</label>
                    <input
                        type="text"
                        value={placeholder}
                        onChange={(e) => setPlaceholder(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {validationType === "normal" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Validation - Min -length</label>
                            <input
                                type="number"
                                value={minLength}
                                onChange={(e) => setMinLength(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Validation - Max -length</label>
                            <input
                                type="number"
                                value={maxLength}
                                onChange={(e) => setMaxLength(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </>
                )}

                {validationType === "file" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Validation - Max FileSize</label>
                            <input
                                type="number"
                                value={fileSize}
                                onChange={(e) => setFileSize(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700">Required</label>
                    <input
                        type="checkbox"
                        checked={isRequired}
                        onChange={(e) => setIsRequired(e.target.checked)}
                        className="mr-2"
                    />
                    <span>Is Required</span>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};


export default FormDataModal;