import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import *as  firebase from 'firebase'

export default class Loading extends React.Component {
  static navigationOptions = {
    title: '',
    headerTintColor: '#fff',
    headerStyle:{
      
backgroundColor:'#027a51'
    }
  };
    firebaseAPI={
  
        apiKey: "AIzaSyAy4hlIkRu7wOZFw_yl_ZQD_U9DwaY6_cI",
        authDomain: "test-8ca79.firebaseapp.com",
        databaseURL: "https://test-8ca79.firebaseio.com",
        projectId: "test-8ca79",
        storageBucket: "test-8ca79.appspot.com",
        messagingSenderId: "765297743299",
        appId: "1:765297743299:web:f578ccef0e69c668"
      
    }
  componentDidMount() {
      firebase.initializeApp(this.firebaseAPI)
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.push(user ? 'Main' : 'Dangnhap')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#ffffff'}}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212F3C',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
