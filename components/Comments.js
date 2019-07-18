import React from 'react'
import { View, Text, Alert,KeyboardAvoidingView,FlatList,ScrollView,Image, StyleSheet ,TouchableHighlight} from 'react-native'
import *as  firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
export default class Comments extends React.Component {
  static navigationOptions = {
    title: 'Bình luận',
    headerTintColor: '#fff',
    headerStyle:{
      
backgroundColor:'#027a51'
    }
  };
state={contencoment:'',nameid:'',recmt:null}
constructor(props) {
  super(props);
  
  this.state = { recmt: '' };
}

  componentWillMount(){
    
      const { navigation } = this.props;
      const id = navigation.getParam('ID', 'NO-NAME');
      firebase.database().ref(`Comment/${id}`).on('value', function    (snapshot) {
  
        let array = [];
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          array.push({
            id : childSnapshot.key,
            Email : childData.Email,
            Content : childData.Content,
            Name : childData.Name,
            Avatar:childData.Avatar,
            Date:childData.Date
          
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

    const { navigation } = this.props;
    const itemContent = navigation.getParam('Content', 'NO-NAME');
    const itemEmail = navigation.getParam('email', 'NO-NAME');
    const itemImage = navigation.getParam('ImageUrl', 'NO-NAME');
    const itemid = navigation.getParam('ID', 'NO-NAME');
    const itemName = navigation.getParam('Name', 'NO-NAME');
    const itemAvatar = navigation.getParam('Avatar', 'NO-NAME');

    return (
      <KeyboardAvoidingView style={styles.container}  behavior='position' > 
      <View >
        <ScrollView>
          <View style={{flexDirection:'row',alignItems:'center'}}>
     
        <Image style={{width:50,height:50,borderRadius:25,margin:5}} source={{uri:itemAvatar}}></Image>
        <Text style={{fontWeight:'bold',}}>{itemName}</Text>
        </View>
        <Image style={{height:400,width:400}} source={{uri:itemImage}}></Image>
        <Text> {itemContent} </Text>

        <FlatList
data= {this.state.data} 
renderItem={({item}) =>
<View style={{flexDirection:'column',marginLeft:5}}>
  <View style={{flexDirection:'row',marginLeft:5,alignItems:'center',marginTop:4}}>
  <Image source={{uri:item.Avatar}} style={{width:35,height:35,borderRadius:18}}></Image>
  <View style={{flexDirection:'column',marginLeft:3}}>
<Text style ={{fontWeight:'bold'}}>{item.Name}</Text>
<Text style={{fontSize:10,fontWeight:'100',fontStyle:'italic'}}>{item.Date}</Text>
<Text > {item.Content}</Text>
</View>
</View >

</View>
}
keyExtractor = {(item, index) =>  item.id }
/>
      
        </ScrollView>
    
        <View style={{flexDirection:'row',marginBottom:50,marginLeft:15,alignItems:'center'}}>
        <FlatList
data= {this.state.datauser} 
renderItem={({item}) =>
<View style={{flexDirection:'row'}} >

<TextInput style={{width:360,  borderColor: 'gray', borderWidth: 1,
     height: 50,}} onChangeText={(contencoment) => this.setState({contencoment})} value={this.state.contencoment} placeholder='  Bình luận'></TextInput>
      <  TouchableHighlight 
      onPress={()=>{
        const{contencoment}=this.state
        var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
        firebase.database().ref(`Comment/${itemid}`).push({
        
          Email: item.email,
          Content :contencoment,
          Avatar:item.url,
          Name:item.name,
          Date:'lúc'+hours + ' giờ :' + min +' phút '+date + '/' + month + '/' + year 
     
      }, function(error) {
        
        if (error) {
    
        } else {
          
         
        }
       
      });
      this.setState({contencoment:''})
      }}
      >
      <Image style={{width:35,height:30}}
      source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fsend-256.png?alt=media&token=5933f2ab-aaf1-4478-9d7d-715fc28746ab'}}>

      </Image>
</  TouchableHighlight>

</View>
}
keyExtractor = {(item, index) =>  item.id }
/>
       
</View>

      </View>
      </KeyboardAvoidingView>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'flex-start',
    alignItems: 'center'
  }
})
