import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dummyTrackingData = [
    {
        id: '1',
        trackingNumber: 'US 2343456688',
        location: 'Washington - Georgia',
        status: 'Delivered',
        icon: 'local-shipping',
    },
    {
        id: '2',
        trackingNumber: 'US 2343456652',
        location: 'Washington - Illinois',
        status: 'Transit',
        icon: 'two-wheeler',
    },
    {
        id: '3',
        trackingNumber: 'US 2343456638',
        location: 'Franklin - Alabama',
        status: 'Accepted',
        icon: 'local-shipping',
    },
];

export default function TrackingScreen() {
    const router = useRouter();

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.itemContainer}>
            <View style={styles.trackingIcon}>
                <MaterialIcons name={item.icon} size={28} color="black" />
            </View>            
            
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.trackingNumber}>{item.trackingNumber}</Text>
                <Text style={styles.location}>{item.location}</Text>
            </View>

            <View style={styles.statusContainer}>
                <Text
                    style={{
                        color:
                            item.status === 'Delivered'
                                ? 'gray'
                                : item.status === 'Transit'
                                    ? '#000'
                                    : '#007bff',
                    fontSize: 18,
                    marginTop: 7}}>
                    {item.status}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Back and Profile Icons */}
            <View style={styles.headerIcons}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <FontAwesome name="user-circle-o" size={28} color="black" />
            </View>

            {/* Search */}
            <TextInput style={styles.searchInput} placeholder="Search Items" />

            {/* Main Transit Card */}
            <View style={styles.card}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.trackingId}>6556 2334 8090</Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Transit</Text>
                </View>
                
                <Text style={styles.courier}>Pony Express</Text>

                <View style={styles.progressBarContainer}>

                    <View style={styles.progressBarWrapper}>
                        <View style={styles.progressBackground}>
                            <View style={styles.progressFill} />
                            <View style={styles.iconContainer}>
                                <FontAwesome name="plane" size={25} color="white" style={styles.planeIcon} />
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.progressRow}>
                    <Text>15 June, 2025</Text>
                    <Text>20 June, 2025</Text>
                </View>

                <View style={styles.cityContainer}>
                    <Text style={styles.cityText}>Clearwater</Text>
                    <Text style={styles.cityText}>Florida</Text>
                </View>
            </View>

            {/* Tracking History */}
            <Text style={styles.sectionTitle}>Tracking</Text>
            <FlatList data={dummyTrackingData} renderItem={renderItem} keyExtractor={item => item.id} />
        
        <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('/')}>
            <Ionicons name="home" size={30} color="black" />
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ececec',
        paddingTop: 50,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        fontSize: 18
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    trackingId: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    courier: {
        color: '#555',
        marginBottom: 10,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 35,
    },
    progressBarContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressBarWrapper: {
        flex: 1,
        marginHorizontal: 10,
    },
    progressBackground: {
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 2,
        position: 'relative',
    },
    progressFill: {
        width: '45%',
        height: 5,
        backgroundColor: '#000',
        borderRadius: 2,
    },
    trackingIcon:{
        // borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#e3e2e2',
        padding: 7,
    },
    iconContainer: {
        borderWidth: 2,
        width: 38,
        height: 38,
        borderRadius: 20,
        position: 'absolute',
        top: -16,
        left: '28%',
        backgroundColor: 'black'
    },
    planeIcon: {
        position: 'relative',
        top: 5,
        left: 7
    },
    cityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cityText:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 17,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom: 10,
        
    },
    trackingNumber: {
        fontWeight: '600',
        fontSize: 18
    },
    location: {
        color: '#666',
        fontSize: 16,
    },
    statusContainer: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    homeBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 40,
        width: 80,
        height: 80,
        position: 'relative',
        left: '38%',
        top: -30
    }
});
