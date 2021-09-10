import React, {useState, useRef, useEffect} from 'react'
import { View, SafeAreaView, StatusBar,Text, TouchableOpacity,Modal, FlatList, StyleSheet, Button, Dimensions,Image, Animated,} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { SearchBar } from 'react-native-elements';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from 'react-redux';
import * as routeActions from '../store/actions/routes';

const width_proportion = '95%';
const height_proportion = '70%';

const { width, height } = Dimensions.get('screen');

const SPACING = 5;
const AVATAR_SIZE = 15;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Select = ({onChangeSelect, text, }) => {
    const [txt, setText] = useState(text);
    const [filteredData, setFilteredData] = useState([]);
    const [rawData, setRawData] = useState([]);
    // SEARCH QUERY
    const [searchQuery, setSearchQuery] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const routes = useSelector(state =>  state.routes.availableRoutes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(routeActions.fetchRoutes());
    },[dispatch])

    useEffect(() => {
        setFilteredData(routes);
        setRawData(routes);
    },[routes])
    

    const searchFilter = (text) => {
        if(text) {
            const newData  = rawData.filter((item) => {
                const itemData = item.name ?
                                 item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearchQuery(text);
        }else{
            setFilteredData(rawData);
            setSearchQuery(text);
        }
    }
   
    // console.log('filtered data',filteredData)
    
    return (
        <View>
           <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>
           </TouchableOpacity>

           <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        {/* THIS BLOCK IS THE MODAL */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="arrow-back-sharp" size={28} color="#FFFFFF" />
                        </TouchableOpacity>

                        <View>
                            <SearchBar
                                placeholder="search..."
                                onChangeText={(text) => searchFilter(text)}
                                value={searchQuery}
                                containerStyle={{flex:1, height: 50,width: width - 50,}}
                                inputContainerStyle={{height: 35, position: 'relative', top: -10, left: -6,  width: width - 50, backgroundColor: '#FFFFFF',}}
                                inputStyle={{ backgroundColor: '#FFFFFF', paddingVertical: 10,}}
                                onCancel={() => {}}
                                round='true'
                            />
                        </View>
                    </View>

  
                    <Animated.FlatList 
                            data={filteredData} keyExtractor={item => item.id} 
                           
                            renderItem={itemData => (
                                <TouchableOpacity activeOpacity={.7} key={itemData.item.id} onPress={() => {
                                    onChangeSelect(itemData.item.name, itemData.item.id)
                                    setText(itemData.item.name)
                                    setModalVisible(false)
                                    }}>

                                    <Animated.View style={styles.modalItemStyle}>
                                    
                                        <View>
                                            <Text style={styles.modalTextItem}>{itemData.item.name}</Text>
                                        </View>
                                    </Animated.View>
                                </TouchableOpacity>
                              )}
                        />

                </SafeAreaView>

           </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingBottom: 5,
        width: width
    },
    txt: {
        color: '#003c30',
        fontSize: 16,
    },
    modalItemStyle:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 2, 
    },
    modalTextItem: {
        color: '#003c30',
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 15,
        backgroundColor: '#003c30',
    },
    modalCancel: {
        fontSize: 14,
        color: '#003c30',
        fontFamily: 'Montserrat-SemiBold',
    },
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    optionTxt: {
        fontSize: 18,
        color: '#555'
    }
});

export default Select
