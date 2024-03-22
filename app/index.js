import { Stack, useRouter } from "expo-router"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { COLORS, SIZES, icons, images } from "../constants"
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn"
import Welcome from "../components/home/welcome/Welcome"
import Popularjobs from "../components/home/popular/Popularjobs"
import Nearbyjobs from "../components/home/nearby/Nearbyjobs"
import { useState } from "react"


const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

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
                    <Welcome 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if(searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home