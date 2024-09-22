import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export default function DataProvider({ children }) {
    const [user, setUser] = useState(null)
    const [showLoginModel, setShowLoginModel] = useState(false)
    return <dataContext.Provider value={{ user, setUser, showLoginModel, setShowLoginModel }}>
        {children}
    </dataContext.Provider>
}

export function useData() {
    return useContext(dataContext)
}