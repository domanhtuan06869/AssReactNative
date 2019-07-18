import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Dangki from './components/Dangki';
import Dangnhap from './components/Dangnhap'
import Main from './components/Main'
import Loading from './components/Loading'
import News from './components/News'
import Comments from './components/Comments'
import User from './components/User'
import Updateuser from './components/Updateuser'
import Baivietcuatoi from './components/Baivietcuatoi';
import Load from './components/Load';
 

const RootStack = createStackNavigator({

  Loading:{
    screen:Loading
  },
  Dangnhap:{
    screen:Dangnhap
    },
 
Dangki: {
  screen: Dangki
},
Main:{
  screen:Main
},
News:{
  screen:News
},
Comments:{
  screen:Comments
},
User:{
  screen:User
}
,Updateuser:{
  screen:Updateuser
},
Baivietcuatoi:{
  screen:Baivietcuatoi
},
Load:{
  screen:Load
}

});

const App = createAppContainer(RootStack);

export default App;