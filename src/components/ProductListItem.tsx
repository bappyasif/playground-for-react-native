import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type ProductListItemProps = {
    product: Product
}

export const defaultPicture = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

const ProductListItem = ({ product }: ProductListItemProps) => {
    return (
        <Link 
            // href={"/product"} 
            // href={`/product/${product.id}`} 
            // href={`/(tabs)/menu/${product.id}`} // we can ommit (tabs) as that is optional for routing
            href={`/menu/${product.id}`} 
            asChild
        >
            {/* view doesnt have onPress method */}
            {/* to make it clickable we can use Pressable */}
            {/* <View style={styles.container}> */}
            <Pressable style={styles.container}>
                <Image source={{ uri: product.image || defaultPicture }} style={styles.image} resizeMode='contain' />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 11,
        borderRadius: 11,
        // margin: 4,
        maxWidth: "50%"
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