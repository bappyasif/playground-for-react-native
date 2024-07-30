import { DayListItem } from '@/components/core/DayListItem';
import { FlatList, StyleSheet, View } from 'react-native';

export default function HomeScreen() {

    const nums = [...Array(24)].map((v, i) => i + 1)

    return (
        <View style={styles.container}>
            <FlatList
                data={nums}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <DayListItem day={item} />
                )}
                numColumns={2}
                columnWrapperStyle={styles.column}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    content: {
        gap: 10,
        padding: 20
    },

    column: {
        gap: 10
    },
});