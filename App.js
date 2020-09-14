import { StatusBar } from 'expo-status-bar';
import { app, header, title, headerText, container, picture, navBar, button } from './Styles';
import React, { Component, useState, useEffect } from 'react';
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
      <Text>{props.title}</Text>
      <Image
        source={{uri: props.url}}
        style={picture}
      />
      <StatusBar style="auto" />
    </ScrollView>
  )
}

const parseComic = (text) => {
  var imgText = text.substr(text.indexOf('<div id="comic">')+16, 500);
  var split = imgText.split(" ");
  var imgURI = "https://".concat(split[1].slice(7, -1));

  var titleText = imgText.split("=");
  var tt = titleText[2].slice(1,-6);
  var title = titleText[3].slice(0,-7);

  var numText = text.substr(text.indexOf('https://xkcd.com/')+17, 4);

  return {uri: imgURI,
          titletext: tt,
          title: title,
          lastNum: numText};
}

const NavBar = (props) => {
  const press = (num) => {
    if(num<=props.last) {
      props.onNumChange(num);
    }
  }
  return (
    <View style={navBar}>
      <TouchableOpacity style={button}
                        onPress={() => press(1)}>
        <Text style={headerText}>First</Text>
      </TouchableOpacity>     
      <TouchableOpacity style={button}
                        onPress={() => press(props.comicNum-1)}> 
        <Text style={headerText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}
                        onPress={() => press(Math.floor(Math.random()*(props.last-1)+1))}> 
        <Text style={headerText}>Random</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}
                        onPress={() => press(props.comicNum+1)}> 
        <Text style={headerText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}
                        onPress={() => press(props.last)}> 
        <Text style={headerText}>Latest</Text>
      </TouchableOpacity>
    </View>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleNumChange = this.handleNumChange.bind(this);

    this.state ={
      number: 0,
      isLoading: true,
      data: '',
      title: '',
      latest: 0,
    }
  }

  componentDidMount() {
    fetch('https://xkcd.com/')
      .then((response) => response.text())
      .then((json) => parseComic(json))
      .then((result) =>{
        this.setState({ data: result.uri,
                        title: result.title,
                        number: parseInt(result.lastNum),
                        latest: parseInt(result.lastNum)});
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false}));
  }

  handleNumChange(n) {
    this.state.number = n;
    this.stateCallback();
  }

  stateCallback() {
    fetch('https://xkcd.com/'.concat(this.state.number.toString()))
      .then((response) => response.text())
      .then((json) => parseComic(json))
      .then((result) => {
        this.state.data = result.uri;
        this.state.title = result.title;
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading: false}));
  }
 
  render() {
    const { number, isLoading, data, title, latest } = this.state;

    return (
      <View style={app}>
        <Header/>
        <View style={container}>
          {isLoading ? <ActivityIndicator/> : (
            <Comic url={data}
                   title={title}/>
          )}
        </View>
        <NavBar comicNum={number}
                last={latest}
                onNumChange={this.handleNumChange}/>
      </View>
    );
  }
}

export default App;
