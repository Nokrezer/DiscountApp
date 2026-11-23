import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/ui/Сard";

import { generalScales, useGlobalStyles } from "@/styles/useGlobalStyles";

import { Toast } from 'toastify-react-native';

import { CardData } from '@/components/ui/CardDataPage';
import { successMessages } from '@/constants/messages';

import { cardDatabase } from '@/database/database';

export default function EditCard(){
    const {id:id_} = useLocalSearchParams<{id?:string}>();
    const id = Number(id_);
    const [name, setName] = useState<string>("");//Имя карты
    const [color, setColor] = useState<string>("purple");
    const [logoDomain, setLogoDomain] = useState<string>("");

    const globalStyles = useGlobalStyles();

    useEffect(() => {(async() => {
        if(!id)
            return;

        const cardData = await cardDatabase.getCard(id);
        setName(cardData.name);
        setColor(cardData.color);
        setLogoDomain(cardData.logo_domen);
    })()}, []);

    const onEditCardCallback = async () => {//При нажатии на кнопку "изменить"
        await cardDatabase.editCard(id, name, color, logoDomain);
        
        Toast.success(successMessages.cardChanged);
        router.navigate({pathname:'/'});
        // router.dismissTo({pathname:"/", params:{editCardId:JSON.stringify(id)}})
    };

    const addButtonDisabled:boolean = name.length === 0;
    
    return(
    <ThemedView style={globalStyles.screen}>
        <SafeAreaView style={globalStyles.safeArea}>

            <Card name={name} color={color} logoDomain={logoDomain}/>
            <CardData logoDomain={logoDomain} setLogoDomain={setLogoDomain}  showCodeInput={false} setName={setName} color={color} setColor={setColor} name={name}/>
            
            <TouchableOpacity style={[styles.addButtonCard, addButtonDisabled ? styles.disabledEditButtonCard : null]} 
                onPress={onEditCardCallback} disabled={addButtonDisabled}>
                <ThemedText style={styles.addButtonText}>Изменить</ThemedText>
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
    disabledEditButtonCard:{
        backgroundColor: '#2e31356e'
    },
    addButtonText:{
        textAlign:"center",
        marginVertical:"auto"
    },
});