import { ThemedView } from "@/components/themed-view";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { generalScales, useGlobalStyles } from "@/styles/useGlobalStyles";

import { useGetCard } from "@/hooks/useGetOneCard";
import { useLocalSearchParams } from "expo-router";

import { Card } from "@/components/ui/Сard";

import { Toast } from "toastify-react-native";

import QRCode from "react-qr-code";
// @ts-expect-error
import { Barcode } from 'expo-barcode-generator';


export default function WatchCard(){
    const {id} = useLocalSearchParams() as { id?: number };
    if(!id)
        return <View/>;

    const globalStyles = useGlobalStyles();
    const {cardData, loading} : {cardData?:Record<any, any>; loading:boolean} = useGetCard({id: id });
    
    if(loading)
        return <View/>;

    if(!cardData){
        Toast.error("Не удалось загрузить карту");
        return;
    }
    
    return (
        <ThemedView style={globalStyles.screen}>
            <SafeAreaView style={globalStyles.safeArea}>
                <Card name={cardData.name} color={cardData.color}/>
                    <View style={styles.barcode}>
                        {cardData.code_type === "QR" ?  
                        <QRCode value={cardData.code_data} bgColor="white" /> :
                        <Barcode value={cardData.code_data}
                                options={{ format: 'EAN13', background: 'white',
                                width:4, height:100, fontSize:14, marginLeft:-20, displayValue:false }}/>
                        }
                    </View>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    barcode:{
        borderRadius: generalScales.md,
        backgroundColor:"white",
        width:"100%",
        paddingVertical:10,
        display: "flex",
        // justifyContent: "center", /* по горизонтали */
        alignItems: "center",
    },
});