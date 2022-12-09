import { View, Text, Image } from "react-native";
import { assets } from "../../Constant";

import recentPostStyles from "./style.recent"; 



const RecentPostCard = ({data, marginTop})=>{
    console.log(data.food)
    return(
        <View style={[recentPostStyles.mainContainer, {marginTop: marginTop}]}>
            
            <Image
                source={{uri: data.image}}
                resizeMode='cover'
                style={recentPostStyles. recentImage}
            />

          
           <View style={recentPostStyles.recentPostView2}>
           <Text style={recentPostStyles.recentPostText1}>
                {data.food}

                
            </Text>
                <View style={recentPostStyles.recentPostView2Subview1}>
                <Image
                    style={recentPostStyles.recentPostLikeBTN}
                     source={assets.like}
                     resizeMode='contain'
                 />
                 <Text style={recentPostStyles.recentPostText2}>
                    5 People like this food
                 </Text>
                </View>
           </View>
        </View>
    )
}



export default RecentPostCard