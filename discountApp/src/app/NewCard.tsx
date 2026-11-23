import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/ui/Сard";

import { generalScales, useGlobalStyles } from "@/styles/useGlobalStyles";

import { saveCard } from '@/services/saveCard';
import { Toast } from 'toastify-react-native';

import { errorMessages } from '@/constants/errors';
import { successMessages } from '@/constants/messages';
import { CardData } from '@/components/ui/CardDataPage';

export default function NewCard(){
    const {codeData:data} = useLocalSearchParams();

    const [name, setName] = useState<string>("");//Имя карты
    const [codeType, setCodeType] = useState<string | null>(null);//тип штрих кода(если сканируется через камеру)
    const [codeData, setCodeData] = useState<string>("");//код штриха/qr
    const [color, setColor] = useState<string>("purple");
    const [logoDomain, setLogoDomain] = useState<string>("");

    const globalStyles = useGlobalStyles();

    useEffect(() => {//useEffect срабатывает когда пользователь сканирует карту через камеру
        if (typeof data !== "string") return;

        try {
            const parsed = JSON.parse(data);
            if (typeof parsed?.raw === "string") setCodeData(parsed.raw);
            if (typeof parsed?.type === "string") setCodeType(parsed.type);
        } catch {
            Toast.error(errorMessages.errorWhenScaning);
        }
    }, [data]);

    const onAddNewCardCallback = async () => {//При нажатии на кнопку "добавить"
        //сохраняем и получаем id добавленной карты(lastInsertRowId). Может вернуть ошибку
        const response = await saveCard({name, codeData, rawType:codeType, color, logoDomain}) as Record<"lastInsertRowId", number> | Error;
        if(response instanceof Error){
            Toast.error(errorMessages.errorAddingCard);
            router.back();
            return;
        }
        
        Toast.success(successMessages.cardAdded);
        router.navigate({pathname:"/"});
    };

    const addButtonDisabled:boolean = (!name || (codeData ?? "").length < 3 || (name.replaceAll(" ", "") === ""));
    
    return(
    <ThemedView style={globalStyles.screen}>
        <SafeAreaView style={globalStyles.safeArea}>

            <Card name={name} color={color} logoDomain={logoDomain}/>
            <CardData logoDomain={logoDomain} setLogoDomain={setLogoDomain} setCodeData={setCodeData} codeData={codeData} setName={setName} color={color} setColor={setColor}/>
            
            <TouchableOpacity style={[styles.addButtonCard, addButtonDisabled ? styles.disabledAddButtonCard : null]} 
                onPress={onAddNewCardCallback} disabled={addButtonDisabled}>
                <ThemedText style={styles.addButtonText}>Добавить</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    </ThemedView>);
}

const styles = StyleSheet.create({
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
    },
});