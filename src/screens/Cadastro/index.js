


import React, { useState, useEffect } from 'react';
import { ScrollView,Alert, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import {  useNavigation } from '@react-navigation/core';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { showMessage, hideMessage } from "react-native-flash-message";


import api from '../../../services/api';

const Cadastro = FC= () => { 

    const navigation=  any= useNavigation();
   
    //CRIE O STATES PARA CADA ATRIBUTO
    const [titular, setTitular] = useState("");   
    const [nome, setNome] = useState("");   
    const [especie, setEspecie] = useState(""); 
    const [raca, setRaca] = useState(""); 
    const [porte, setPorte] = useState(""); 
         
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);



   async function saveData() {            
        
           if (titular == "" || nome == "" || especie == "" || raca == "" || porte == "") {
            showMessage({
                message: "Erro ao Salvar",
                description: 'Preencha os Campos Obrigatórios!',
                type: "warning",
            });
            return;
        }

        try {
            const obj = {

            //TROQUE PELOS SEUS ATRIBUTOS
                titular: titular, 
                nome: nome,   
                especie: especie,
                raca: raca,
                porte: porte,

                    
            }

            //ATENÇÃO TROQUE PASTA QUE ESTÁ NO XAMPP PELO NOME DA SUA PASTA CRIADA NO LOCALHOST
            const res = await api.post('provaAllany/salvar.php', obj);

            if (res.data.sucesso === false) {
                showMessage({
                    message: "Erro ao Salvar",
                    description: res.data.mensagem,
                    type: "warning",
                    duration: 3000,
                });               
                return;
            }

            setSuccess(true);
            showMessage({
                message: "Salvo com Sucesso",
                description: "Registro Salvo",
                type: "success",
                duration: 800,             
            });          
          
        } catch (error) {
            Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
            setSuccess(false);
        }
    }     
    
    

    return (
        <View style={{ flex: 1, marginTop: 0, backgroundColor: '#C0C0C0', }}>
            <View style={styles.Header}>
                 <Image style={styles.logo} source={require('../../../assets/logo2.png')} />         
          <TouchableOpacity
              onPress={ () =>  navigation.navigate("Home")}
          >
           <Ionicons style={{marginLeft:5, marginRight:5}} name="caret-back-outline" size={35} color="#BC8F8F"></Ionicons>
          </TouchableOpacity>
                           
            </View>

            <View style={styles.Title}>

                     <Ionicons name="paw-outline" size={35} color="#ffffff" />
                        <Text style={styles.TitleText}>CADASTRE SEU PET</Text>
                    </View>

            <ScrollView>   
            <View>  
                 {/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO1 */}
                <Text style={styles.TitleInputs}>Nome do Titular:</Text>


                {/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO1 */}
                <TextInput               
                    placeholder="Coloque seu nome"
                    onChangeText={(text) => setTitular(text)}
                    value={titular}
                    style={styles.TextInput}
                />
            </View>

            <View>  
                 {/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO2 */}
                <Text style={styles.TitleInputs}>Nome do pet:</Text>


                {/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO2 */}
                <TextInput               
                    placeholder="Coloque o nome do seu pet"
                    onChangeText={(text) => setNome(text)}
                    value={nome}
                    style={styles.TextInput}
                />
            </View>

            <View>  
            <Text style={styles.TitleInputs}>Espécie do seu pet:</Text>


{/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO2 */}
            <TextInput               
                placeholder="Coloque a espécie do seu pet"
                onChangeText={(text) => setEspecie(text)}
                value={especie}
                style={styles.TextInput}
            />
        </View>


        <View>  
            <Text style={styles.TitleInputs}>Raça do seu pet:</Text>


{/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO2 */}
            <TextInput               
                placeholder="Coloque a raça do seu pet"
                onChangeText={(text) => setRaca(text)}
                value={raca}
                style={styles.TextInput}
            />
        </View>


        <View>  
            <Text style={styles.TitleInputs}>Porte do seu pet:</Text>


{/*TROQUE OS DADOS REFERENTRE AO SEU ATRIBUTO2 */}
            <TextInput               
                placeholder="Coloque o tamanho do seu pet"
                onChangeText={(text) => setPorte(text)}
                value={porte}
                style={styles.TextInput}
            />
        </View>
                       
                  
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                        setSuccess(true);
                        saveData();
                        setSuccess(false);
                    }}
                >

                    <Text style={styles.ButtonText}>SALVAR</Text>
                </TouchableOpacity>

                </ScrollView>                 

        </View>
    );
}

export default Cadastro;