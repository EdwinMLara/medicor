import { FETCH_PACIENTS_REQUETS,
    FETCH_PACIENTS_SUCCESS,
    FETCH_PACIENTS_FAILURE} from './PacientesTypes';

interface StateValues {
    loading: boolean,
    pacients: any[],
    error : string
}

const initialStatePacients : StateValues = {
    loading : false,
    pacients: [],
    error:''
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
                loading:false,
                pacients: action.payload,
                error:''
            }
        case FETCH_PACIENTS_FAILURE:
            return{
                loading:false,
                pacients:[],
                error: action.payload
            }
        default:
            return state
    }
}

export default pacientReducer;