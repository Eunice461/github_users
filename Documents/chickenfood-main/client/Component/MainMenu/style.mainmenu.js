import { StyleSheet, } from "react-native";
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";





const mainMenuStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: globalColor.lightColor,
        width: '100%',
        height: 65,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastView:{
        flex: 1, 
        backgroundColor: '#EFEFEF', 
        height: 70, 
        width: '100%', 
        position: 'absolute',
        bottom: 0,
    },
    mainView:{
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: globalColor.backgroundColor,
        bottom: 0,
        zIndex: 9,
        justifyContent: 'center',
        alignItems: 'center',

    },

    mainMenuView2:{
        position: 'absolute',
        width: 55,
        height: 55,
        borderRadius: 100,
        backgroundColor: '#B6B7B7',
        bottom: 15,
       zIndex: 10,
       justifyContent: 'center',
       alignItems: 'center'
    },

    homeBTNTouchOpacity:{
        justifyContent: 'center', 
        alignItems: 'center'
    },
    homeBTN:{
        width: 150, 
        height: '100%',
        marginBottom: 15
    },

    menuView:{
        marginRight: 255,
        width: '35%',
        height: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',  
       
    },
    menuBTNImage:{
        height: '25%',
        width: '40%', 
        
    },

    menuBTNTouchOpacity:{
        width: '35%', 
        justifyContent: 'center', 
        height: '100%',
        alignItems: 'center',
        marginLeft: 10,
        
    },
    menuBTNText:{
        fontFamily: globalFonts.MetropolisMedium,
        color: globalColor.textTitleColor,
        marginTop: 3,
        fontSize: globalFontsSize.small
    },

    offerBTNTouchOpacity:{
        width: '35%', 
        justifyContent: 'center', 
        height: '100%',
        marginRight: 0,
        zIndex: 20
       
    },

    offerBTNImage:{
        height: '25%',
        width: '40%',        
    },

    offerBTNText:{
        fontFamily: globalFonts.MetropolisMedium,
        color: globalColor.textTitleColor,
       
        marginTop: 3,
        fontSize: globalFontsSize.small,
       
    },

    generalOpacitySubView:{
        justifyContent:'center', 
        alignItems: 'center', 
        height: '100%', 
        width: '100%'
    },

    profileMoreView:{
        marginLeft: 255,
        width: '35%',
        height: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },

    profileBTNTouchOpacity:{
        width: '35%', 
        justifyContent: 'center', 
        height: '100%',
        marginRight: 15,
        zIndex: 20
    },
    profileBTNImage:{
        height: '25%',
        width: '40%', 
    },
    profileBTNText:{
        fontFamily: globalFonts.MetropolisMedium,
        color: globalColor.textTitleColor,
        marginTop: 3,
        fontSize: globalFontsSize.small,
    },

    moreBTNTouchOpacity:{
        width: '35%', 
        justifyContent: 'center', 
        height: '100%',
        marginRight: 25,
        zIndex: 20 
    },

    moreBTNImage:{
        height: '25%',
        width: '40%', 
    },

    moreBTNText:{
        fontFamily: globalFonts.MetropolisMedium,
        color: globalColor.textTitleColor,
        marginTop: 3,
        fontSize: globalFontsSize.small,  
    }
})


export default mainMenuStyles