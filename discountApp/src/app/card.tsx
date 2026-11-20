import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { generalScales, useGetTextColor, useGlobalStyles } from "@/styles/useGlobalStyles";

import AntDesign from '@expo/vector-icons/AntDesign';


export default function Card(){
    const {codeData} = useLocalSearchParams();
    
    const [name, setName] = useState<string>();//Имя карты
    const [codeType, setCodeType] = useState<string | null>(null);//тип штрих кода(если сканируется через камеру)
    const [cardCode, setCardCode] = useState<string>();//код штриха/qr

    const globalStyles = useGlobalStyles();
    const textColor = useGetTextColor();

    useEffect(() => {
        if(!codeData)
            return;

        const codeDataDict = typeof codeData === "string" ? JSON.parse(codeData) : codeData;
        setCardCode(codeDataDict.raw);
    }, [codeData]);
    
    return(
    <ThemedView style={globalStyles.screen}>
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={[styles.card, styles.resultCard]}>
                <ThemedText style={styles.resultCardText}>{name}</ThemedText>
            </View>

            <View style={styles.card}>
                <TextInput placeholderTextColor="lightgray" placeholder="Название" onChangeText={setName} style={globalStyles.textInput}/>
                <View style={styles.cardCodeView}>
                    <TextInput placeholderTextColor="lightgray" keyboardType="number-pad"
                                placeholder="Код карты" style={[globalStyles.textInput, styles.cardCodeInput]}
                                value={cardCode} onChangeText={setCardCode}/>
                    <TouchableOpacity>
                        <AntDesign style={styles.cardCodeIcon} name="camera" size={24} color={textColor} onPress={() => router.push("/scanner")}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <FontAwesome5 style={styles.cardCodeIcon} name="file-import" size={24} color={textColor}/>
                    </TouchableOpacity> */}
                </View>
                {/* <TouchableOpacity style={globalStyles.textInput}>
                    <ThemedText>Цвет карты</ThemedText>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.addButtonCard}>
                <ThemedText style={styles.addButtonText}>Добавить</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    </ThemedView>);
}

const styles = StyleSheet.create({
    cardCodeView:{
        flexDirection:"row",
        width:"100%"
    },
    cardCodeInput:{
        flex:1
    },
    cardCodeIcon:{
        marginVertical:"auto",
        marginLeft:10
    },
    resultCard:{
        backgroundColor:"purple",
    },
    resultCardText:{
        margin:"auto",
        textTransform:"uppercase"
    },
    card:{
        borderRadius: generalScales.lg,
        borderColor: "lightgray",
        borderWidth: 0.1,
        padding:20,
        gap:20,
        marginVertical:15,
        height:200
    },
    addButtonCard:{
        width:"100%",
        backgroundColor:"#A631AA",
        marginTop:"auto",
        marginHorizontal:"auto",
        height:40,
        borderRadius:generalScales.sm,
    },
    addButtonText:{
        textAlign:"center",
        marginVertical:"auto"
    }
});