import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput
} from 'react-native';
import { Dimensions } from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';

console.disableYellowBox = true;




export default class News extends React.Component {
  static navigationOptions={
    title:'Đăng bài',
    headerTintColor: '#fff',
    headerStyle:{
      backgroundColor:'#027a51'
    }
  }

  state = {
    image: null,
    uploading: false,
    content:'',


  };


  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;
   
    const { navigation } = this.props;
    const itemName = navigation.getParam('Name', 'NO-NAME');
    
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
           
          </Text>
        )}
          <Text style={{fontWeight:'bold'}}>
           Xin chào {itemName}
        </Text> 
        <TextInput style={{width:Dimensions.get('window').width, height:200,paddingLeft:30}} placeholder='Hãy viết gì đó '  onChangeText={(content) => this.setState({ content })}></TextInput>

        <Button
          onPress={this._pickImage}
          title="Chọn ảnh từ thư viện"
        />
        <Button title='Chụp một ảnh mới' onPress={this._takePhoto}></Button>

       

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        {/*<Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>*/}
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    const{image}=this.state;
    var a=firebase.auth();
    const { navigation } = this.props;
    const itemId = navigation.getParam('Email', 'NO-NAME');
    const itemName = navigation.getParam('Name', 'NO-NAME');
    const itemAvatar = navigation.getParam('Avatar', 'NO-NAME');
  
    try {
      this.setState({ uploading: true });
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
     
        firebase.database().ref('users/').push({
        
          Email: itemId,
          Name:itemName,
          Avatar:itemAvatar,
          Content : this.state.content,
          Url :this.state.image,
          Date:   hours + ' giờ :' + min +' phút '+date + '/' + month + '/' + year 
      }, function(error) {
        if (error) {
          // The write failed...
         Alert. alert('Loi')
        } else {
          // Data saved successfully!
          Alert.alert('Đăng ảnh thành công!!!')
        }
      });

        
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref('image/')
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}