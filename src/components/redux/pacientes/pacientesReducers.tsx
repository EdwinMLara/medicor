import { FETCH_PACIENTS_REQUETS,
    FETCH_PACIENTS_SUCCESS,
    FETCH_PACIENTS_FAILURE,CURRENT_PACIENT_STATUS} from './PacientesTypes';

interface StateValues {
    loading: boolean,
    pacients: any[],
    error : string,
    currentPacient : any
}

const initialStatePacients : StateValues = {
    loading : false,
    pacients: [],
    error:'',
    currentPacient:{}
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