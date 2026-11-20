import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {router} from "expo-router";

import { Toast } from 'toastify-react-native';

import { useGetTextColor, useGlobalStyles } from "@/styles/useGlobalStyles";

import Ionicons from '@expo/vector-icons/Ionicons';

const backPage = (codeData:any) => router.dismissTo({pathname:"/card", 
                                        params:{codeData:JSON.stringify(codeData)}});

export default function Scanner(){
    const globalStyles = useGlobalStyles();
    const [flashState, setFlashState] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    
    const textColor = useGetTextColor();

    if (!permission)//ждем загрузку разрешения
        return <View/>;

    if(permission.granted)
        Toast.error("Пользователь не дал доступ к камере");

    return (
        <SafeAreaView style={styles.screen}>
            <CameraView style={styles.screen} facing={"back"} enableTorch={flashState} onBarcodeScanned={(data) => alert(JSON.stringify(data))}>
            
                <View style={styles.buttonBar}> 
                    <TouchableOpacity style={[styles.flashButton, styles.buttons]} onPress={() => setFlashState(!flashState)}>
                        {flashState ?
                            <Ionicons name="flash" size={45} color={textColor}/> :
                            <Ionicons name="flash-off" size={45} color={textColor}/>
                        }
                    </TouchableOpacity>
                </View>
            </CameraView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    buttonBar:{
        flexDirection:"row",
        bottom:0,
        width:"100%",
        paddingHorizontal:"10%",
        paddingBottom:20,
        backgroundColor:"transparent",
        position:"absolute"
    },
    buttons:{
        // marginHorizontal:"auto"
    },
    flashButton:{
        marginLeft:"auto"
    }
});