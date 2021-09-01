import { View, Text,StyleSheet } from '@react-pdf/renderer';
import List from './List';
import {ConsultaValues} from '../redux/consultas/consultasTypes'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    detailColumn: {
        flex:1,
        flexDirection: 'column'
    },
    detailColumn2:{
        flex:2,
        flexDirection: 'column'
    },
    itemContentPaciente: {
        fontSize: 10,
        marginBottom:  2
    }
  });

function Body(props : ConsultaValues) {
    const {nombrePaciente} = props;
    return (
        <View style={styles.container}>
            <View style={styles.detailColumn}>
                <Text style={styles.itemContentPaciente}>Datos del paciente:</Text>
                <Text style={styles.itemContentPaciente}>{nombrePaciente}</Text>
                <Text style={styles.itemContentPaciente}>28</Text>
                <Text style={styles.itemContentPaciente}>Es bien reata</Text>
            </View>
            <View style={styles.detailColumn2}>
                <List {...props}/>
            </View>
        </View>
    )
}

export default Body
