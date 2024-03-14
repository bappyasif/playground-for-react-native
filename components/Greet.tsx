import { Text, View } from "react-native"

export const Greet = ({name}: {name: string}) => {
    return (
        <View>
            <Text>Hello, {name}</Text>
        </View>
    )
}