import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: "",
    showLoginModel: false,
    breakpointColumnsObj : {
        default: 5,
        1100: 3,
        700: 2,
        500: 2
    },
}
// const [showLoginModel, setShowLoginModel] = useState(false)

const stateSlice = createSlice({
    name: "stateSlice",
    initialState,
    reducers : {
        setShowLoginModel(state,action){
            state.showLoginModel = action.payload;
        }
    }
})

export const  {setShowLoginModel} = stateSlice.actions

export default stateSlice.reducer;