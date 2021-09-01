export const IS_DISCONNECTED = 'IS_DISCONNECTED';
export const IS_CONNECTED = 'IS_CONNECTED';

export interface ActionTypeLoggin {
    type : 'IS_DISCONNECTED' | 'IS_CONNECTED',
    payload:Boolean
}