import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Store/Reducers/userReducer";

const dataContext = createContext();

export default function DataProvider({ children }) {
    // const [user,setUser] = useState(null)
    const {user} = useSelector((state) => state.userSlice)
    const [showLoginModel, setShowLoginModel] = useState(false)
    const dispatch = useDispatch()

    const breakpointColumnsObj = {
        default: 5,
        1100: 3,
        700: 2,
        500: 2
    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Fetch user details from Firestore using the user's UID
                getDoc(doc(db, "users", user.uid)).then((userDoc) => {
                    if (userDoc.exists()) {
                        // setUser(userDoc.data());
                        dispatch(setUser(userDoc.data()))
                        console.log("User is still logged in.");
                    }
                });
            } else {
                console.log("No user is logged in.");
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return <dataContext.Provider value={{
        user, setUser, showLoginModel, breakpointColumnsObj
    }}>
        {children}
    </dataContext.Provider>
}

export function useData() {
    return useContext(dataContext)
}
