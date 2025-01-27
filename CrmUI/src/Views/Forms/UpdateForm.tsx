import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import InputPanle from "./InputPanel";
import PreviewForm from "./PreviewForm";

import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthUserContext } from "../../Provider/AuthUserContext";
import { addForm, deleteForm } from "../../store/FormsSlice";
import FormResponse from "../../Responses/FormResponse";
import Swal from "sweetalert2";
import UpdatingRightPanel from "./UpdateRightPanel";


const UpdateForm: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const form = useAppSelector(state => state.forms);

    const navigate = useNavigate();
    const {token} = useContext(AuthUserContext);

    const onFormValueChange = (fieldType: any) => {
        dispatch((addForm(fieldType)));
    };


    const fetchFormData = () => {
        // Dispatch action to fetch form data
        axios.get(`/api/forms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                dispatch(addForm(res.data.data as FormResponse));
            }else{
                Swal.fire({
                    title: "Error",
                    text: res.data.message?? "Failed to fetch form data",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                navigate("/forms");
            }
        })
        .catch((err) => {
            if(err instanceof Error){
                Swal.fire({
                    title: "Error",
                    text: err.message?? "Failed to fetch form data",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                navigate("/forms");
            }
            console.error(err);
        });
    }

    const updateFormDetails = () => {
        let data = {
            form_name: form.forms?.form_name,
            form_data: JSON.stringify(form.forms?.form_data)
        }
        axios.post(`/api/forms/update/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            
            if(res.data.success){
                Swal.fire({
                    title: "Form Updated",
                    text: res.data.message?? "Form has been updated successfully",
                    icon: "success",
                    confirmButtonText: "Great!"

                });

                dispatch(deleteForm(form.forms?.form_name));
                navigate("/forms");
            }else{
                Swal.fire({
                    title: "Error",
                    text: res.data.message?? "Failed to update form",
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
            }
        });
    }



    useEffect(() => {
        // Fetch data from backend when component mounts
        // dispatch();
        fetchFormData()
    
        // Clear Redux state when component unmounts
        return () => {
          dispatch(deleteForm());
        };
      }, [dispatch]);



    return <DndProvider backend={HTML5Backend}>

        <InputPanle key={"InputPanle"} />

        <UpdatingRightPanel updateForm={updateFormDetails} formState={form} key={"Creationf form"} onFormValueChange={onFormValueChange} />

        <PreviewForm key={"cchr"} />


    </DndProvider>
}

export default UpdateForm;