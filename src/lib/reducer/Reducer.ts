import {deepCopy, TAppState, TDispatchAction, TDispatchArgs, TDispatchOperation} from './AppState.ts'

export const DispatchAction = (operation: TDispatchOperation, payload?: TDispatchArgs) : TDispatchAction => {
    return deepCopy({
        operation: operation,
        payload: payload
    })
}

const Reducer = (state: TAppState, action: TDispatchAction) : TAppState => {
    const { operation, payload } = action

    return (() => {
        const nextState = deepCopy(state)
        switch (operation) {
            case 'setActivePage': {
                if (payload && 'activePage' in payload)
                    nextState.activePage = payload.activePage
                return nextState
            }
            default:
                return nextState
        }
    })()
}

export default Reducer
