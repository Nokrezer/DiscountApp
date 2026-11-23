import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import {useState, useEffect} from "react";
import {router} from "expo-router";

import { Toast } from 'toastify-react-native';
import { errorMessages } from '@/constants/errors';

export function useGetCameraPermission(){
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(permission && !permission.granted){
            if (permission.canAskAgain)
                requestPermission();
            if(!permission.canAskAgain){//Если пользователь запретил использовать камеру
                Toast.error(errorMessages.cameraPermissionGranted);
                router.back();
            }
        }
        if(permission && permission.granted)
            setLoading(false);
    }, [permission]);
    
    return loading;
}