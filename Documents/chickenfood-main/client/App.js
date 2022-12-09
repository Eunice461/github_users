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
import HomePage from "./screen/HomePage/HomePage";
import ProfilePage from "./screen/ProfilePage/ProfilePage";
import MorePage from "./screen/MorePage/MorePage";
import PaymentDetailsPage from "./screen/PaymetDetailsPage/PaymentDetailsPage";
import AddCardPage from "./screen/AddCardPage/AddCardPage";
import NotificationPage from "./screen/NotificationPage/NotificationPage";
import AboutPage from "./screen/AboutPage/AboutPage";
import OrderPage from "./screen/OrderPage/OrderPage";
import CheckoutPage from "./screen/CheckoutPage/CheckoutPage";
import CheckoutAddCardPage from "./screen/CheckoutAddCardPage/CheckoutAddCardPage";
import ThankyouPage from "./screen/ThankyouPage/ThankyouPage";
import ChatPage from "./screen/ChatPage/ChatPage";
import ChangeAddressPage from "./screen/ChnageAddressPage/ChangeAddressPage";




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
          <Stack.Screen name="HomePage" component={HomePage}/>
          <Stack.Screen name="ProfilePage" component={ProfilePage}/>
          <Stack.Screen name="MorePage" component={MorePage}/>
          <Stack.Screen name="PaymentDetailsPage" component={PaymentDetailsPage}/>
          <Stack.Screen name="AddCardPage" component={AddCardPage}/>
          <Stack.Screen name="NotificationPage" component={NotificationPage}/>
          <Stack.Screen name="AboutPage" component={AboutPage}/>
          <Stack.Screen name="OrderPage" component={OrderPage}/>
          <Stack.Screen name="CheckoutPage" component={CheckoutPage}/>
          <Stack.Screen name="CheckoutAddCardPage" component={CheckoutAddCardPage}/>
          <Stack.Screen name="ThankyouPage" component={ThankyouPage}/>
          <Stack.Screen name="ChatPage" component={ChatPage}/>
          <Stack.Screen name="ChangeAddressPage" component={ChangeAddressPage}/>


      </Stack.Navigator>


      </NavigationContainer>

    </GlobalState>
    
  )
}



export default App