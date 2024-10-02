import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export default function DataProvider({ children }) {
    const [user, setUser] = useState(null)
    const [showLoginModel, setShowLoginModel] = useState(false)
    const [users, setUsers] = useState([
        {
            username: "Aditya",
            password: "@12345",
            email: "test@gmail.com",
            userId: 1,
            avatar: "",
            following: [2, 3, 4],
            follower: [3]
        },
        {
            username: "Walter White",
            password: "@12345",
            email: "test2@gmail.com",
            userId: 2,
            avatar: "img3.jpg",
            following: [2, 3, 4],
            follower: [3]
        },
        {
            username: "Thomas ",
            password: "@12345",
            email: "",
            userId: 3,
            avatar: "img5.jpg"
        },
        {
            username: "Mike William",
            password: "@12345",
            email: "",
            userId: 4,
            avatar: ""
        },
    ])
    const [fakePins, setFakePins] = useState([
        {
            img: "img3.jpg",
            id: 'dfjsdfj9euieuo',
            createdBy: 1,
            title: "this is cat",
            description: "this is cat illustration image",
        },
        {
            img: "img4.jpg",
            id: 'oi4uut34jlk34jtl',
            createdBy: 3,
            title: "cat",
            description: "",
        },
        {
            img: "img5.jpg",
            id: 'dlkjflj3iru23u',
            createdBy: 2,
            title: "cat",
            description: "",
        },
        {
            img: "img6.jpg",
            id: "lfjoi45u3o4u53j4",
            createdBy: 2,
            title: "cat",
            description: "",
        },
        {
            img: "img7.jpg",
            id: "kjdoiaueoru9r34",
            createdBy: 1,
            title: "cat",
            description: "",
        },
        {
            img: "img8.jpg",
            id: "io4u5345jkejr",
            createdBy: 4,
            title: "cat",
            description: "",
        },
        {
            img: "img9.jpg",
            id: "ioui34o545j",
            createdBy: 2,
            title: "cat",
            description: "",
        },
        {
            img: "img10.jpg",
            id: "oiu4oi53j5lk5",
            createdBy: 1,
            title: "cat",
            description: "",
        },
        {
            img: "img11.jpg",
            id: "uio3lk5hkl5h",
            createdBy: 4,
            title: "cat",
            description: "",
        },
        {
            img: "img12.jpg",
            id: "uiu5oi34jj5lkj",
            createdBy: 2,
            title: "cat",
            description: "",
        },
    ])
    const [commentsData, setCommentsData] = useState([
        {
            pinId: "uiu5oi34jj5lkj",
            comments: [
                {
                    id: "345954",
                    cmnt: "Cool 🔥",
                    commentBy: 3
                },
                {
                    id: "345954",
                    cmnt: "♥️♥️",
                    commentBy: 4
                },
                {
                    id: "345954",
                    cmnt: "👋👋",
                    commentBy: 3
                },
                {
                    id: "345954",
                    cmnt: "this is nice",
                    commentBy: 3
                },
                {
                    id: "345954",
                    cmnt: "♥️♥️",
                    commentBy: 3
                },
            ]
        },
        {
            pinId: "dfjsdfj9euieuo",
            comments: [
                {
                    id: "345954",
                    cmnt: "📈📈📈",
                    commentBy: 3
                },
                {
                    id: "345954",
                    cmnt: "🤬🤬",
                    commentBy: 4
                },
                {
                    id: "345954",
                    cmnt: "🤡🤡",
                    commentBy: 3
                },
            ]
        },
    ])
    return <dataContext.Provider value={{
        user, setUser, showLoginModel, setShowLoginModel, users, setUsers, fakePins, setFakePins, commentsData, setCommentsData
    }}>
        {children}
    </dataContext.Provider>
}

export function useData() {
    return useContext(dataContext)
}