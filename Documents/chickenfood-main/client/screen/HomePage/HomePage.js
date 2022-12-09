import { View, Text, SafeAreaView, StatusBar, Image, FlatList, SectionList } from "react-native";
import { MoveBackArrow } from "../../Component/Button/Button";
import FocusedStatusBar from "../../Component/FocusedStatusBar/FocusedStatusbar";
import homePageStyles from "./style.HomePage";
import { assets,} from "../../Constant";
import MainMenu from "../../Component/MainMenu/MainMenu";
import { TouchableOpacity } from "react-native-gesture-handler";
import Search from "../../Component/Search/Search";
import { FoodData, sectionData, recent } from "../../Constant/Data/Data";
import HomePageCard from "../../Component/HomePageCard/HomePageCard";
import { useNavigation,} from "@react-navigation/native";
import Slider from "../../Component/SliderCard/Slider";
import RecentPostCard from "../../Component/RecentPostCard/RecentPost";




const HomePage = ()=>{
  const navigation = useNavigation();
  
  console.log(sectionData.data, 'idiots')
    
    return(
      <>
      
      <SafeAreaView style={homePageStyles.safeAreaViewContainer}>
            <FocusedStatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true} 
            />
            <View style={[homePageStyles.homePageMainView, {top: StatusBar.currentHeight + 10}]}>
                <MoveBackArrow
                 imgUrl={assets.left}
                 handlePress={() => navigation.goBack()}
                 marginLeft={15}
                 />

          

                    <View style={homePageStyles.homePageSubView1}>


                            <Text style={homePageStyles.homePageSubViewText1}>
                                Good Morning, Dara!
                            </Text>

                           <TouchableOpacity style={homePageStyles.homeCartTouchOpacity}>
                             <Image 
                                source={assets.cart}
                                resizeMode='contain'
                                style={homePageStyles.homePageSubViewImage1}
                            />
                           </TouchableOpacity>
                    </View>

                  
                  <View  
                    top={42}
                    marginHorizontal={25}
                    >


                  <Search/>

                  <View style={homePageStyles.homePageComponentSliderView}>

                    <FlatList
                    
                    horizontal={true} 
                      data={FoodData}
                      renderItem={({ item }) => <Slider data={item} />}
                      keyExtractor={(item) => item.id}
                      showsHorizontalScrollIndicator={false}

                    />
                    

                  </View>   
                  </View>
                
            
                
                 
                <View style={homePageStyles.homePageSubView2}>

                <SectionList style={{width: '100%'}}
                
                sections={sectionData}
                renderSectionHeader={({section: {title}})=> (
                  <>
                   <Text style={homePageStyles.homePageSubViewText2}>
                     
                      {title}
                    </Text>
  
                
                  </>
                   
                  )}
                renderItem={({item, index, section})=>  (
                  <>
                  
      
                  <FlatList

                    data={item}
                    renderItem={({item})=>(
                      <HomePageCard data={item}/>
                    )}

                  />
                    <Text style={[homePageStyles.homePageSubViewText2, ]}>
                      Newly Added Meals
                    </Text>
                      <FlatList
                      
                        data={recent}
                        renderItem={({item})=>(
                          <RecentPostCard data={item}
                           
                          />
                        )}
                      />
              
                  </>
                 


                 

                )}
                
          
                
              />
           
         
          
                </View>
               
            </View>
           
           
       </SafeAreaView>
      
<MainMenu/>
      
      </>
    )
};




export default HomePage