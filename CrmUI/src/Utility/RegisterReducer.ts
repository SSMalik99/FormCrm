
interface RegisterState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
}

type Action =
    | { type: 'SET_FIELD'; field: string; value: string }
    | { type: 'SET_ERROR'; field: string; error: string }
    | { type: 'CLEAR_ERRORS' };

const initialState: RegisterState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
};

const reducer = (state: RegisterState, action: Action): RegisterState => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.field]: action.error } };
        case 'CLEAR_ERRORS':
            return { ...state, errors: {} };
        default:
            return state;
    }
};

export { initialState, reducer };