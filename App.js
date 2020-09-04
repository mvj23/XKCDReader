import { StatusBar } from 'expo-status-bar';
import { app, header, headerText, container, navBar } from './Styles';
import React from 'react';
import { Text, View, Image, Button } from 'react-native';

const Header = () => {
  return (
    <View style={header}>
      <Text style={headerText}>xkcd 404</Text>
      <Button title="Title Text"/>
      <Button title="Search"/>
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

const NavBar = () => {
  return (
    <View style={navBar}>
      <Button title="First"/>
      <Button title="Previous"/>
      <Button title="Random"/>
      <Button title="Next"/>
      <Button title="Latest"/>
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
