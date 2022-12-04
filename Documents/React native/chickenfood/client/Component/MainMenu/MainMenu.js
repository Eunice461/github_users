import { View, Text, TouchableOpacity, Image} from "react-native";
import mainMenuStyles from "./style.mainmenu";
import { assets, globalColor, globalShadow } from "../../Constant";
const shadowApply = globalShadow(-2, 4, '#1B2631', 0.2, 3, 10, '#1B2631', );




const MainMenu = ({handlePress, props})=>{
    return (
       <>
      
      
            <View style={[mainMenuStyles.lastView, shadowApply.customShadow]}>
            <View style={[mainMenuStyles.mainContainer, shadowApply.customShadow]}>
           
                
                        <View style={[mainMenuStyles.mainMenuView2, shadowApply.customShadow]}>
                                <TouchableOpacity style={mainMenuStyles.homeBTNTouchOpacity} 
                                
                                    onPress={handlePress}
                                    >
                                    <Image 
                                    
                                        source={assets.homeBTN}
                                        style={mainMenuStyles.homeBTN}
                                        
                                    />
                                </TouchableOpacity>
                        </View>
                        <View style={mainMenuStyles.mainView}>
                        
                        </View>
                <View style={mainMenuStyles.menuView}>

                        <TouchableOpacity style={mainMenuStyles.menuBTNTouchOpacity}  onPress={handlePress} >
                            <View style={mainMenuStyles.generalOpacitySubView}>
                        
                                <Image
                                source={assets.menuBTN}
                                style={mainMenuStyles.menuBTNImage}
                                resizeMode='center'
                                
                                />

                            
                            <Text style={mainMenuStyles.menuBTNText}>
                                    Menu
                                </Text>
                            
                            
                            </View>

                        </TouchableOpacity>


                <TouchableOpacity style={mainMenuStyles.offerBTNTouchOpacity}
                        onPress={handlePress}
                    >
                      <View style={mainMenuStyles.generalOpacitySubView}>
                      <Image
                            source={assets.offerBTN}
                            resizeMode='center'
                            style={mainMenuStyles.offerBTNImage}
                        />

                        <Text style={mainMenuStyles.offerBTNText}>
                            Offer
                        </Text>
                      </View>
                    </TouchableOpacity>
                </View>


              
            </View>
            <View style={mainMenuStyles.profileMoreView}>

                    <TouchableOpacity style={mainMenuStyles.profileBTNTouchOpacity} 
                        onPress={handlePress}
                    >
                    <View style={mainMenuStyles.generalOpacitySubView}>
                            <Image
                                    source={assets.profileBTN}
                                    resizeMode='center'
                                    style={mainMenuStyles.profileBTNImage}
                                    
                                />

                            <Text style={mainMenuStyles.profileBTNText}>
                                Profile
                            </Text>
                    </View>
                       
                    </TouchableOpacity >

                    <TouchableOpacity style={mainMenuStyles. moreBTNTouchOpacity}  
                        onPress={handlePress}
                    >
                            <View style={mainMenuStyles.generalOpacitySubView}>
                                    <Image
                                            source={assets.moreBTN}
                                            resizeMode='center'
                                            style={mainMenuStyles.moreBTNImage}
                                            
                                        />

                                    <Text style={mainMenuStyles.moreBTNText}>
                                       More
                                    </Text>
                            </View>
                    </TouchableOpacity>

                </View>
            </View>
       
       </>
       
        
    )
}


export default MainMenu