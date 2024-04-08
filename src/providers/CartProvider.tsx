import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartCtxType = {
    items: CartItem[],
    onAddItem: (prod: Product, size: CartItem["size"]) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number
}

export const CartContext = createContext<CartCtxType>({
    items: [],
    onAddItem: () => { },
    updateQuantity: () => { },
    total: 0
})

const CartContextProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (prod: Product, size: CartItem["size"]) => {
        // if already in cart increment quanitity
        const existingItem = items.find(item => item.product_id === prod.id && item.size === size)

        if(existingItem) {
            updateQuantity(existingItem.id, 1);
            return 
        }

        // console.log(prod)
        const newCartItem:CartItem = {
            // id: "test", // genertate dynamically
            id: randomUUID(),
            product: prod,
            product_id: prod.id,
            quantity: 1,
            size
        }

        setItems([newCartItem, ...items])
    }

    // update quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        // console.log(itemId, amount)
        const updatedItems = items.map(item => item.id !== itemId ?  item : {...item, quantity: item.quantity + amount}).filter(item => item.quantity)

        setItems(updatedItems)
    }

    const total = items.reduce((sum, currItem) => (sum += (currItem.product.price * currItem.quantity)), 0);

    return (
        <CartContext.Provider
            // value={{items: [1, 2, 3, 4], onAddItem: () => {}}}
            value={{ items, onAddItem: addItem, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider

// so tha we ont have to always import CartContext and useContext on consumer components we just need to make use of this custom hook
export const useCart = () => useContext(CartContext)