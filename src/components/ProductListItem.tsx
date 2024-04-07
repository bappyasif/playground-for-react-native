import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Image, StyleSheet, Text, View } from 'react-native';

type ProductListItemProps = {
    product : Product
}

const defaultPicture = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

const ProductListItem = ({ product }: ProductListItemProps) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image || defaultPicture }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "white",
        padding: 11,
        borderRadius: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: "blue",
        marginVertical: 11
    },
    price: {
        color: Colors.light.tint,
        fontWeight: "bold"
    },
    image: {
        width: "100%",
        aspectRatio: 1
    }
});

export default ProductListItem