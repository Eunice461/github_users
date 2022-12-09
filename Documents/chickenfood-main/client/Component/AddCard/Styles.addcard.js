import { StyleSheet } from 'react-native';
import { globalColor, globalFonts, globalFontsSize } from "../../Constant";

const addCardStyles = StyleSheet.create({
    addCardContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.60)'
    },
    addCardView1: {
        height: "100%",
        marginTop: 145,
        backgroundColor: globalColor.backgroundColor,
        borderRadius: 35,
    },
    addCardView2: {
        marginHorizontal: 20,
        marginTop: 15
    },
    addCardView3:{

    },
    addCardView4:{
        marginTop: 12,
    },
    addCardView5:{
        marginTop: 20,
        flexDirection: "row",
    },
    addCardView51:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 40
    },
    addCardView6:{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    addCardBrLine: {
        borderBottomColor: globalColor.subTextColor,
        borderBottomWidth: 1,
        marginTop: 15
    },
    addCardText1:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.font,
        marginTop: 12
    },
    addCardText2:{
        color: globalColor.textTitleColor,
        fontFamily: globalFonts.MetropolisExtraBold,
        fontSize: globalFontsSize.font,
        marginTop: 12,
    },
    addCardText3:{
        color: globalColor.subTextColor,
        fontFamily: globalFonts.MetropolisRegular,
        fontSize: globalFontsSize.small,
        lineHeight: 15
    },
    addCardTextInput1:{
        color: globalColor.textTitleColor,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColor.lightColor,
        borderRadius: 50,
        marginTop: 25,
        width: '100%',
    },
    addCardTextInput2:{
        color: globalColor.textTitleColor,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColor.lightColor,
        borderRadius: 50,
        width: 100,
        marginHorizontal: 15,
        textAlign: "center"
    },
    addCardIMage1: {
        height: '100%',
        width: '100%',  
    },
    addCardIMage2: {
        width: 25,
        height: 25,
        marginLeft: "90%"
    },
    addCardIMage3: {
        width: 25,
        height: 25,
    },
    addCardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.60)' 
    },
})


export default addCardStyles