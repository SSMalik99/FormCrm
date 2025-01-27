interface FormResponse{
    id?: number,
    form_name: string,
    created_at: string
    form_data: FormData[]
}


interface FormData{
    stage_id: number
    type: string
    validation: any
    label : string
    placeholder : string
    isRequired : boolean
}
export default FormResponse;
export type { FormData };