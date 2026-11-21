import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {Card} from "@/components/ui/Сard";

import { generalScales, useGetTextColor, useGlobalStyles } from "@/styles/useGlobalStyles";

import AntDesign from '@expo/vector-icons/AntDesign';

import { saveCard } from '@/services/saveCard';
import { Toast } from 'toastify-react-native';

export default function NewCard(){
    const {codeData:data} = useLocalSearchParams();

    const [name, setName] = useState<string>();//Имя карты
    const [codeType, setCodeType] = useState<string | null>(null);//тип штрих кода(если сканируется через камеру)
    const [codeData, setcodeData] = useState<string>();//код штриха/qr

    const globalStyles = useGlobalStyles();
    const textColor = useGetTextColor();

    useEffect(() => {
        if(!data)
            return;

        const codeDataDict = typeof data === "string" ? JSON.parse(data) : codeData;
        setcodeData(codeDataDict.raw);
        setCodeType(codeDataDict.type);
    }, [data]);

    const saveCardCallback = async () => {
        const response = await saveCard({name, codeData, codeType, color:"purple"});
        if(response)
            Toast.error("Ошибка добавления карты");
        else
            Toast.success("Карта добавлена");
    };
    
    return(
    <ThemedView style={globalStyles.screen}>
        <SafeAreaView style={globalStyles.safeArea}>

            <Card name={name} color={"purple"}/>

            <View style={styles.card}>
                <TextInput placeholderTextColor="lightgray" placeholder="Название" onChangeText={setName} style={globalStyles.textInput}/>
                <View style={styles.codeDataView}>
                    <TextInput placeholderTextColor="lightgray" keyboardType="number-pad"
                                placeholder="Код карты" style={[globalStyles.textInput, styles.codeDataInput]}
                                value={codeData} onChangeText={setcodeData}/>
                    <TouchableOpacity>
                        <AntDesign style={styles.codeDataIcon} name="camera" size={24} color={textColor} onPress={() => router.push("/Scanner")}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <FontAwesome5 style={styles.codeDataIcon} name="file-import" size={24} color={textColor}/>
                    </TouchableOpacity> */}
                </View>
                {/* <TouchableOpacity style={globalStyles.textInput}>
                    <ThemedText>Цвет карты</ThemedText>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={[styles.addButtonCard, (!name || !codeData) ? styles.disabledAddButtonCard : null]} onPress={saveCardCallback} disabled={(!name || !codeData)}>
                <ThemedText style={styles.addButtonText}>Добавить</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    </ThemedView>);
}

const styles = StyleSheet.create({
    codeDataView:{
        flexDirection:"row",
        width:"100%"
    },
    codeDataInput:{
        flex:1
    },
    codeDataIcon:{
        marginVertical:"auto",
        marginLeft:10
    },
    card:{
        borderRadius: generalScales.lg,
        borderColor: "lightgray",
        borderWidth: 0.1,
        padding:20,
        gap:20,
        marginTop:5,
        // height:200,
        width:"100%",
        aspectRatio:1.6
    },
    addButtonCard:{
        width:"100%",
        backgroundColor:"#A631AA",
        marginTop:"auto",
        marginHorizontal:"auto",
        height:40,
        borderRadius:generalScales.sm,
    },
    disabledAddButtonCard:{
        backgroundColor: '#2e31356e'
    },
    addButtonText:{
        textAlign:"center",
        marginVertical:"auto"
    }
});