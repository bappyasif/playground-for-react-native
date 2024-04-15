import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type AuthData = {
    session: Session | null,
    loading: Boolean,
    profile: any,
    isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
})

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                Alert.alert(error.message)
                return
            }
            setSession(session)
            // now we know our session is loaded and wont be seeing a null even if user is authenticated
            // setLoading(false)

            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }

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
        <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === "ADMIN" }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)