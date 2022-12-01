import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 50,
      },
      headerTitle:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 30
      }, 
      subHeaderTitle:{
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
        
      },
      forgotPassword:{
        fontSize: 10,
        textAlign: "center",
        marginTop: 15
      },
      input: {
        color: "white",
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3D3D3',
        borderRadius: 50,
        marginTop: 25,
        width: '100%',
      },
      touchableContainer: {
            width: "100%",
            position: "absolute",
            bottom: 50,
            paddingVertical: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 1,
      },
      touchable:{
        minWidth: 170,
        fontSize: 14
      }
  });
  
  export default styles