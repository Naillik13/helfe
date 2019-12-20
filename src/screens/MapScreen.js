import React from "react"
import {Platform, StyleSheet, View, Dimensions, Text} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import Constants from "expo-constants";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import AlertMarker from "../components/AlertMarker";
import LocationMarker from "../components/LocationMarker";
import MapViewDirections from "react-native-maps-directions";


export default class MapScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            location: null,
            destination: null,
            errorMessage: "Loading current location...",
            alerts: [],
            itinerary: []
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
            this._getAlertsLocation()
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
    };

    _getAlertsLocation = async() => {
        this.setState({
            alerts: [
                {
                    id: 1,
                    coords: {
                        latitude: 37.7800059,
                        longitude: -122.4223171
                    },
                    user: 'Lucie'

                },
                {
                    id: 2,
                    coords: {
                        latitude: 37.790588,
                        longitude: -122.413391
                    },
                    user: 'Andréa'

                }
            ]
        })
    };

    render(){
        if (this.state.location) {

            return (
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        region={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>

                        <Marker
                            coordinate={{
                                latitude: this.state.location.coords.latitude,
                                longitude: this.state.location.coords.longitude
                            }}
                            title="You're here">
                            <LocationMarker/>
                        </Marker>

                        {this.state.alerts.map((alert) => (
                            <Marker
                                key={alert.id}
                                coordinate={alert.coords}
                                title={"Position de " + alert.user}
                                onPress={() => this.setState({destination: alert})}>
                                <AlertMarker/>
                            </Marker>
                        ))}
                        {this.state.destination ?
                            <MapViewDirections
                                origin={{
                                    latitude: this.state.location.coords.latitude,
                                    longitude: this.state.location.coords.longitude,
                                }}
                                destination={{
                                    latitude: this.state.destination.coords.latitude,
                                    longitude: this.state.destination.coords.longitude,
                                }}
                                apikey={'AIzaSyAq2WMyQYgA4miuBZUkdn6muhlbeWAtRYI'}
                            />
                        : null }

                    </MapView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>{this.state.errorMessage}</Text>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});