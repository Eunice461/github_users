import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import sliderStyles from "./style.slider";
import { useEffect, useState } from "react";



const Slider = ({data})=>{
    const [sliderPosts, setSliderPosts] = useState(data)
    const [movePosition, setMovePosition] = useState(0);

    
    
useEffect(()=>{
    const lastIndex = sliderPosts.length - 3;

    setMovePosition(0)
}, [])


    return (
       
        <View style={sliderStyles.sliderMainContainer}>


            
            <View style={sliderStyles.sliderView1SubView1}>
                <Image
                   source={{uri: data.image}}
                   style={sliderStyles.sliderImageStyles}
                />
                    
                <Text style={sliderStyles.sliderViewText1}>
                    
                    {data.food}
                </Text>
            </View>

                       
           
               
         </View>
      
    )
}

export default Slider