import { useDrop } from "react-dnd";
import { FormsState } from "../../store/FormsSlice";
import FormResponse, { FormData } from "../../Responses/FormResponse";
import Swal from "sweetalert2";
import { useState } from "react";
import FormDataModal from "./FormDataModel";
import LandInput from "./LandInput";
import { useNavigate } from "react-router-dom";


interface UpdatingRightPanelProps {
    formState: FormsState; // Replace 'any' with the appropriate type if known
    onFormValueChange: (value: FormResponse) => void;
    updateForm: () => void;
}

const UpdatingRightPanel = ({ formState, onFormValueChange, updateForm }: UpdatingRightPanelProps) => {


    const [formDatamodalVisible, setFormDatamodalVisible] = useState(false);
    const [droppedItem, setDroppedItem] = useState<{ id: number; name: string } | null>(null);
    const [previousFormData, setPreviousFormData] = useState<FormData | undefined>(undefined);

    const navigate = useNavigate()



    const onNameChange = (name: string) => {
        if (formState.forms) {
            onFormValueChange({ ...formState.forms, form_name: name })

        } else {
            onFormValueChange(
                {
                    form_name: name,
                    created_at: new Date().toISOString(),
                    form_data: []
                } as FormResponse)
        }
    }

    const handleModalSubmit = (label: string, placeholder: string, isRequired: boolean, validation: {
        minLength: number,
        maxLength: number,
        fileSize: number
    }, stage_id :number| null) => {

        if (droppedItem && formState.forms) {

            

            if (stage_id) {
                

                onFormValueChange({
                    ...formState.forms,
                    form_data: formState.forms.form_data.map((data) => {
                        if (data.stage_id === stage_id) {
                            return {
                                ...data,
                                label,
                                placeholder,
                                isRequired,
                                validation: { ...validation }
                            }
                        }
                        return data
                    }) 
                })
            }else{
                onFormValueChange({
                    ...formState.forms,
                    form_data: [
                        ...formState.forms.form_data,
                        {
                            type: droppedItem.name,
                            stage_id: formState.forms.form_data.length + 1,
                            validation: { ...validation },
                            label,
                            placeholder,
                            isRequired,
                        },
                    ],
                });
            }
            
            setFormDatamodalVisible(false);
            setDroppedItem(null);
            setPreviousFormData(undefined);
        }
    };

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'INPUT_ELEMENT_ITEM',

        drop: (item: { id: number; name: string }) => {


            if (formState.forms === null) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please enter form name first',
                    icon: 'error',
                    confirmButtonText: "Okay"
                });
            } else {

                setDroppedItem(item);
                setFormDatamodalVisible(true);

               
            }

            

        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });


    return (
        //84 + 200
        <div className="p-4 sm:ml-84 mr-84">
            <h1 className="text-2xl font-bold mb-4">Form Building </h1>

            <input
                type="text"
                value={formState.forms?.form_name || ""}
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-lg dark:border-gray-700"
                placeholder="Form name"
                required
                onChange={(e) => onNameChange(e.target.value)}
            />
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">


                <div ref={drop} className={`flex items-center justify-center h-48 mb-4 rounded-sm
                    ${canDrop ? (isOver ? 'bg-green-100 dark:bg-green-100' : 'bg-yellow-100 dark:bg-yellow-100') : 'bg-gray-200'}
                     dark:bg-gray-800`}>

                    <p className="text-sm   text-blue-500 dark:text-blue-500">

                        <span className="border-dashed border p-4">
                            Drag and drop input elements here
                        </span>
                    </p>
                </div>

                <div>
                    {formState.forms?.form_data.map((element, index) => (
                        <div key={element.type} className="grid grid-cols-3 gap-4 items-center border-b mb-5">
                            <div className="col-span-2">
                                <LandInput formData={element} key={element.stage_id + index + 232} />
                            </div>
                            <div className=" flex space-x-1.5 justify-end">
                                <button className=" bg-blue-500 p-2 rounded" onClick={()=> {
                                    setFormDatamodalVisible(true);
                                    setPreviousFormData(element as unknown as FormData);
                                    setDroppedItem({ id: element.stage_id, name: element.type });
                                    
                                }} ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-10 h-5 fill-white " viewBox="0 0 24 24">
                                        <path strokeMiterlimit="10" strokeWidth="2" d="M18.4,3.1L4,17.4V20h2.6L20.9,5.6V5.5L18.4,3.1L18.4,3.1z"></path><path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M15.5,5.5l3,3"></path>
                                    </svg></button>

                                <button className="bg-red-500 text-white p-2 rounded" onClick={() => {
                                    onFormValueChange({
                                        ...formState.forms,
                                        form_data: formState.forms?.form_data.filter((data) => data.stage_id !== element.stage_id)
                                    }as FormResponse)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-10 h-5  fill-white" viewBox="0 0 30 30">
                                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                    </svg>
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

                {formState.forms?.form_data.length === 0 && <div
                    className={`flex items-center justify-center rounded-sm`}>
                    <p className="text-sm text-blue-500 dark:text-blue-500">
                        No input elements added
                    </p>
                </div>}

                <div className="flex justify-between">

                    <button className="bg-gray-500 text-white p-2  rounded" onClick={() => {
                        navigate("/forms")
                    }}>
                        View All
                    </button>

                    
                    {(formState.forms != null) && <button className="bg-blue-500 text-white p-2  rounded" onClick={updateForm}>
                        Make Change Parmanent
                    </button>}
                </div>

            </div>
            {formDatamodalVisible && (
                <FormDataModal preViousData={previousFormData as FormData} validationType={
                    (droppedItem?.name == "file" || droppedItem?.name == "image") ? "file"
                        :
                        (
                            droppedItem?.name == "password" ||
                            droppedItem?.name == "number" ||
                            droppedItem?.name == "range" ||
                            droppedItem?.name == "text") ? "normal" : "other"} onSubmit={handleModalSubmit} onClose={() => {
                                setFormDatamodalVisible(false)
                            }} />
            )}
        </div>
    );
};

export default UpdatingRightPanel;
