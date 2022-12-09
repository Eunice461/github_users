import { StyleSheet } from "react-native";
import { globalColor } from "../../Constant";




const searchStyles = StyleSheet.create({
    styleContainer:{
        backgroundColor: globalColor.lightColor,
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 20,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center'
        
    },
    searchInput:{
        paddingVertical: 25,
        width: '90%',
        zIndex: 50,
        height: 100,
        
        
    },
    searchIcon:{
        width: 30,
        height: 30,
        marginLeft: 5,
        paddingLeft: 10
    }
});


export default searchStyles