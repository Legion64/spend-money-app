import { createSlice } from '@reduxjs/toolkit'
import ItemApi from '../../api/Items.json'

export type Receipt = Object & {
    title: string
    quantity: number,
    price: number,
    image: string
}

export type AccountState = {
    money: number,
    receipt: Array<Receipt>
}

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        money: 100_000_000_000,
        receipt: [
            ...ItemApi.map(item => ({
                title: item.title,
                quantity: 0,
                price: item.price,
                image: item.image
            }))
        ] as Receipt[]
    },
    reducers: {
        updateMoney: (state, action) => {
            state.money = action.payload
        },
        addReceiptItem(state, action) {
            state.receipt.push(action.payload)
        },
        updateReceiptItem(state, action) {
            const { index, data } = action.payload
            state.receipt[index] = {
                ...state.receipt[index],
                ...data
            }
        }
    }
})

export const { addReceiptItem, updateReceiptItem, updateMoney } = accountSlice.actions
export default accountSlice.reducer