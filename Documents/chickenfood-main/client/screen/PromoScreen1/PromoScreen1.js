import PromoDisplay from "../../Component/PromoDisplay/PromoDisplay";
import { assets, globalColor } from "../../Constant";
import { NavigationContainer, DefaultTheme, useNavigation,   useRoute} from "@react-navigation/native";
import { MoveBackArrow } from "../../Component/Button/Button";







const PromoScreen1 = ()=>{

    const navigation = useNavigation();



    
    return(
        <PromoDisplay
    pageTitle={'Find Foods You Love'}
    description={'Disver the best foods from our well prepared meals, affordable and served hot!'}
    text={'Next'}
    focusedColor={globalColor.primaryColor}
    nextFocusedColor={'#D5D5D5'}
    lastFocusedColor={'#D5D5D5'}
    promoScreen1Image={assets.promoScreen1Image}
    navigate={"PromoScreen2"}
    marginRight={25}
    marginLeft={0}
    handlePress={() => navigation.goBack()}
    

/>
    )
}



export default PromoScreen1