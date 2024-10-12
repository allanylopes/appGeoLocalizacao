import React, { useEffect, useState } from 'react';
import { styles } from './style';

import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    Alert,

} from 'react-native';



import { MaterialIcons } from '@expo/vector-icons';
import Load from '../../components/Load';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import api from '../../../services/api';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { useIsFocused } from '@react-navigation/native';

import {Ionicons} from '@expo/vector-icons';

export default function Home() {
    const navigation= useNavigation();
    const isFocused = useIsFocused();

    const [dados, setDados] = useState([]);
    const [total, setTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    async function totalDadosCadastrados() {
        //ATENÇÃO TROQUE PASTA QUE ESTÁ NO XAMPP PELO NOME DA SUA PASTA CRIADA NO LOCALHOST        
        const res = await api.get(`provaAllany/listar-cards.php`);
        setTotal(res.data);
    }

     async function listarDados() {

     try {
            //ATENÇÃO TROQUE PASTA QUE ESTÁ NO XAMPP PELO NOME DA SUA PASTA CRIADA NO LOCALHOST 
            const res = await api.get(`provaAllany/buscar.php`);
            setDados(res.data.result);
         

               } catch (error) {
               console.log("Erro ao Listar " + error);
           } finally {
             setIsLoading(false);
             setRefreshing(false);
         }
     }

    useEffect(() => {
        listarDados();
        totalDadosCadastrados();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listarDados();

    };


    return (
        <View style={{ flex: 1, backgroundColor: '#C0C0C0' }}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.containerHeader}>

                        <TouchableOpacity
                            style={styles.menu}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <MaterialIcons name="menu" size={35} color="#BC8F8F" />
                        </TouchableOpacity>

                        <Image style={styles.logo} source={require('../../../assets/logo2.png')} />

                    </View>
                </View>



                {isLoading ?
                    <Load /> :

                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >

                        <View style={styles.circleProgressView}>
                            <View style={styles.textProgressContainer}>
                                <Text style={styles.textProgressTitle}>PETS CADASTRADOS</Text>
                                <Text style={styles.textProgress}>Quantidade de pets cadastrados</Text>
                            </View>

                            <AnimatedCircularProgress
                                size={80}
                                width={8}
                                fill={10}
                                tintColor="#FFB6C1"
                                backgroundColor="#e0e0e0"
                                lineCap={"round"}
                            >
                                {
                                    (fill) => (
                                        <Text style={styles.numberInside}>10</Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>


                        <View style={styles.containerBox}>

                            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                                <View>
                                    <View style={styles.box}>
                                        <MaterialIcons style={styles.iconRegistered} name="book" size={70} color="#BC8F8F" />
                                        <View style={styles.textos}>
                                            <Text style={styles.rText}>Pets Registrados</Text>
                                         <Text style={styles.lenghtText}>{total.total_usuarios}</Text>  
                                        </View>
                                    </View>
                                    <Text style={styles.textFooter}>VERIFICAR PETS CADASTRADOS</Text>
                                    
                                </View>
                            </TouchableOpacity>

                        </View>


         {/*ATENÇÃO TROCAR ATRIBUTO1 E ATRIBUTO2 PELOS ATRIBUTOS DA SUA TABELA DO BANCO DE DADOS  */}   
        {dados.map(item => (

        <View style={styles.griditem} key={item.id}><Text style={{color: '#585858'}}>{item.id} - {item.titular} - {item.nome}</Text>

      </View>
     ))}        
                       
                    </ScrollView>
                }
            </View>
        </View>



            


    )
}