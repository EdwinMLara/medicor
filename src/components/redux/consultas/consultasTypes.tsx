export const FETCH_CONSULTAS_REQUEST = 'FETCH_CONSULTAS_REQUEST';
export const FETCH_CONSULTAS_SUCCESS = 'FETCH_CONSULTAS_SUCCESS';
export const FETCH_CONSULTAS_FAILURE = 'FETCH_CONSULTAS_FAILURE';
export const CURRENT_CONSULTAS_STATUS = 'CURRENT_CONSULTAS_STATUS';

export interface MedicamentosValues {
    cantidad:number,
    nombre:String,
    prescripcion:String
}

export interface ConsultaValues{
    idPaciente: String,
    sintomas:String,
    diagnostico:String,
    receta: Array<MedicamentosValues>
    date?:Date
}