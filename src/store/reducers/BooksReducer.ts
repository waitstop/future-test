import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Book} from "@/lib/types/Book.ts";

const initialState = {
    value: [] as Book[],
    startIndex: 0,
    totalFound: 0,
    lastRequestString: {
        search: "",
        category: "",
        sort: ""
    }
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers:{
        addBooks: (state, action: PayloadAction<Book[]>) => {
            state.value.push(...action.payload)
        },
        resetSearch: (state) => {
            state.value = initialState.value
            state.startIndex = initialState.startIndex
            state.totalFound = initialState.totalFound
        },
        incrementStartIndex: (state) => {
            state.startIndex += 30
        },
        setTotalFound: (state, action: PayloadAction<number>) => {
            state.totalFound = action.payload
        },
        setLastRequestString: (state, action: PayloadAction<{search: string, category: string, sort: string}>) => {
            state.lastRequestString = action.payload
        }
    }
})

export const {
    addBooks,
    setTotalFound,
    incrementStartIndex,
    resetSearch,
    setLastRequestString
} = booksSlice.actions
export default booksSlice.reducer