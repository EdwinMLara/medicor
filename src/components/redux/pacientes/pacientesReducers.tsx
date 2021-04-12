import { FETCH_PACIENTS_REQUETS,
    FETCH_PACIENTS_SUCCESS,
    FETCH_PACIENTS_FAILURE,CURRENT_PACIENT_STATUS,PacienteFormValues} from './PacientesTypes';

interface StateValues {
    loading: boolean,
    pacients: PacienteFormValues[],
    error : string,
    currentPacient : PacienteFormValues
}


const initialStatePacients : StateValues = {
    loading : false,
    pacients: [],
    error:'',
    currentPacient: {} as PacienteFormValues
}

const pacientReducer = (state = initialStatePacients,action : any) =>{
    switch(action.type){
        case FETCH_PACIENTS_REQUETS:
            return{
                ...state,
                loading: true
            }
        case FETCH_PACIENTS_SUCCESS:
            return{
                ...state,
                loading:false,
                pacients: action.payload
            }
        case FETCH_PACIENTS_FAILURE:
            return{
                ...state,
                loading:false,
                pacients:[],
                error: action.payload
            }
        case CURRENT_PACIENT_STATUS:
            return{
                ...state,
                currentPacient:action.payload
            }
        default:
            return state
    }
}

export default pacientReducer;