import React from 'react';
import {StyleSheet, Text, View, TextInput, Alert ,Image} from 'react-native';
import *as firebase from 'firebase'

export default class Dangki extends React.Component {
  static navigationOptions = {
    title: 'Đăng kí',
    headerTintColor: '#fff',

    headerStyle:{
      color:'#fff',
    
      
backgroundColor:'#027a51'
    },
    headerTitleStyle:{
      fontWeight:'bold',
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

  constructor(props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      password2:'',
      name:'Người bí ẩn',
      errorMessage:null


    }
   
  }

  /*Sự kiện đk*/
  btnClicklistennerDk = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { user, password,password2 } = this.state;
    if (user == '') {
    
     this.setState({errorMessage:'vui lòng nhập email'}) 
    } else if (password == ''||password2=='') {
      this.setState({errorMessage:'vui lòng nhập mật khẩu'}) 
    } else if(password!=password2){
      this.setState({errorMessage:'mật khẩu chưa khớp'}) 
    }else if(password.length<6){
      this.setState({errorMessage:'mật khẩu phải 6 kí tự trở lên'}) 
  }else if(reg.test(user)==false){
    this.setState({errorMessage:'sai định dạng email'}) 
  }
  
  else {

    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseAPI)
    
      firebase
        .auth()
        .createUserWithEmailAndPassword(user, password)
        .then(user => this.props.navigation.navigate('Main'),
        firebase.database().ref(`Canhan/`).push({
        
          email:user,
          name:this.state.name,
          age: '',
          sdt:'',
          adress:''
          ,url:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fuser-256.png?alt=media&token=c3c10b6e-94fe-4c99-b305-4eb1e16af71c'
       
      }, function(error) {
        if (error) {
          // The write failed...
          Alert.alert('Đăng kí thất bại')
        } else {
        Alert.alert('Đăng kí thành công')
        }
      })
        )
        .catch(error => this.setState({ errorMessage: 'Kiểm tra lại đường truyền hoặc định dạng tài khoản' }))
    
    }else{
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(user, password)
        .then(user => this.props.navigation.navigate('Main') , firebase.database().ref(`Canhan/`).push({
        
          email:user,
          name:this.state.name,
          age: '',
          sdt:'',
          adress:''
          ,url:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fuser-256.png?alt=media&token=c3c10b6e-94fe-4c99-b305-4eb1e16af71c'
       
      }, function(error) {
        if (error) {
          // The write failed...
          Alert.alert('Đăng kí thất bại')
        } else {
          // Data saved successfully!
          Alert.alert('Đăng kí thành công')
        }
      })
        )
        .catch(error => this.setState({ errorMessage: 'Kiểm tra lại đường truyền hoặc định dạng tài khoản' }))
    
    }
    
  }
}

  render() {
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
   
    return (
      <View style={styles.layout}>
      <Text style={{
        fontSize: 50, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: 'white', textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowOffset: { width: 2, height: 1 }, textShadowRadius: 5
      }}>WELCOME</Text>
   
          {/*nhap du lieu dang nhap*/}
      <View style={styles.textinput}>
        <TextInput style={styles.text} onChangeText={(user) => this.setState({ user })} placeholder='Email'></TextInput>
        <TextInput style={styles.text} onChangeText={(password) => this.setState({ password })} placeholder='Mật khẩu'></TextInput>
        <TextInput style={styles.text} onChangeText={(password2) => this.setState({ password2 })} placeholder='nhập lại mật khẩu'></TextInput>
        <TextInput style={styles.text} onChangeText={(name) => this.setState({name})} placeholder='Nhập tên'></TextInput>
       
    
      </View>
      <Text style={{alignItems:'center', color:'red' }}>{this.state.errorMessage}</Text> 
      {/*dang ki*/}
      <Text style={{ backgroundColor: '#027a51',color:'#fff', width: 200, height: 40, textAlign: 'center', borderRadius: 10, paddingTop: 10,marginTop:10, }}
        onPress={
          this.btnClicklistennerDk
        }>đăng nhập</Text>

      <View style={styles.chuacotk}>
        <Text style={{color:'#ffff'}}>Đã có tài khoản ?</Text>

        {/*đăng kí*/}
        <Text style={styles.dk} onPress={() => navigate('Dangnhap')} >Đăng nhập</Text>
      </View>



    </View>
    );
  }
}


const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#029e69',
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
