import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useWarmupBrowser } from '@/hooks/warmupBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
  Microsoft = "oauth_microsoft"
}

const LoginModalPage = () => {
  useWarmupBrowser();

  const router = useRouter()

  const { startOAuthFlow: apple_oauth } = useOAuth({ strategy: "oauth_apple" })
  const { startOAuthFlow: facebook_oauth } = useOAuth({ strategy: "oauth_facebook" })
  const { startOAuthFlow: google_oauth } = useOAuth({ strategy: "oauth_google" })
  const { startOAuthFlow: microsoft_oauth } = useOAuth({ strategy: "oauth_microsoft" })

  const onSelectAuth = async (strategy: Strategy) => {
    // basically checking based on each key recieved from parameter to match corresponding oauth flow
    const authSlected = {
      [Strategy.Apple]: apple_oauth,
      [Strategy.Facebook]: facebook_oauth,
      [Strategy.Google]: google_oauth,
      [Strategy.Microsoft]: microsoft_oauth
    }[strategy]

    try {
      const { createdSessionId, setActive } = await authSlected()
      console.log("session ID:", createdSessionId)

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (error) {
      console.error("OAuth error", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 30 }]} />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue With Mobile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name='logo-facebook' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name='logo-apple' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue With Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name='logo-google' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Microsoft)}>
          <Ionicons name='logo-microsoft' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue With Microsoft</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26
  },

  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30
  },
  separator: {
    fontFamily: "mont-sb",
    color: Colors.grey
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mont-sb',
  },
})

export default LoginModalPage