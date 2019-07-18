import React from 'react'
import { StyleSheet, Alert, Image, Text, View, Button, FlatList, TouchableHighlight } from 'react-native'
import *as firebase from 'firebase'
import { Dimensions } from 'react-native';
import { Constants } from 'expo';


export default class Main extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Bản tin',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor:'#212F3C'
    },

    headerLeft: (

      <Button title='Đăng xuất' color='#fff' style={{ backgroundColor: '#212F3C1' }} onPress={() => {

        const currentUser = firebase.auth()


        if (currentUser != null) {
          firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.navigate('Loading'))
            .catch(error => { })

        }

      }}></Button>

    ),
  /*  headerRight: (

      <Button color='#fff' title='Info' onPress={() => {

        const { currentUser } = firebase.auth()
        var user = currentUser && currentUser.email;
        firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${user}`).once('value', function (snapshot) {
          var exists = snapshot.val();
          if (exists) {

          }
          else {

            firebase.database().ref(`Canhan/`).push({

              email: user,
              name: '',
              age: '',
              sdt: '',
              adress: ''
              , url: ''

            }, function (error) {
              if (error) {

              } else {

              }
            });

          }

        });
        navigation.push('User', { useremail: user })

      }
      }>

      </Button>
    )*/

  });

  state = { currentUser: null ,}

  constructor(props) {
    const { currentUser } = firebase.auth()
    var itemEmail = currentUser && currentUser.email;
    firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${itemEmail}`).once('value', function (snapshot) {

      let arr = [];
      snapshot.forEach(function (snapshot) {

        arr.push({
          id: snapshot.key,
          email: snapshot.val().email,
          name: snapshot.val().name,
          adress: snapshot.val().adress,
          sdt: snapshot.val().sdt,
          url: snapshot.val().url,


        });
      });
      thisState.setState({
        datauser: arr
      })

    });
    firebase.database().ref('users/').on('value', function (snapshot) {

      let array = [];
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        array.push({
          id: childSnapshot.key,
          Email: childData.Email,
          Content: childData.Content,
          Url: childData.Url,
          Date: childData.Date,
          Avatar: childData.Avatar,
          Name: childData.Name

        });
      });
      thisState.setState({
        data: array.reverse(),

      })
     
    });
    super(props);
    // Set the configuration for your app

    this.state = {
      data: [], rong: 20, cao: 20, isFetching: false,
    }
    thisState = this;
   
  }

  componentDidMount() {

    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
    this.fetchData();

  }
  onRefresh() {
    console.log('refreshing')
    this.setState({ isFetching: true }, function () {
      this.fetchData()
    });
  }
  fetchData() {
    this.setState({ isFetching: false });
  }
  // sự kiện click cmt
  chay(id, content, email, url, name, avatar) {
    const { push } = this.props.navigation;
    firebase.database().ref(`Comment/${id}`).once('value', function (snapshot) {
      var exists = snapshot.val();
      if (exists) {

      }
      else {
        firebase.database().ref(`Comment/${id}`).push({

          Email: '',
          Content: '',

        }, function (error) {
          if (error) {

          } else {

          }
        });

      }

    });
    push('Comments', { Content: content, ImageUrl: url, email: email, ID: id, Name:name , Avatar: avatar })
  }
  //chuyen sang user chi tiet 
  chueyenuser() {
    const { navigate } = this.props.navigation;
    const { currentUser } = firebase.auth()
    var user = currentUser && currentUser.email;
    firebase.database().ref(`Canhan/`).orderByChild('/email').equalTo(`${user}`).once('value', function (snapshot) {
      var exists = snapshot.val();
      if (exists) {

      }
      else {

        firebase.database().ref(`Canhan/`).push({

          email: user,
          name: '',
          age: '',
          sdt: '',
          adress: ''
          , url: ''

        }, function (error) {
          if (error) {

          } else {

          }
        });

      }

    });
    navigate('User', { useremail: user })

  }

  render() {
    const { currentUser } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/*list hearder*/}
        <FlatList style={{ width: 400, height: 60 }}
          data={this.state.datauser}
          renderItem={({ item }) =>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 50, height: 50, borderRadius: 25, marginLeft: 10 }} source={{ uri: item.url }}></Image>
              <Text style={{ color: 'gray', fontSize: 20 }} onPress={() => {
                navigate('News', { Name: item.name, Email: item.email, Avatar: item.url })
              }}>Xin chào:{item.name} bạn đang nghĩ gì</Text>


            </View>
          }
          keyExtractor={(item, index) => item.id}
        />

        {/**list main */}
        <FlatList style={{
          marginTop: 10,
        }}

          data={this.state.data}
          renderItem={({ item }) =>
            <View style={{
              flexDirection: 'column',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:5}}>
                <Image style={{ width: 35, height: 35, borderRadius: 17 , marginLeft: 3 }} source={{ uri: item.Avatar }}></Image>
              <View style={{flexDirection:'column'}}>
                <Text style={{ fontWeight: 'bold', }}>  {item.Name}</Text>
                <Text style={{fontStyle:'italic', fontSize: 10,marginLeft:3 }}>lúc {item.Date}</Text>
                 </View>
              </View>
              <Text style={{ marginLeft: 26 ,marginTop:3}}>{item.Content}</Text>
              <Image style={styles.imglist} source={{ uri: item.Url }}></Image>

              <View style={{ flexDirection: 'row' }}>

                {/*like */}
                <Image style={{
                  width: 20, height: 20, margin: 10
                }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Flike.png?alt=media&token=59478b0d-9e91-450e-85fd-7b11adcb1464' }}></Image>


                {/*comment */}
                <TouchableHighlight onPress={
                  () => {
                    this.chay(item.id,item.Content,item.Email,item.Url,item.Name,item.Avatar)
                  }
                }>
                  <Image
                    style={{
                      width: 20, height: 20, margin: 10
                    }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fcomment.png?alt=media&token=fc4285d8-4ec7-4f44-887d-f9b06b45795b' }}></Image>
                </TouchableHighlight>


                {/*share */}
                <Image style={{
                  width: 20, height: 20, margin: 10
                }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fshare-raw-256.png?alt=media&token=320fd808-99ea-45c8-acfa-972ce65221d8' }}></Image>
                {/*delete status */}

                <TouchableHighlight style={{ marginLeft: 230}} onPress={
                  () => {
                    var us = currentUser && currentUser.email;
                    if (us == item.Email) {
                      firebase.database().ref('users/' + item.id).remove();
                      Alert.alert(`Xóa thành công`)
                    } else {
                      Alert.alert(`Không thể xóa !Đây không phải bài viết bạn đăng`)
                    }
                  }
                }>
                  <Image style={{ width: this.state.rong, height: this.state.cao, margin: 10 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fdelete.png?alt=media&token=329d73ca-2d85-4ad6-8335-992121c6edf1' }}></Image>
                </TouchableHighlight>
              </View>
              <Text style={{ height: 0.3, width: Dimensions.get('window').width, backgroundColor: 'gray' }}></Text>
            </View>

          }
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}

          keyExtractor={(item, index) => item.id}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width }}>

          <TouchableHighlight onPress={() => {
            this.props.navigation.navigate('Main')

          }} style={{ backgroundColor: '#212F3C', width: 205, height: 40 }}>
            < Image style={{ width: 30, height: 30, marginLeft: 90 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fhome-256.png?alt=media&token=f9008681-dab4-420d-9cc0-8d5178b3c3ff' }}></Image>
          </TouchableHighlight>
          <TouchableHighlight style={{ width: 205, height: 40 }} onPress={() => {
           /* const { currentUser } = firebase.auth()
            var user = currentUser && currentUser.email;
            navigate('Load', { useremail: user })*/

          }}>
            <Image style={{ width: 30, height: 30, marginLeft: 90 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fuser-256.png?alt=media&token=c3c10b6e-94fe-4c99-b305-4eb1e16af71c' }}></Image>
          </TouchableHighlight>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imglist: {
    width: Dimensions.get('window').width,
    height: 450
  }
})
