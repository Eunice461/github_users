import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import FocusedStatusBar from '../../Component/FocusedStatusBar/FocusedStatusbar'
import TopMeun from '../../Component/TopMeun/TopMeun'
import { assets, globalColor } from '../../Constant'
import ChangeAddressPageStyles from './Styles.changeaddress'

const ChangeAddressPage = () => {
    const [ pin, setPin ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324
	})
	const [ region, setRegion ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	return (
		<SafeAreaView style={ChangeAddressPageStyles.ChangeAddressContainer}>
            <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          
            />
         <TopMeun text={"Change Address"} imgUrl={assets.cart}/>

            <View style={ChangeAddressPageStyles.ChangeAddressView1}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				provider="google"
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
		</View>

        <View style={ChangeAddressPageStyles.ChangeAddressView2}>
        <View style={ChangeAddressPageStyles.ChangeAddressView3}>
            <Image source={assets.searchBTN} style={ChangeAddressPageStyles.ChangeAddressImage}/>
        <GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "KEY",
					language: "en",
					components: "country:us",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1, marginHorizontal: 20,},
					listView: { backgroundColor: "white" }
				}}
			/>
        </View>
        </View>

        </SafeAreaView>
	)
}

export default ChangeAddressPage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height-250
	}
})