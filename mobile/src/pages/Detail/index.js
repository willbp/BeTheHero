import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import style from './style';
import logoImg from '../../assets/logo.png';


export default function Detail(){
    const navigation = useNavigation();
    
    const route = useRoute(); 
    //traz a rota de incidents index.hs
    const incident = route.params.incident;
    //traz os parametros de incident variável criada lá .. ('Detail'),{incidents}
    
    
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar o caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function navigationBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }   

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"></Feather>
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
            <Text style={[style.incidentProperty, { marginTop: 0}]}>ONG:</Text>
            <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>Caso:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>Valor:</Text>
                <Text style={style.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL'
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={style.contatcBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o Herói desse caso.</Text>
                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}