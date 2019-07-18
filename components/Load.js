import React from 'react'
import { StyleSheet, Alert, Image, Text, View,Button ,FlatList,TouchableHighlight} from 'react-native'
import *as firebase from 'firebase'
import { Dimensions } from 'react-native';

export default class Load extends React.Component {
  
static navigationOptions=({ navigation})=>({
  title:'Bài viết của tôi',
  headerTintColor: '#fff',
  headerStyle:{
    backgroundColor:'#027a51'
  },

  headerLeft:(
    
    <Button title='Đăng xuất' color='#fff' style={{backgroundColor:'#027a51'}} onPress={()=>{
     
      const currentUser  = firebase.auth()
    

      if(currentUser != null) {
        firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate('Loading'))
        .catch(error => {})

      }

    }}></Button>

  ),
  headerRight:(
    
<Button color='#fff' title ='Info' onPress={()=>{

const { currentUser } = firebase.auth()
var user=currentUser && currentUser.email;
firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${user}`).once('value', function(snapshot){
  var exists = snapshot.val();
  if (exists){
     
  }
  else{     
   
    firebase.database().ref(`Canhan/`).push({
    
      email:user,
      name:'',
      age: '',
      sdt:'',
      adress:''
      ,url:''
   
  }, function(error) {
    if (error) {

    } else {

    }
  });
  
  }

});
navigation.navigate('User',{useremail:user})

}
}>
  
</Button>
  )
  
});

  state = { currentUser: null }
 
  constructor(props){
    const { currentUser } = firebase.auth()
    var itemEmail=currentUser && currentUser.email;
    firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${itemEmail}`).once('value', function    (snapshot) {
  
      let arr = [];
      snapshot.forEach(function(snapshot) {
       
        arr.push({
          id:snapshot.key,
          email: snapshot.val().email,
          name: snapshot.val().name,
          adress:snapshot.val().adress,
          sdt:snapshot.val().sdt,
          url:snapshot.val().url,
         
        
        });
      });
      thisState.setState({
        datauser : arr
      })
     });
    firebase.database().ref('users/').on('value', function    (snapshot) {

      let array = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        array.push({
          id : childSnapshot.key,
          Email : childData.Email,
          Content : childData.Content,
          Url : childData.Url,
          Date:childData.Date,
          Avatar:childData.Avatar,
          Name:childData.Name
        
        });
      });
      thisState.setState({
        data : array.reverse(),
        
      })
     });
    super(props);
     // Set the configuration for your app

     this.state = {
       data : [],datauser :[]
     }
    thisState = this;
  }

  componentDidMount() {
    const {navigate} = this.props.navigation;
    navigate('Baivietcuatoi')
  
  
  }
// sự kiện click cmt
   chay(id,content,email,url) {
    const {navigate} = this.props.navigation;
    firebase.database().ref(`Comment/${id}`).on('value', function(snapshot){
      var exists = snapshot.val();
      if (exists){
          Alert.alert('ton tai')
      }
      else{     
        firebase.database().ref(`Comment/${id}`).push({
        
          Email: '',
          Content: '',
       
      }, function(error) {
        if (error) {
       
        } else {
   
        }
      });
      
      }

  });
  navigate('Comments',{Content:content,ImageUrl:url,email:email,ID:id})
  }
  //chuyen sang user chi tiet 
  chueyenuser() {
    const {navigate} = this.props.navigation;
    const { currentUser } = firebase.auth()
    var user=currentUser && currentUser.email;
    firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${user}`).once('value', function(snapshot){
      var exists = snapshot.val();
      if (exists){
         
      }
      else{     
       
        firebase.database().ref(`Canhan/`).push({
        
          email:user,
          name:'',
          age: '',
          sdt:'',
          adress:''
          ,url:''
       
      }, function(error) {
        if (error) {

        } else {
   
        }
      });
      
      }

  });
  navigate('User',{useremail:user})

  }


  render() {
    const { currentUser } = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
       

{/**list main */}
        <FlatList style={{ marginTop:10
   }}
        data = {this.state.data} 
        renderItem={({item}) => 
        <View style={{flexDirection:'column',
        }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
<Image style={{width:30,height:30,borderRadius:15,marginLeft:3}} source={{uri:item.Avatar}}></Image>

          <Text style={{fontWeight:'bold',}}>{item.Name}</Text>
          
          </View>
          <Text style={{fontWeight:'100',fontSize:10,marginLeft:25}}>lúc {item.Date}</Text>
          <Text style={{marginLeft:26}}> {item.Content}</Text>
        <Image style={styles.imglist} source={{uri:item.Url}}></Image>

        <View style={{flexDirection:'row'}}>

          {/*like */}
        <Image style={{width:30, height:30,margin:10
        }} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Flike.png?alt=media&token=59478b0d-9e91-450e-85fd-7b11adcb1464'}}></Image>
    
    
          {/*comment */}
        <TouchableHighlight onPress={
               ()=>    this.chay(item.id,item.Content,item.Email,item.Url)
               /*navigate('Comments',{Content:item.Content,ImageUrl:item.Url}) */ }>
         <Image 
          style={{width:30, height:30, margin:10
        }} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fcomment.png?alt=media&token=fc4285d8-4ec7-4f44-887d-f9b06b45795b'}}></Image>
     </TouchableHighlight>


          {/*share */}
     <Image style={{width:30, height:30,margin:10
        }} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fshare-raw-256.png?alt=media&token=320fd808-99ea-45c8-acfa-972ce65221d8'}}></Image>
        {/*delete status */}
         <TouchableHighlight style={{marginLeft:225}} onPress={
               ()=>   {if(currentUser && currentUser.email==item.Email){
                firebase.database().ref('users/'+ item.id).remove();
                  Alert.alert(`Xóa thành công`)
               }else{
                 Alert.alert(`Không thể xóa !Đây không phải bài viết bạn đăng`)
               }
              }
               /*navigate('Comments',{Content:item.Content,ImageUrl:item.Url}) */ }>
         <Image 
          style={{width:30, height:30, margin:10
        }} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fdelete.png?alt=media&token=329d73ca-2d85-4ad6-8335-992121c6edf1'}}></Image>
     </TouchableHighlight>
        </View>
        <Text style={{height:0.3 ,width:Dimensions.get('window').width,backgroundColor:'gray'}}></Text>
        </View>
      
      }

        keyExtractor = {(item, index) =>  item.id }
        />
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:Dimensions.get('window').width}}>

        <TouchableHighlight onPress={()=>{
 
  navigate('Main')
  
}} style={{width:205,height:40}}>
< Image style={{width:30,height:30,marginLeft:90}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fhome-256.png?alt=media&token=f9008681-dab4-420d-9cc0-8d5178b3c3ff'}}></Image>
 </TouchableHighlight>
<TouchableHighlight style={{width:205,height:40,backgroundColor:'#027a51'}} onPress={()=>{
  const { currentUser } = firebase.auth()
  var user=currentUser && currentUser.email;
  navigate('Baivietcuatoi',{useremail:user})
  
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
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imglist:{
    height:450
  }
})
