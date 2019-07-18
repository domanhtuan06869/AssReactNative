import React from 'react'
import { View, Text, Alert,KeyboardAvoidingView,FlatList,RefreshControl,Image, StyleSheet ,TouchableHighlight} from 'react-native'
import *as  firebase from 'firebase'
import { Dimensions } from 'react-native';
export default class Baivietcuatoi extends React.Component {
  static navigationOptions = {
    title: 'Bài viết của tôi',
    headerTintColor: '#fff',
    headerStyle:{
      
backgroundColor:'#027a51'
    }
  };
state={contencoment:'',recmt:null}
constructor(props) {
  super(props);
  this.state = { recmt: '' };
  const { navigation } = this.props;
  const itemEmail = navigation.getParam('useremail', 'NO-NAME');

    
}
componentWillMount(){
  const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    const itemEmail = navigation.getParam('useremail', 'NO-NAME');
    const { currentUser } = firebase.auth()
    var user=currentUser && currentUser.email;

      
      firebase.database().ref(`users/`).orderByChild('/Email').equalTo(`${user}`).on('value', function    (snapshot) {
  
        let array = [];
        snapshot.forEach(function(snapshot) {
         
          array.push({
            id:snapshot.key,
            Email: snapshot.val().Email,
            Name: snapshot.val().Name,
            Avatar:snapshot.val().Avatar,
            Content:snapshot.val().Content,
            Url:snapshot.val().Url,
            Date:snapshot.val().Date,
           
          
          });
        });
        thisState.setState({
          data : array
        })
       });
     
  
       this.state = {
         data : [],
       }

     navigate('Load')
  }
_onRefresh = () => {
    this.setState({refreshing: true})}
  render() {
    
    const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    const { currentUser } = firebase.auth()
  var user=currentUser && currentUser.email;
    return (
      
      <View style={styles.container}> 
     <FlatList   style={{ marginTop:10,width:300,height:400 
   }}
   extraData={this.state.data} 
        data = {this.state.data} 
        renderItem={({item}) => 
        <View style={{flexDirection:'column',
        }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
<Image style={{width:30,height:30,borderRadius:15,marginLeft:3}} source={{uri:item.Avatar}}></Image>

          <Text style={{fontWeight:'bold',}}>Email : {item.Name}</Text>
          <Text style={{marginLeft:26}}> {item.Content}</Text>
          </View>
          <Text style={{fontWeight:'100',fontSize:10,marginLeft:25}}>lúc {item.Date}</Text>
       
        <Text style={{height:0.3 ,width:Dimensions.get('window').width,backgroundColor:'gray'}}></Text>
        </View>
      
      }

        keyExtractor = {(item, index) =>  item.id }
        refreshControl={
            <RefreshControl 
             refreshing={this.state.refreshing}
             onRefresh={this._onRefresh}
            />
        }
        />

 <View style={{flexDirection:'row',alignItems:"center"}}>  
 <TouchableHighlight style={{width:205,height:40}} onPress={()=>{
   navigate('Main')
 }}>
<Image style={{width:30,height:30,marginLeft:90}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fhome-256.png?alt=media&token=f9008681-dab4-420d-9cc0-8d5178b3c3ff'}}></Image>
</TouchableHighlight>
<TouchableHighlight style={{width:205,backgroundColor:'#027a51',height:40}} onPress={()=>{
  const { currentUser } = firebase.auth()
  var user=currentUser && currentUser.email;

  this.chueyenuser()
}}>
<Image style={{width:30,height:30,marginLeft:90}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fuser-256.png?alt=media&token=c3c10b6e-94fe-4c99-b305-4eb1e16af71c'}}></Image>
</TouchableHighlight>
</View>   

      </View>
      
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'contain',
      
        justifyContent: 'center',
        alignItems: 'center'
      },  imglist:{
    height:450
  }
})
