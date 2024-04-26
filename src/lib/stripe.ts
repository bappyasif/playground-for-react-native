import { Alert } from "react-native"
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native"

const fetchPaymentSheetParams = async (amount: number) => {
    const {data, error} = await supabase.functions.invoke("payment-sheet", {
        body: {amount}
    })

    if(data) {
        return data
    }

    Alert.alert("Error while fetching payment sheet params")
    return {}

}

export const initialisePaymentSheet = async (amount: number) => {
    console.log("initialising payment sheet for", amount)

    const data = await fetchPaymentSheetParams(amount)
    console.log(data)

    const {paymentIntent, publisableKey, customer, ephemeralKey} = data;

    if(!paymentIntent || !publisableKey) return

    await initPaymentSheet({
        merchantDisplayName: "ab cd",
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: "a.b."
        }
    })
}

export const openPaymentSheet = async() => {
    const {error} = await presentPaymentSheet();

    if(error) {
        Alert.alert(error.message)
        return false
    }

    return true
}