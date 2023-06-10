import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react"
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Alert } from 'react-native';
import Api from './src/services/api';

export default function App() {
  const[cep, setCep] = useState("")
  const[logradouro, setLogradouro] = useState("")
  const[localidade, setLocalidade] = useState("")
  const[Estado, setEstado] = useState("")
  const[Bairro, setBairro] =useState("")

async function buscarCep(){
  if(cep==""){
    Alert.alert("Cep inválido ou vazio!")
    setCep("")
  }
try{
    const response = await Api.get(`/${cep}/json/`)
    setLogradouro(response.data.logradouro)
    setBairro(response.data.bairro)
    setEstado(response.data.uf)
    setLocalidade(response.data.localidade)

}catch(error){
  console.log("ERRO"+error)
}
  
}

  return (
    <View style={styles.container}>
    <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de cep </Text>
    </View>
<View style={styles.form}>
  <TextInput
  style={{borderColor:"#000000", borderWidth:2, width:200, fontSize:18, marginTop:20, marginEnd:20, borderRadius:10, padding:10}}
  value={cep} onChangeText={(texto)=> setCep(texto)} placeholder='Cep'></TextInput>

  <TouchableOpacity style={styles.botao} onPress={buscarCep}>
    <Text style={styles.textobuscar}>Buscar</Text>
  </TouchableOpacity>

</View>
<TextInput
  style={styles.caixadetexto}
  value={logradouro} onChangeText={(texto)=> setLogradouro(texto)} placeholder='logradouro'></TextInput>

<TextInput
  style={styles.caixadetexto}
  value={Bairro} onChangeText={(texto)=> setBairro(texto)} placeholder='Bairro'></TextInput>


<TextInput
  style={styles.caixadetexto}
  value={localidade} onChangeText={(texto)=> setLocalidade(texto)} placeholder='cidade'></TextInput>

<TextInput
  style={{borderColor:"#000000", borderWidth:2, width:80, fontSize:18, marginTop:10, marginEnd:10, borderRadius:10, padding:10, marginHorizontal:20}}
  value={Estado} onChangeText={(texto)=> setEstado(texto)} placeholder='Estado'></TextInput>

    </View>
  );
}


const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    
  },
  topBar:{
    flexDirection:"row", 
    height:70,
    backgroundColor: "#018786"
  },

  title:{
    color:"#ffffff",
    fontSize:25,
    fontWeight:"bold",
    alignSelf: "center",
    margin: 20,
    
  },
   form:{
    flexDirection:"row",
    heigth:"100",
    marginHorizontal:20,
    padding:10
   },
   botao:{
    backgroundColor:"#018786",
    width:120,
    height:70,
    marginTop:30,
    marginEnd:20,
    borderRadius:10,
    padding:20

   },
   textobuscar:{
    color:"#FFFFFF",
    fontSize:18,
    fontWeight:"bold",
    alignSelf:"center"

   },
   caixadetexto:{
    borderColor:"#000000",
    borderWidth:2,
    padding:15,
    fontSize:18,
    borderRadius:10,
    marginTop:10,
    marginHorizontal:20

   }
});
