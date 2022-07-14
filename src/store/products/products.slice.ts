import { IProduct } from "../../types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface ProductState {
    products: IProduct[],
    filteredProducts : IProduct[],
    isLoading:boolean,
    error:string
}

const initialState:ProductState = {
    products: [],
    filteredProducts: [],
    isLoading: false,
    error:''
}

export const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers: {
        startFetching(state){
            state.isLoading = true
        },
        successFetching(state, action: PayloadAction<IProduct[]>){
            state.products = action.payload
            state.isLoading = false
            state.error = ''
            state.filteredProducts = action.payload
        },
        errorFetching(state, action:PayloadAction<string>){
            state.error = action.payload
            state.isLoading = false
        },
        filterByCategory(state,action:PayloadAction<string[]>){
            if(action.payload.length === 0 || action.payload.includes('All'))
            {
                state.filteredProducts = state.products
            }
            else {
                state.filteredProducts = state.products.filter(
                    (products) =>action.payload.includes(products.category))
            }
        },
        sortByPrice(state,action:PayloadAction<string>){
            if(action.payload === "lowest")
            {
                state.filteredProducts = state.products.slice().sort((a, b) => a.price - b.price)
            }
            if(action.payload === "highest"){
                state.filteredProducts = state.products.slice().sort((a, b) => b.price - a.price)
            }
            if(action.payload === "A-Z"){
                state.filteredProducts = state.products.sort((a, b) => {
                    return a.title.localeCompare(b.title)
                  })
            }
            if(action.payload === "Z-A"){
                state.filteredProducts = state.products.sort((a, b) => {
                    return b.title.localeCompare(a.title)
                  })
            }
        }
    }
})

export const {
    startFetching,
    successFetching,
    errorFetching,
    filterByCategory,
    sortByPrice
} = productSlice.actions

export default productSlice.reducer