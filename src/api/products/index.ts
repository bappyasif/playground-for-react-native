import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

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