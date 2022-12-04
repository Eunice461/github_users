import PromoDisplay from "../../Component/PromoDisplay/PromoDisplay";
import { globalColor, assets } from "../../Constant";
import { useNavigation,   useRoute} from "@react-navigation/native";




const PromoScreen2 = ()=>{
    const navigation = useNavigation();
    return (
        <PromoDisplay
        pageTitle={'Superb Fast Delivery'}
        description={'Fast delivery to your home, office, business center or anywhere within the city'}
        text={'Next'}
        focusedColor={ '#D5D5D5'}
        nextFocusedColor={globalColor.primaryColor}
        lastFocusedColor={'#D5D5D5'}
        promoScreen1Image={assets.promoScreen2Image}
        marginLeft={10}
        marginRight={0}
        navigate={"PromoScreen3"}
        handlePress={() => navigation.goBack()}
        
    
        
        />
    )
}


export default PromoScreen2