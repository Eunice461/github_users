import { createContext, useState, useEffect, useReducer, useRef} from "react";
import Reducer from "./Reducer";


const initialState = {
    currentScreenName: ''
}




export const GlobalUseContext = createContext({});





export const GlobalState = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, initialState);
    const currentRoueName = useRef( initialState)


    return(

        < GlobalUseContext.Provider value={{

            currentScreenName: state.currentScreenName, dispatch, currentRoueName
        }}>
        
            {children}
        
        
        </GlobalUseContext.Provider>


    )



}