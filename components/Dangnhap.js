import React from 'react';
import { StyleSheet, Text, View, TextInput,SafeAreaView, Button ,Image,TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import *as firebase from 'firebase'

export default class Dangnhap extends React.Component {

    static navigationOptions = {
        title: 'Đăng nhập',
        headerTintColor: '#fff',
        headerStyle:{
        backgroundColor:'#212F3C'
        },
   
      };
      constructor(props) {
        super(props)
        this.state = {
          user: '',
          password: '',
          errorMessage:null
    
    
        }
       
       
      }
      // APi firebase
      firebaseAPi={

        apiKey: "AIzaSyAy4hlIkRu7wOZFw_yl_ZQD_U9DwaY6_cI",
        authDomain: "test-8ca79.firebaseapp.com",
        databaseURL: "https://test-8ca79.firebaseio.com",
        projectId: "test-8ca79",
        storageBucket: "test-8ca79.appspot.com",
        messagingSenderId: "765297743299",
        appId: "1:765297743299:web:f578ccef0e69c668"
      }

      // sự kiện đăng nhập
      btnClicklistenner = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const { user, password } = this.state;
        if (user == '') {
    
          this.setState({errorMessage:'vui lòng nhập email'}) 
         } else if (password == '') {
           this.setState({errorMessage:'vui lòng nhập mật khẩu'}) 
         } else if(password.length<6){
           this.setState({errorMessage:'mật khẩu phải 6 kí tự trở lên'}) 
       }else if(reg.test(user)==false){
         this.setState({errorMessage:'sai định dạng email'}) 
       }else{

        if (!firebase.apps.length) {
          firebase.initializeApp(this.firebaseAPi)
          firebase
          .auth()
          .signInWithEmailAndPassword(user, password)
          .then(() =>this.props.navigation.navigate('Main'))
          .catch(error => this.setState({ errorMessage: 'kiểm tra lại thông tin tài khoản hoăc lỗi internet' }))

        }
        else{
              firebase
          .auth()
          .signInWithEmailAndPassword(user, password)
          .then(() => this.props.navigation.navigate('Main'))
          .catch(error => this.setState({ errorMessage: 'kiểm tra lại thông tin tài khoản hoăc lỗi internet' }))
        }
        
      }
    } 
  render() {
    const {navigate} = this.props.navigation;
    
    return (
<SafeAreaView style={styles.layout}>
         < KeyboardAvoidingView behavior='padding' style={styles.layout}>
            <View style={styles.layout}>
              <Text style={{
                fontSize: 50, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: 'white', textShadowColor: 'rgba(255, 255, 255, 1)',
                textShadowOffset: { width: 2, height: 1 }, textShadowRadius: 5
              }}>WELCOME</Text>
              
         
        
      
                  {/*nhap du lieu dang nhap*/}
              <View style={styles.textinput}>
                <TextInput style={styles.text}  onChangeText={(user) => this.setState({ user })} placeholder='Email'></TextInput>
                <TextInput style={styles.text} 	secureTextEntry={true} onChangeText={(password) => this.setState({ password })} placeholder='Mật khẩu'></TextInput>
          
              </View>
             
              {/*dang nhap*/}
              <Text style={{ backgroundColor: '#027a51',color:'#fff', width: 200, height: 40, textAlign: 'center', borderRadius:10, paddingTop: 10,marginTop:10, }}
                onPress={
                  this.btnClicklistenner
                }>Đăng nhập</Text>
      
              <View style={styles.chuacotk}>
                <Text style={{color:'#ffff'}}>Chưa có tài khoản ?</Text>
      
                {/*chuyển đăng kí*/}
                <Text style={styles.dk} onPress={() => navigate('Dangki')} >Đăng kí</Text>
              </View>
      
            </View>
           </KeyboardAvoidingView>
      
            </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: '#212F3C',
      alignItems: 'center',
      justifyContent: 'center'
  
  
    },
    text: {
      paddingLeft: 10,
      borderRadius: 10,
      backgroundColor: '#ffff',
      height: 40,
      margin: 7,
      width: 300,
    },
  
    chuacotk: {
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: 5,
    },
    dk: {
      marginLeft: 10,
      color: 'blue'
  
    },
    textinput: {
      flex: 1,
   marginBottom:10,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  
  
  });
  