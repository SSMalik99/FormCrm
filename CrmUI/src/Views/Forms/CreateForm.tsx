
import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import InputPanle from './InputPanel';
import CreateRightPanel from './CreateRightPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addForm, deleteForm } from '../../store/FormsSlice';
import FormResponse from '../../Responses/FormResponse';
import PreviewForm from './PreviewForm';
import axios, { Axios, AxiosError } from 'axios';
import { AuthUserContext } from '../../Provider/AuthUserContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const CreateForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const {token} = useContext(AuthUserContext);
    const navigate = useNavigate();

    const form = useAppSelector(state => state.forms);
    
    

    const onFormValueChange = (fieldType: FormResponse) => {
        dispatch((addForm(fieldType)));
    };

    const saveNewForm = () => {
        
        let data = {
            form_name: form.forms?.form_name,
            form_data: JSON.stringify(form.forms?.form_data)
        }
        axios.post("/api/forms/save", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            
            if(res.data.success){
                Swal.fire({
                    title: "Form Saved",
                    text: res.data.message?? "Form has been saved successfully",
                    icon: "success",
                    confirmButtonText: "Great!"

                });

                dispatch(deleteForm(form.forms?.form_name));
                navigate("/forms");
            }else{
                Swal.fire({
                    title: "Error",
                    text: res.data.message?? "Failed to save form",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        }).catch((err) => {
            if (err instanceof AxiosError) {
                Swal.fire({
                    title: "Error",
                    text: err.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
                
            }else{
                console.error(err);
            }

            
        });
    };


    return (
        <DndProvider backend={HTML5Backend}>
            

            <InputPanle key={"InputPanle"} />

            <CreateRightPanel saveNewForm={saveNewForm} formState={form} key={"Creationf form"}  onFormValueChange={onFormValueChange} />

            <PreviewForm key={"cchr"} />
            
            
        </DndProvider>
    );
};

export default CreateForm;