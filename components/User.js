import React from 'react'
import { View, Text, Alert,KeyboardAvoidingView,FlatList,ScrollView,Image, StyleSheet ,TouchableHighlight} from 'react-native'
import *as  firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
export default class User extends React.Component {
  static navigationOptions = {
    title: 'Thông tin cá nhân',
    headerTintColor: '#fff',
    headerStyle:{
      
backgroundColor:'#027a51'
    }
  };
state={contencoment:'',recmt:null}
constructor(props) {
  super(props);
  this.state = { recmt: '' };
}
  componentWillMount(){
    
    const { navigation } = this.props;
    const itemEmail = navigation.getParam('useremail', 'NO-NAME');

 
      
      firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${itemEmail}`).on('value', function    (snapshot) {
  
        let array = [];
        snapshot.forEach(function(snapshot) {
         
          array.push({
            id:snapshot.key,
            email: snapshot.val().email,
            name: snapshot.val().name,
            adress:snapshot.val().adress,
            sdt:snapshot.val().sdt,
            url:snapshot.val().url,
           
          
          });
        });
        thisState.setState({
          data : array
        })
       });
       // Set the configuration for your app
  
       this.state = {
         data : [],
       }
      thisState = this;
    
  }
  render() {
    
    const {navigate} = this.props.navigation;
    return (
      
      <View style={styles.container}>
        <Text onPress={()=>{
           const { currentUser } = firebase.auth()
           var user=currentUser && currentUser.email;
           navigate('Baivietcuatoi',{useremail:user})
        }}></Text>
     

        <FlatList
 data={this.state.data}
renderItem={({item}) =>
<View style={{alignItems:'center',flexDirection:'column'}}>
<Text style ={{fontWeight:'bold'}}>Email:{item.email}</Text>
<Image style={{width:300,height:300,borderRadius:100}} source={{uri:item.url}}></Image>
<Text > name:{item.name}</Text>
<Text > adress:{item.adress}</Text>
<Text > sdt:{item.sdt}</Text>
<Text style={{width:180,borderRadius:5,height:30,backgroundColor:'#027a51'}} onPress={()=>{
   navigate('Updateuser',{ID:item.id,Email:item.email})
 }}>Chỉnh Sửa Trang Cá Nhân</Text>

</View>
}
keyExtractor = {(item, index) =>  item.id }
/> 

      </View>
      
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'flex-start',
    alignItems: 'center'
  }
})
