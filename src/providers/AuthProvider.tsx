import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type AuthData = {
    session: Session | null,
    loading: Boolean
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true
})

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                Alert.alert(error.message)
                return
            }
            setSession(data?.session)
            // now we know our session is loaded and wont be seeing a null even if user is authenticated
            setLoading(false)
        }

        fetchSession()

        // we also need to subscribe to auth chnage state so that our context is also gets updated 
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, [])
    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)