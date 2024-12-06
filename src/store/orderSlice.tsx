import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductType } from "../service/Products"

interface InitialStateType {
    orderList: ProductType[]
}
const getOrderListFromLocalStorage = (): ProductType[] => {
    const savedOrderList = localStorage.getItem("orderList")
    if (savedOrderList) {
        return JSON.parse(savedOrderList)
    }
    return []
}
const saveOrderListToLocalStorage = (orderList: ProductType[]) => {
    localStorage.setItem("orderList", JSON.stringify(orderList))
}
const initialState: InitialStateType = {
    orderList: getOrderListFromLocalStorage()
}
export const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        saveOrderProducts: (
            state: InitialStateType,
            action: PayloadAction<ProductType>) => {
            const id = state.orderList.findIndex(
                (item: ProductType) => item.id == action.payload.id
            )
            if (id == -1) {
                state.orderList.push(action.payload)
            }
            else {
                state.orderList.splice(id, 1, action.payload)
            }
            saveOrderListToLocalStorage(state.orderList)
        },
        deleteOrderProduct: (
            state: InitialStateType,
            action: PayloadAction<string>) => {
            const id = state.orderList.findIndex(
                (item: ProductType) => item.id == action.payload
            )
            if (id != -1) {
                state.orderList.splice(id, 1)
            }
            saveOrderListToLocalStorage(state.orderList)
        },
        incrementOrderCount: (
            state: InitialStateType,
            action: PayloadAction<string>) => {
            const product = state.orderList.find(
                (item: ProductType) => item.id == action.payload
            )
            if (product) {
                product.orderCount += 1
            }
            saveOrderListToLocalStorage(state.orderList)
        },
        decrementOrderCount: (
            state: InitialStateType,
            action: PayloadAction<string>) => {
            const product = state.orderList.find(
                (item: ProductType) => item.id == action.payload
            )
            if (product && product.orderCount > 1) {
                product.orderCount -= 1
            }
            saveOrderListToLocalStorage(state.orderList)
        },
        clearOrderList: (state: InitialStateType) => {
            state.orderList = []
            saveOrderListToLocalStorage(state.orderList)
        }
    }
})

export const { saveOrderProducts, deleteOrderProduct, incrementOrderCount, decrementOrderCount, clearOrderList } = orderSlice.actions
export default orderSlice.reducer
