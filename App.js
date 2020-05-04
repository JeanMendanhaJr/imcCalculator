import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';

// or any pure javascript modules available in npm
//import { Button } from 'react-native-paper';

export default class App extends React.Component {

  //Variaveis globais do app
  state = {
    weight: 0,
    height: 0,
    imc: 0,
    legend: 'Indeterminate',
    color: '#bdc3c7',
  }
  
  //Metodo de calculo de IMC
  calcularIMC = () => {
    
    const result = this.state.weight / (this.state.height * this.state.height);
    
    this.setState({
      imc: Math.ceil(result)
    });

    if(result <18.5){
      this.setState({
        legend: 'Thinness',
        color: '#e74c3c'
      });

    } else if (result >= 18.5  && result < 24.9){
      this.setState({
        legend: 'Normal',
        color: '#2ecc71'
      });

    } else if (result >=25 && result < 29.9){
      this.setState({
        legend: 'Overweight',
        color: '#f1c40f'
      });

    } else if (result >= 30 && result <39.9){
      this.setState({
        legend: 'Obesity',
        color: '#e67e22'
      });

    } else if(result >= 40){
      this.setState({
        legend: 'Severe Obesity',
        color: '#e74c3c'
      });
    }
  }

  //Renderisação em tela
  render() {
    //const imc = 25;
    const legend = 'Normal';

    return (
      <View style={styles.app}>
        <Text style={styles.legend}> Your IMC </Text>

        <View style={[styles.panel, {backgroundColor: this.state.color}]}>
          <Text style={styles.result}> {this.state.imc} </Text>
          <Text style={styles.diagnostic}> {this.state.legend} </Text>
        </View>

        <View>
          <TextInput 
            style={styles.weight}
            label="Weight"
            onChangeText={value =>{
              this.setState({weight: value.replace(',','.')}); //replace troca de string
            }}
          />

          <TextInput 
            style={styles.height} 
            label="Height"
            onChangeText={value => {
              this.setState({height: value.replace(',','.')});
            }}
          />
            <Button mode="contained" onPress={this.calcularIMC}>
            Execute
            </Button>
        </View>
      </View>
    );
  }
}

//CSS
const styles = StyleSheet.create({
  app: {
    padding: 40,
    marginVertical: 20,
  },
  panel: {
    alignSelf: 'center',
    borderRadius: 15,
    width: 150,
    marginVertical: 10,
    paddingVertical: 8,
  },
  legend: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  result: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  diagnostic: {
    textAlign: 'center',
    fontSize: 16,
  },
  weight: {
    marginVertical: 10,
  },
  height: {
    marginVertical: 10,
  },
});
