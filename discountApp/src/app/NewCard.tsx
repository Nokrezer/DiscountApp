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

    const [name, setName] = useState<string>();//Имя карты
    const [codeType, setCodeType] = useState<string | null>(null);//тип штрих кода(если сканируется через камеру)
    const [codeData, setCodeData] = useState<string>("");//код штриха/qr
    const [color, setColor] = useState<string>("purple");

    const globalStyles = useGlobalStyles();

    useEffect(() => {//useEffect срабатывает когда пользователь сканирует карту через камеру
        if(!data) return;

        //Если данные в строке, преобразуем в словарь
        const codeDataDict = typeof data === "string" ? JSON.parse(data) : codeData;
        setCodeData(codeDataDict.raw);
        setCodeType(codeDataDict.type);
    }, [data]);

    const onAddNewCardCallback = async () => {//При нажатии на кнопку "добавить"
        //сохраняем и получаем id добавленной карты(lastInsertRowId). Может вернуть ошибку
        const response = await saveCard({name, codeData, codeType, color}) as Record<"lastInsertRowId", number> | Error;
        if(response instanceof Error){
            Toast.error(errorMessages.errorAddingCard);
            router.back();
            return;
        }
        
        Toast.success(successMessages.cardAdded);
        router.dismissTo({pathname:"/", params:{newCardId:JSON.stringify(response.lastInsertRowId)}})
    };

    const addButtonDisabled:boolean = (!name || (codeData ?? "").length < 13);
    
    return(
    <ThemedView style={globalStyles.screen}>
        <SafeAreaView style={globalStyles.safeArea}>

            <Card name={name} color={color}/>
            <CardData setCodeData={setCodeData} codeData={codeData} setName={setName} color={color} setColor={setColor}/>
            
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