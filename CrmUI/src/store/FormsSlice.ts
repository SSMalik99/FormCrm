import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FormResponse from '../Responses/FormResponse';


// Utility functions to save and load state from local storage
const loadState = (): FormsState | undefined => {
    try {
        const serializedState = localStorage.getItem('formsState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Could not load state', err);
        return undefined;
    }
};

interface FormsState {
    forms: FormResponse|null;
    loading: boolean;
    error: string | null;
}

const initialState: FormsState = loadState() || {
    forms: null,
    loading: false,
    error: null,
};

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        fetchFormsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchFormsSuccess(state, action: PayloadAction<FormResponse>) {
            state.forms = action.payload;
            state.loading = false;
        },
        fetchFormsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addForm(state, action: PayloadAction<FormResponse>) {
            
            state.forms = action.payload;
        },
        updateForm(state, action: PayloadAction<FormResponse>) {
            state.forms = action.payload;
        },
        deleteForm(state, _: PayloadAction<string|number|undefined>) {
            state.forms = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('formsState')

        },
        deletFormData(state, action: PayloadAction<number>) {
            if (state.forms) {
                state.forms.form_data = state.forms.form_data.filter((item) => item.stage_id !== action.payload);
            }
        }
    },
});

export const {
    fetchFormsStart,
    fetchFormsSuccess,
    fetchFormsFailure,
    addForm,
    updateForm,
    deleteForm,
} = formsSlice.actions;

export const formReducer =  formsSlice.reducer;
export type { FormsState };

