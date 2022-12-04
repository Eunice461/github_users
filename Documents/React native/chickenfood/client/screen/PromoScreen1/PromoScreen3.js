import PromoDisplay from "../../Component/PromoDisplay/PromoDisplay";
import { globalColor, assets } from "../../Constant";
import { useNavigation,   useRoute} from "@react-navigation/native";
import MainMenu from "../../Component/MainMenu/MainMenu";


const PromoScreen3 =()=>{
    const navigation = useNavigation();
    return(
       <>

    <PromoDisplay
        pageTitle={'Live Tracking'}
        description={'Track your order live right inside the app once your place your order!'}
        text={'Next'}
        focusedColor={ '#D5D5D5'}
        nextFocusedColor={'#D5D5D5'}
        lastFocusedColor={globalColor.primaryColor }
        promoScreen1Image={assets.promoScreen3Image}
        marginLeft={0}
        marginRight={10}
        width={'70%'}
        handlePress={() => navigation.goBack()}
        
        />

        <MainMenu/>
       
       </>
    )
}


export default PromoScreen3