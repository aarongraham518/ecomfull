import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
const SettingsScreen = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={require('../../../mobile/assets/images/myavatar.png')}
                    style={styles.profileImage}
                    resizeMode="contain"
                />
                <View style={styles.profileNameEmailContainer}>
                    <Text style={styles.profileName}>Aaron Graham</Text>
                    <Text style={styles.profileEmail}>aarongraham518@gmail.com</Text>
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="user" size={24} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Personal Details</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={24} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/confirmationTransit/confirmationTransit')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="shopping-bag" size={20} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>My Order</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="heart" size={19} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Favorites</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="truck" size={22} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Shipping Address</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/creditcard/creditCardForm')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="credit-card" size={18} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>My Card</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="cog" size={28} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Advanced Settings</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/productForm/AddProductScreen')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="dropbox" size={28} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Add Product</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push('/categoriesForm/AddCategoryScreen')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconSpec}>
                            <Icon name="tasks" size={22} color="black" />
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Add Category</Text>
                    </View>
                    <View>
                        <Icon name="angle-right" size={28} color="black" style={{marginTop: 4}}/>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    profileContainer:{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 20,
        width: '88%'
    },
    profileImage:{
        borderColor: 'grey',
        borderRadius: 10,
        width: 80,
        height: 80,
    },
    profileNameEmailContainer:{
        paddingTop: 10,
        paddingLeft: 10
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    profileEmail:{
        fontSize: 18,
        fontWeight: '500',
        color: 'grey'
    },
    settingsContainer:{  
        backgroundColor: 'white',      
        borderWidth: 2,
        padding: 20,
        borderRadius: 15,
        borderColor: '#e1dfdf',
        
    },
    settingOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 10
    },
    iconSpec: {
        backgroundColor: '#f1efef',
        // borderWidth: 1,
        borderRadius: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default SettingsScreen;

