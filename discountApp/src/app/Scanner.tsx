import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {router} from "expo-router";

import { Toast } from 'toastify-react-native';

import { useGetTextColor, useGlobalStyles } from "@/styles/useGlobalStyles";

import Ionicons from '@expo/vector-icons/Ionicons';
import { errorMessages } from '@/constants/errors';

const backPage = (codeData:any) => router.dismissTo({pathname:"/NewCard", 
                                        params:{codeData:JSON.stringify(codeData)}});

export default function Scanner(){
    const [flashState, setFlashState] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    
    const textColor = useGetTextColor();

    useEffect(() => {
        if(permission){
            if (!permission.granted && permission.canAskAgain)
                requestPermission();
            if(!permission.granted && !permission.canAskAgain){//Если пользователь запретил использовать камеру
                Toast.error(errorMessages.cameraPermissionGranted);
                router.back();
            }
        }
    }, [permission]);
    
    if (!permission || !permission.granted)//ждем загрузку разрешения
        return <View/>;

    return (
        <SafeAreaView style={styles.screen}>
            <View style={{flex:1}}>
                <CameraView style={styles.screen} facing={"back"} enableTorch={flashState} onBarcodeScanned={(data) => backPage(data)}/>
                <View style={styles.buttonBar}> 
                    <TouchableOpacity style={[styles.flashButton]} onPress={() => setFlashState(!flashState)}>
                        {flashState ?
                            <Ionicons name="flash" size={45} color={textColor}/> :
                            <Ionicons name="flash-off" size={45} color={textColor}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
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
    flashButton:{
        marginLeft:"auto"
    }
});