import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertTables, UpdateTables } from "@/types"

// export const useAdminOrderList = () => {
//     return useQuery({
//         queryKey: ["orders"],
//         queryFn: async () => {
//             const { data, error } = await supabase.from("orders").select("*");

//             if (error) {
//                 throw new Error(error.message)
//             }

//             return data
//         }
//     })
// }

export const useAdminOrderList = ({ archived = false }) => {

    const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"]

    return useQuery({
        // queryKey: ["orders"],
        // including distinction between archived and actrive orders using archived as indicator for that
        queryKey: ["orders", { archived }],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*")
                // .in("status", ["New", "Delivered", "Cooking", "Delivering"]);
                .in("status", statuses).order("created_at", { ascending: false });

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}

export const useMyOrderList = () => {
    const { session } = useAuth()
    const id = session?.user.id;

    return useQuery({
        queryKey: ["orders", { userId: id }],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders")
                .select("*").eq("user_id", id!).order("created_at", { ascending: false });

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: async () => {
            const { data, error }
                = await supabase.from("orders")
                    // .select("*")

                    // querying nested data
                    // so that we can also include order_items and all its products in them
                    .select("*, order_items(*, products(*))")
                    .eq("id", id) // returrn in array form
                    .single(); // only data will be return in obj form

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient()

    // const {session} = useAuth()
    // const id = session?.user.id

    return useMutation({
        async mutationFn(data: InsertTables<"orders">) {
            // const {error, data: newProduct} = await supabase.from("orders").insert({...data, user_id: id!}).single()
            const { error, data: newProduct } = await supabase.from("orders").insert(data).select().single()

            if (error) {
                throw new Error(error.message)
            }

            return newProduct
        },

        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ["orders"] })
            // await queryClient.invalidateQueries("products")
        },

        async onError() {
            console.log("fetch failed!!")
        }
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(
            { id, updatedFields }
                :
                { id: number, updatedFields: UpdateTables<"orders"> }
        ) {
            const { error, data: updatedOrder } = await supabase.from("orders").update(updatedFields)
                .eq("id", id)
                .select()
                .single()

            if (error) {
                throw new Error(error.message)
            }

            return updatedOrder
        },

        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries({ queryKey: ["orders"] })
            await queryClient.invalidateQueries({ queryKey: ["orders", id] })
        },

        async onError() {
            console.log("fetch failed!!")
        }
    })
}