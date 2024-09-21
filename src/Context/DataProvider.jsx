import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export default function DataProvider({ children }) {
    const [user, setUser] = useState("Aditya")
    return <dataContext.Provider value={{ user }}>
        {children}
    </dataContext.Provider>
}

export function useData() {
    return useContext(dataContext)
}