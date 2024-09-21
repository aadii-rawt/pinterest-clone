import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export default function DataProvider({ children }) {
    const [user, setUser] = useState(null)
    return <dataContext.Provider value={{ user,setUser }}>
        {children}
    </dataContext.Provider>
}

export function useData() {
    return useContext(dataContext)
}