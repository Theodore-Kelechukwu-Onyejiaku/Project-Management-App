import React, {createContext} from "react"

interface ContextTypeI {
    bodyClicked : boolean
    setBodyClicked : any
}
const Context = createContext<ContextTypeI>({bodyClicked: false, setBodyClicked: null});

export default Context;