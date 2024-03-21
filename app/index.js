import { Stack, useRouter } from "expo-router"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { COLORS, SIZES, icons, images } from "../constants"
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn"
import Welcome from "../components/home/welcome/Welcome"
import Popularjobs from "../components/home/popular/Popularjobs"
import Nearbyjobs from "../components/home/nearby/Nearbyjobs"


const Home = () => {
    const router = useRouter()
    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,
                    headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension="90%" />,
                    headerTitle: ""
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View 
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home