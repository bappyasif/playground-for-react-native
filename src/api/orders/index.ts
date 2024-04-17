import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

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

export const useAdminOrderList = ({archived= false}) => {

    const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"]

    return useQuery({
        // queryKey: ["orders"],
        // including distinction between archived and actrive orders using archived as indicator for that
        queryKey: ["orders", {archived}],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*")
            // .in("status", ["New", "Delivered", "Cooking", "Delivering"]);
            .in("status", statuses);

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}

export const useMyOrderList = () => {
    const {session} = useAuth()
    const id = session?.user.id;

    return useQuery({
        queryKey: ["orders", {userId: id}],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*").eq("user_id", id!);

            if (error) {
                throw new Error(error.message)
            }

            return data
        }
    })
}