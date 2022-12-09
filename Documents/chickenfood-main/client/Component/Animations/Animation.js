import { Animated, View} from "react-native";
import { useRef, React, useEffect} from "react";


//This is a reusable animation components that takes props from parent component of where it is applied. This is for translate Y and opacity and best used on text elements. That is moving up


const AnimatedMoveY = (props)=>{
   
    const moveUp = useRef(new Animated.Value(props.translateYInitialValue)).current;
    const customOpacity = useRef(new Animated.Value(props.customOpacityInitialValue)).current;

    const moveUpAni = ()=>{
        Animated.timing(moveUp, {
            toValue: props.translateYEndValue,
            duration:props.animationDuration,
            useNativeDriver: true
        }).start()
    }


const customOpacityAnim = ()=>{
    Animated.timing(customOpacity, {
        toValue: props.opacityEndValue,
        duration:props.animationDuration,
        useNativeDriver: true
    }).start()
}

    const animatedStyle = {
        transform: [
            {
                translateY: moveUp
            }
        ],

        opacity: customOpacity
    }
   

//useEffect to call opacity and translateY animations
    useEffect(()=>{
        moveUpAni()
        customOpacityAnim()
    }, [])


   return(
    <Animated.View style={[{...props.style, }, animatedStyle]}>
       {props.children}
    </Animated.View>
   )
}




//this is strictly for opacity alone
const CustomOpacityAnimation = (props)=>{
    const customOpacity = useRef(new Animated.Value(props.opacityInitialValue)).current; 
    const customOpacityAnim = ()=>{
        Animated.timing(customOpacity, {
            toValue: props.opacityEndValue,
            duration:300,
            useNativeDriver: true
        }).start()
    }


    const animatedStyle = {

        opacity: customOpacity
    }



    //useEffect to call opacity and translateY animations
    useEffect(()=>{
       
        customOpacityAnim()
    }, [])


    return(
        <Animated.View style={[{...props.style, }, animatedStyle]}>
           {props.children}
        </Animated.View>
       )
}
export {AnimatedMoveY, CustomOpacityAnimation}