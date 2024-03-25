import { useEffect } from "react"
import * as WebBrowser from "expo-web-browser"

// it recommended by clerk community for android devices, as it helps those devices to prepare for auth checks (i.e. sign-in)
export const useWarmupBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();

        return () => {
            void WebBrowser.coolDownAsync();
        }
    }, [])
}