import { useEffect } from 'react';
import { StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming, Easing
} from 'react-native-reanimated';

export default function Loading(){
     const scale = useSharedValue(1);
    
    useEffect(() => {
        scale.value = withRepeat(withTiming(360, {duration:1000, easing: Easing.linear}), 0, false);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${scale.value}deg` }],
    }));


    return (<Animated.View style={[styles.loadingCircle, animatedStyle]} />);
}

const styles = StyleSheet.create({
    loadingCircle:{
        borderRadius: "100%",
        width:50,
        height:10,
        backgroundColor:'green',
        margin:"auto"
    }
});