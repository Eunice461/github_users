import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from './screen/Welcome/Welcome';
import LogoPage from './screen/LogoPage/LogoPage'
import RegisterPage from "./screen/RegisterPage/RegisterPage";
import LoginPage from "./screen/LoginPage/LoginPage";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Resetpassword from "./screen/ResetPassword/Resetpassword";
import OtpPage from "./screen/OtpPage/OtpPage";
import NewPassword from "./screen/NewPassword/NewPassword";
import ChooseResetMethod from "./screen/ChooseResetMethod/ChooseResetMethod";
import {GlobalState} from "./Context/UseContext" ;
import PromoScreen1 from "./screen/PromoScreen1/PromoScreen1";   
import PromoScreen2 from "./screen/PromoScreen1/PromoScreen2";
import PromoScreen3 from "./screen/PromoScreen1/PromoScreen3";
import ProfilePage from "./screen/ProfilePage/ProfilePage";
import MorePage from "./screen/MorePage/MorePage";
import PaymentDetailsPage from "./screen/PaymetDetailsPage/PaymentDetailsPage";




//call the stack navigation method
const Stack = createStackNavigator();


const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}




const App =()=> {
  const [loaded] = useFonts({
    MetropolisBold: require("./assets/Fonts/Metropolis-Bold.otf"),
    MetropolisExtraBold: require("./assets/Fonts/Metropolis-ExtraBold.otf"),
    MetropolisMedium: require("./assets/Fonts/Metropolis-Medium.otf"),
    MetropolisRegular: require("./assets/Fonts/Metropolis-Regular.otf"),
    MetropolisSemiBold: require("./assets/Fonts/Metropolis-SemiBold.otf"),
  })

  

if(!loaded) return null


  return (
    <GlobalState>
        <NavigationContainer theme={theme}>

          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LogoPage">

          <Stack.Screen  name="LogoPage" component={LogoPage}/>
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ChooseResetMethod" component={ChooseResetMethod} />
          <Stack.Screen name="ResetPassword" component={Resetpassword} />
          <Stack.Screen name="OtpPage" component={OtpPage} />
          <Stack.Screen name="NewPassword" component={NewPassword} />  
          <Stack.Screen name="PromoScreen1" component={PromoScreen1}/>
          <Stack.Screen name="PromoScreen2" component={PromoScreen2}/>
          <Stack.Screen name="PromoScreen3" component={PromoScreen3}/>
          <Stack.Screen name="ProfilePage" component={ProfilePage}/>
          <Stack.Screen name="MorePage" component={MorePage}/>
          <Stack.Screen name="PaymentDetailsPage" component={PaymentDetailsPage}/>

      </Stack.Navigator>


      </NavigationContainer>

    </GlobalState>
    
  )
}



export default App