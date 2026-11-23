import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
import { fullCardData } from "@/constants/types";

export default function WatchCard(){
    const {id} = useLocalSearchParams() as { id?: number };
    const textColor = useGetTextColor();
    const globalStyles = useGlobalStyles();
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    
    //Когда пользователь на странице выставляет яркость 100%, и возвращает обратно когда пользователь уходит
    useAutoBright();

    const {cardData, loading} : {cardData?:fullCardData; loading:boolean} = useGetCard({id: id ?? null});

    useEffect(() => {
        navigation.setOptions({
        title:cardData?.name ?? "",
        headerRight: () => (
            <TouchableOpacity onPress={() => {setMenuVisible(true)}}>
                <AntDesign name="menu" size={24} color={textColor} />
            </TouchableOpacity>
        ),
    })}, [navigation, textColor, cardData?.name]);
    
    if(loading) return <View/>;

    if(!cardData || !id){
        Toast.error(errorMessages.errorLoadCard);
        return;
    }
    
    return (
        <ThemedView style={[globalStyles.screen]}>
            <SafeAreaView style={[globalStyles.safeArea]}>
                <Card name={cardData.name} color={cardData.color} logoDomain={cardData.logo_domen} fastImage={true}/>
                    <View style={styles.barcode}>
                        {cardData.code_type === "QR" ?  
                        <QRCode value={cardData.code_data} bgColor="white"/> :
                        <View>
                            <Barcode value={cardData.code_data}
                                    options={{ format: cardData.code_type, background: 'white',
                                    width: (cardData.code_data.length < 13 ? 3 : 2), height:100, fontSize:14, marginLeft:-20, displayValue:true }}/>
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