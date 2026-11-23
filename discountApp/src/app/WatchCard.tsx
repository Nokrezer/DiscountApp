import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { generalScales, useGetTextColor, useGlobalStyles } from "@/styles/useGlobalStyles";

import { useGetCard } from "@/hooks/useGetOneCard";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { Card } from "@/components/ui/Сard";

import { Toast } from "toastify-react-native";

import QRCode from "react-qr-code";

import { errorMessages } from "@/constants/errors";
// @ts-expect-error
import { Barcode } from 'expo-barcode-generator';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useAutoBright } from "@/hooks/useAutoBright";

import { EditCardMenu } from "@/components/ui/EditCardMenu";

export default function WatchCard(){
    const {id} = useLocalSearchParams() as { id?: number };
    const textColor = useGetTextColor();
    const globalStyles = useGlobalStyles();
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    
    useEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => {setMenuVisible(true)}}>
                <AntDesign name="menu" size={24} color={textColor} />
            </TouchableOpacity>
        ),
    })}, [navigation, textColor]);

    //Когда пользователь на странице выставляет яркость 100%, и возвращает обратно когда пользователь уходит
    useAutoBright();
    
    if(!id) return;

    const {cardData, loading} : {cardData?:Record<any, any>; loading:boolean} = useGetCard({id: id });
    
    if(loading) return <View/>;

    if(!cardData){
        Toast.error(errorMessages.errorLoadCard);
        return;
    }
    
    return (
        <ThemedView style={[globalStyles.screen]}>
            <SafeAreaView style={[globalStyles.safeArea]}>
                <Card name={cardData.name} color={cardData.color}/>
                    <View style={styles.barcode}>
                        {cardData.code_type === "QR" ?  
                        <QRCode value={cardData.code_data} bgColor="white"/> :
                        <View>
                            <Barcode value={cardData.code_data}
                                    options={{ format: cardData.code_type, background: 'white',
                                    width: (cardData.code_data.length < 13 ? 4 : 2), height:120, fontSize:14, marginLeft:-20, displayValue:false }}/>
                        <Text style={styles.codeDataText}>{cardData.code_data}</Text>
                        </View>
                        }
                    </View>
            </SafeAreaView>
            {menuVisible ? <EditCardMenu id={id} name={cardData.name} onClose={() => setMenuVisible(false)}/> : null}
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
        alignItems: "center",
    },
    codeDataText:{
        textAlign:"center",
        color:"gray"
    }
});