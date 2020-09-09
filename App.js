import { StatusBar } from 'expo-status-bar';
import { app, header, title, headerText, container, navBar, button } from './Styles';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const Header = () => {
  return (
    <View style={header}>
      <View style={title}>
        <Text style={headerText}>xkcd 404</Text>
      </View>
      <TouchableOpacity style={button}> 
        <Text style={headerText}>Title Text</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}> 
        <Text style={headerText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const Comic = () => {
  return (
    <View style={container}>
      <Text>Not Found</Text>
      <Image
        source={require('./assets/not_found.png')}
      />
      <StatusBar style="auto" />
    </View>
  )
}

class MyWeb extends Component {
  render() {
    const jsCode = `
      window.ReactNativeWebView.postMessage(document.getElementById('comic').innerHTML);
      true;
    `;

    return (
      <WebView
        source={{ uri: 'https://xkcd.com/' }}
        onMessage={event => {
          alert(event.nativeEvent.data);
        }}
        injectedJavaScript={jsCode}
        style={container}
      />
    );
  }
}

const NavBar = () => {
  return (
    <View style={navBar}>
      <TouchableOpacity style={button}> 
        <Text style={headerText}>First</Text>
      </TouchableOpacity>     
      <TouchableOpacity style={button}> 
        <Text style={headerText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}> 
        <Text style={headerText}>Random</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}> 
        <Text style={headerText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}> 
        <Text style={headerText}>Latest</Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  return (
    <View style={app}>
      <Header/>
      <Comic/>
      <NavBar/>
    </View>
  );
}

export default App;
