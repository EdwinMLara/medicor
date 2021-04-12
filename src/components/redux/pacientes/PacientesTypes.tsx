export const FETCH_PACIENTS_REQUETS = 'FETCH_PACIENTS_REQUETS';
export const FETCH_PACIENTS_SUCCESS = 'FETCH_PACIENTS_SUCCESS';
export const FETCH_PACIENTS_FAILURE = 'FETCH_PACIENTS_FAILURE';
export const CURRENT_PACIENT_STATUS = 'CURRENT_PACIENT_STATUS';

export type ActionTypes =  'FETCH_PACIENTS_REQUETS' | 'FETCH_PACIENTS_SUCCESS'
 | 'FETCH_PACIENTS_FAILURE' | 'CURRENT_PACIENT_STATUS';

export type Talla = 'ch' | 'md' | 'gr';

export interface PacienteFormValues{
    nombre: String,
    edad: number,
    talla: Talla,
    peso: number,
    enfermedadesCronicas: String,
    alergias: String,
    imageb64:String
}