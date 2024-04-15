import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductsList = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*");

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const { data, error }
                = await supabase.from("products")
                    .select("*")
                    .eq("id", id) // returrn in array form
                    .single(); // only data will be return in obj form

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}

export const useInsertProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: any) {
            const {error, data: newProduct} = await supabase.from("products").insert({
                name: data?.name,
                price: data?.price,
                image: data?.image
            }).single()

            if (error) {
                throw new Error(error.message)
            }

            return newProduct
        },

        async onSuccess () {
            await queryClient.invalidateQueries({queryKey: ["products"]})
            // await queryClient.invalidateQueries("products")
        },

        async onError () {
            console.log("fetch failed!!")
        }
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: any) {
            const {error, data: updateProduct} = await supabase.from("products").update({
                name: data?.name,
                price: data?.price,
                image: data?.image
            })
            .eq("id", data?.id)
            .select()
            .single()

            if (error) {
                throw new Error(error.message)
            }

            return updateProduct
        },

        async onSuccess (_, data) {
            await queryClient.invalidateQueries({queryKey: ["products"]})
            await queryClient.invalidateQueries({queryKey: ["products", data?.id]})
        },

        async onError () {
            console.log("fetch failed!!")
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const{error} = await supabase.from("products").delete().eq("id", id)

            if (error) {
                throw new Error(error.message)
            }
        },

        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["products"]})
        }
    })
}