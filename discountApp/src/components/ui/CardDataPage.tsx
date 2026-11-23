import ColorPicker, { HueSlider } from "reanimated-color-picker";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import {router} from "expo-router";

import { generalScales, useGlobalStyles, useGetTextColor } from "@/styles/useGlobalStyles";

import AntDesign from '@expo/vector-icons/AntDesign';

export function CardData({setCodeData, codeData, setName, color, setColor, showCodeInput=true, name}:
    {setCodeData?:(value: string) => void, codeData?:string, setName:(name:string) => void, color:string, 
        setColor:(color:string) => void, showCodeInput?:boolean, name?:string}){//Общая страница для добавления карты или изменения
    const globalStyles = useGlobalStyles();
    const textColor = useGetTextColor();

    return (
    <View style={styles.card}>
        <TextInput placeholderTextColor="lightgray" placeholder="Название" value={name} onChangeText={setName} style={globalStyles.textInput}/>
        {showCodeInput ? <View style={styles.codeDataView}>
            <TextInput placeholderTextColor="lightgray" keyboardType="number-pad"
                placeholder="Код карты" style={[globalStyles.textInput, styles.codeDataInput]}
                value={codeData} onChangeText={setCodeData}/>
            
            <TouchableOpacity>
                <AntDesign style={styles.codeDataIcon} name="camera" size={24} color={textColor} onPress={() => router.push("/Scanner")}/>
            </TouchableOpacity>
        </View> : null}
        <ColorPicker style={styles.colorPicker} value={color} onChangeJS={(color) => setColor(color.hex)}>
            <HueSlider />
        </ColorPicker>
    </View>);
}

const styles = StyleSheet.create({
    card:{
        borderRadius: generalScales.lg,
        borderColor: "lightgray",
        borderWidth: 0.1,
        padding:20,
        gap:20,
        marginTop:5,
        width:"100%",
        aspectRatio:1.6
    },
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
    colorPicker:{
        width:"100%",
        marginTop:10
    }
});