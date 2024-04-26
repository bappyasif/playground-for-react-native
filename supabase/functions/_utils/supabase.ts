import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { stripe } from './stripe';

export const createOrRetrieveProfile = async (req: Request) => {
    const supabaseClient = createClient(
        // these environments variables will be generated automatically
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
            global: {
                headers: { Authorization: req.headers.get('Authorization')! },
            },
        }
    );
    // Now we can get the session or user object
    const {
        data: { user },
    } = await supabaseClient.auth.getUser();

    console.log(user);
    if (!user) throw new Error('No user found');

    // filtering out only related user profile
    const{data: profile, error} = await supabaseClient.from("profile").select("*").eq("id", user?.id).single()

    if(error || !profile) {
        throw new Error("Profile is not found")
    }

    // also only linking stripe profile one for each client
    if(profile.stripe_customer_id) {
        return profile.stripe_customer_id
    }

    // when there is no already existing customer stripe id then we are creating a new stripe customer id
    const customer = await stripe.customers.create({
        email: user.email,
        metadata: {uid: user.id}
    })

    // updating customer stripe id in database so that in next cycle this value is found for transaction
    await supabaseClient.from("profiles").update({stripe_customer_id: customer.id}).eq("id", profile.id)

    // finally returning cutomer id to caller
    return customer.id
};