import { StatusBar } from 'expo-status-bar';
import { app, header, title, headerText, container, picture, navBar, button } from './Styles';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

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

const Comic = (props) => {
  return (
    <ScrollView>
      <Text>Not Found</Text>
      <Image
        source={{uri: props.url}}
        style={picture}
      />
      <StatusBar style="auto" />
    </ScrollView>
  )
}

const parseComic = (text) => {
  //alert(text);
  var imgText = text.substr(text.indexOf('<div id="comic">')+16, 100)
  var split = imgText.split(" ");
  var imgURI = "https://".concat(split[1].slice(7, -1));
  return imgURI;
}

const NewWeb = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('https://xkcd.com/')
      .then((response) => response.text())
      .then((json) => parseComic(json))
      .then((result) => setData(result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={container}>
      {isLoading ? <ActivityIndicator/> : (
        <Comic url={data}/>
      )}
    </View>
  );
};

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
      <NewWeb/>
      <NavBar/>
    </View>
  );
}

export default App;
