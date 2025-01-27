import FormResponse from "./FormResponse";

interface FormListResponse {
    data: {
        forms: [FormResponse],
        pagination: {
            perPage: 2,
            currentPage: 1,
            total: 0,
            lastPage: 1,
            hasMorePages: false
        }
    },
    message: "",
    success: false
}
export default FormListResponse;