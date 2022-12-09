import { View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import searchStyles from "./style.search";
import { assets } from "../../Constant";







const Search = ({handleSearch, searchText, ...props}) =>{
  
    return(
        <View style={searchStyles.styleContainer}>
             <Image
                source={assets.searchBTN}
                style={searchStyles.searchIcon}
                resizeMode="contain"
                />
            <TextInput
            placeholder="Search for foods"
            onChangeText={handleSearch}
            style={searchStyles.searchInput}
            value={searchText}
            
             />
        </View>
    )
};


export default Search