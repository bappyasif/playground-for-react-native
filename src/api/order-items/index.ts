import { useMutation } from "@tanstack/react-query"
import {InsertTables} from "@/types"
import { supabase } from "@/lib/supabase"

export const useCreateOrderItems = () => {
    return useMutation({
        async mutationFn(items: InsertTables<"order_items">[]) {
            const {error, data: newProduct} = await supabase.from("order_items").insert(items)

            if (error) {
                throw new Error(error.message)
            }

            return newProduct
        },
        async onError () {
            console.log("fetch failed!!")
        }
    })
}


// for a single item
// export const useCreateOrderItems = () => {
//     const queryClient = useQueryClient()

//     return useMutation({
//         async mutationFn(data: InsertTables<"order_items">) {
//             const {error, data: newProduct} = await supabase.from("order_items").insert({...data}).single()

//             if (error) {
//                 throw new Error(error.message)
//             }

//             return newProduct
//         },

//         async onSuccess () {
//             await queryClient.invalidateQueries({queryKey: ["orders"]})
//             // await queryClient.invalidateQueries("products")
//         },

//         async onError () {
//             console.log("fetch failed!!")
//         }
//     })
// }