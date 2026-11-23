import { router } from "expo-router";
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

import { generalScales, useGetTextColor } from "@/styles/useGlobalStyles";

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { cardDatabase } from "@/database/database";
import { Toast } from "toastify-react-native";
import { successMessages } from "@/constants/messages";
import { errorMessages } from "@/constants/errors";

const deleteAlert = (cardName:string, cardId:number) => Alert.alert(`Вы уверены что хотите удалить карту "${cardName}"?`,
    'Это действие нельзя отменить!', [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: async () => {
            try{
                await cardDatabase.deleteCard(cardId);
                Toast.success(successMessages.cardDeleted);
            }catch(error){
                Toast.error(errorMessages.errorWhenDelete);
            }
            finally{
                router.navigate({pathname:"/"});
            }
        }},
]);

export function EditCardMenu({id, name, onClose}:{id:number, name:string, onClose:() => void}){
    const textColor = useGetTextColor();

    const onEditCallback = () => {
        router.push({pathname:"/EditCard", params:{id:id}});
        onClose();
    };

    const onRemoveCallback = () => {
        deleteAlert(name, id);
        onClose();
    };
    
    return (
    <Modal
        transparent={true}
        visible={true}
        animationType="fade">
        <TouchableOpacity style={styles.closeBg} onPress={onClose}/>
        <View style={styles.menu}>

            <TouchableOpacity style={styles.button} onPress={onRemoveCallback}>
                <EvilIcons name="trash" size={30} color="red" />
                <ThemedText style={styles.text}>Удалить</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onEditCallback}>
                <MaterialIcons name="mode-edit" size={30} color={textColor} />
                <ThemedText style={[styles.text,]}>Изменить</ThemedText>
            </TouchableOpacity>
        </View>
    </Modal>);
}

const styles = StyleSheet.create({
    menu:{
        position:"absolute",
        bottom:0,
        borderRadius:generalScales.bg,
        backgroundColor:'#151a30',
        width:"100%",
        paddingHorizontal:20,
        paddingVertical:10
    },
    button:{
        flexDirection:"row",
        width:"100%",
        gap:5
    },
    text:{
        fontSize:20,
        textAlignVertical:"center"
    },
    closeBg:{
        backgroundColor:"#00000077",
        flex:1
    }
});