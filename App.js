//Importando recursos necessários 

import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react"
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Alert } from 'react-native';
import Api from './src/services/api';

//criando app
export default function App() {
  //definindo constantes para os campos iniciarem vazios.
  const[cep, setCep] = useState("")
  const[logradouro, setLogradouro] = useState("")
  const[localidade, setLocalidade] = useState("")
  const[Estado, setEstado] = useState("")
  const[Bairro, setBairro] =useState("")

  //Criando função para busca e exibição dos dados solicitados a partir do cep inserido. 
async function buscarCep(){
  //Filtro para que o user não consiga enviar dados vazios.
  if(cep==""){
    Alert.alert("Cep inválido ou vazio!")
    setCep("")
  }
try{
  //captura do cep para consulta na Api, e exibição dos dados
    const response = await Api.get(`/${cep}/json/`)
    //definindo os valores dos campos para os recebidos da Api
    setLogradouro(response.data.logradouro)
    setBairro(response.data.bairro)
    setEstado(response.data.uf)
    setLocalidade(response.data.localidade)
//reporte de erro
}catch(error){
  console.log("ERRO"+error)
}
  
}

  //inicio da estrutura do app
  return (
    <View style={styles.container}>
    <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de cep </Text>
    </View>
//campo cep 
    <View style={styles.form}>
        <TextInput
        style={{borderColor:"#000000", borderWidth:2, width:200, fontSize:18, marginTop:20, marginEnd:20, borderRadius:10, padding:10}}
        value={cep} onChangeText={(texto)=> setCep(texto)} placeholder='Cep'></TextInput>
//botão de pesquisa
        <TouchableOpacity style={styles.botao} onPress={buscarCep}>
          <Text style={styles.textobuscar}>Buscar</Text>
        </TouchableOpacity>

     </View>
//campo para exibição do logradouro
      <TextInput
        style={styles.caixadetexto}
        value={logradouro} onChangeText={(texto)=> setLogradouro(texto)} placeholder='logradouro'></TextInput>
//campo para exibição do Bairro
      <TextInput
        style={styles.caixadetexto}
        value={Bairro} onChangeText={(texto)=> setBairro(texto)} placeholder='Bairro'></TextInput>

//campo para exibição do municipio
      <TextInput
        style={styles.caixadetexto}
        value={localidade} onChangeText={(texto)=> setLocalidade(texto)} placeholder='cidade'></TextInput>

//campo para exibição do estado
      <TextInput
        style={{borderColor:"#000000", borderWidth:2, width:80, fontSize:18, marginTop:10, marginEnd:10, borderRadius:10, padding:10, marginHorizontal:20}}
        value={Estado} onChangeText={(texto)=> setEstado(texto)} placeholder='Estado'></TextInput>

          </View>
        );
      }

//inicio da estilização dos campos 
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
