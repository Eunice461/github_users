import { View, Text, Image, FlatList } from "react-native";
import { assets } from "../../Constant";
import homePageComponentStyles from "./style.homePagecard";



const HomePageCard = ({data, index, section, imageHeight, ...props})=>{

 

 
    return(
        <>

    <View style={[homePageComponentStyles.mainView,  {...props}]}>
            
            <Image
               source={{uri: data.image}}
               resizeMode='cover'
               style={[homePageComponentStyles.homePageComponentImage, ]}
            />
 
           <View style={homePageComponentStyles.homePageComponentSubView1}>
           <Text style={homePageComponentStyles.homePageComponentText}>
                 {data.food}
            </Text>
 
            
 
             <View style={homePageComponentStyles.homePageComponentSubView1SubView1}>
                     <Image
                          style={homePageComponentStyles.homePageComponentLikeBTN}
                     source={assets.like}
                     resizeMode='contain'
                 />
 
                 <Text style={homePageComponentStyles.homePageComponentText2}>
                     10 people liked this food
                 </Text>
             </View>
           </View>
         </View>
        
        
        </>
    )
};


export default HomePageCard