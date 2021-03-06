import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
  View,
  Image

} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import { Artists } from '../../mockData';
import ArtistListItem from './ArtistListItem';

class ArtistList extends Component {
componentWillMount(){
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows( Artists ),
    }
  }

  
  render() {
    return (
      <View >
        <Text >
          Artists
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ ( artist ) => <ArtistListItem artist={ artist } /> }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#111',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
});

export default ArtistList;