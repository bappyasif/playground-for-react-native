import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Listing } from '@/interfaces/listing'
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    data: Listing[];
    category: string
}

const ListingsBottomSheet = ({ category, data }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ["10%", "100%"], [])
    const [refresh, setRefresh] = useState(0)
    const showMap = () => { 
        bottomSheetRef.current?.collapse()
        setRefresh(prev => prev + 1)
     }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            style={styles.sheetContainer}
        >
            <View style={{ flex: 1 }}>
                <Listings category={category} data={data} refresh={refresh} />
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={styles.btnText}>Map</Text>
                        <Ionicons name='map' size={22} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    absoluteBtn: {
        position: "absolute",
        bottom: 31,
        width: "100%",
        alignItems: "center"
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 15,
        height: 51,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 29,
        gap: 8
    },
    btnText: {
        fontFamily: "mont-sb",
        color: "#fff"
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    }
});

export default ListingsBottomSheet