import { useCreateOrder } from "@/api/orders";
import { CartItem, Tables } from "@/types";
import { randomUUID } from "expo-crypto";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "expo-router";
import { useCreateOrderItems } from "@/api/order-items";

// making use of supabase generated types with helpers method
type Product = Tables<"products">

type CartCtxType = {
    items: CartItem[],
    // onAddItem: (prod: Product, size: CartItem["size"]) => void,
    // making use of supabase generated types with helpers method
    // onAddItem: (prod: Tables<"products">, size: CartItem["size"]) => void,

    onAddItem: (prod: Product, size: CartItem["size"]) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number
    // to create order in database
    checkout: () => void
}

export const CartContext = createContext<CartCtxType>({
    items: [],
    onAddItem: () => { },
    updateQuantity: () => { },
    total: 0,
    checkout: () => { }
})

const CartContextProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const { mutate: insertOrder } = useCreateOrder()

    const { mutate: insertOrderItems } = useCreateOrderItems()

    const addItem = (prod: Product, size: CartItem["size"]) => {
        // if already in cart increment quanitity
        const existingItem = items.find(item => item.product_id === prod.id && item.size === size)

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return
        }

        // console.log(prod)
        const newCartItem: CartItem = {
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
        const updatedItems = items.map(item => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }).filter(item => item.quantity)

        setItems(updatedItems)
    }

    const total = items.reduce((sum, currItem) => (sum += (currItem.product.price * currItem.quantity)), 0);

    const clearCart = () => {
        setItems([])
    }

    const { session } = useAuth()
    const id = session?.user.id

    const router = useRouter()

    const checkout = () => {
        // console.warn("checkout")
        insertOrder({
            total: total,
            user_id: id!
        }, {
            onSuccess: saveOrderItems


            // onSuccess: (data) => {
            // // router.back()
            // // console.warn(data?.id)
            // router.replace(`/(user)/orders/${data?.id}`)
            // // router.back()
            // clearCart();
            // }
        })
    }

    // so that after a successfull checkout, we can also view order items list as well
    const saveOrderItems = (order: Tables<"orders">) => {
        // const item = items[0]

        const orderItems = items.map(cartItem => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size
        }))

        insertOrderItems(
            orderItems
            // testing with only one order item
            // {
            //     order_id: order.id,
            //     product_id: item.product_id,
            //     quantity: item.quantity,
            //     size: item.size
            // }
            , {
                onSuccess: () => {
                    // after adding order items route back to its order details page
                    router.replace(`/(user)/orders/${order?.id}`)
                    clearCart();
                }
            })

        // // after adding order items route back to its order details page
        // router.replace(`/(user)/orders/${order?.id}`)
        // clearCart();
    }

    return (
        <CartContext.Provider
            // value={{items: [1, 2, 3, 4], onAddItem: () => {}}}
            value={{ items, onAddItem: addItem, updateQuantity, total, checkout }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider

// so tha we ont have to always import CartContext and useContext on consumer components we just need to make use of this custom hook
export const useCart = () => useContext(CartContext)