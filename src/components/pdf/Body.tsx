import { View, Text,StyleSheet } from '@react-pdf/renderer';
import List from './List';

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
    title:{
        fontSize: 12,
        marginBottom: 2,
        fontWeight:'bold'
    },
    itemContentPaciente: {
        fontSize: 10,
        marginBottom: 2
    }
  });

function Body(props : any) {
    const {paciente} = props
    console.log(paciente);
    return (
        <View style={styles.container}>
            <View style={styles.detailColumn}>
                <Text style={styles.title}>Datos del paciente:</Text>
                <Text style={styles.itemContentPaciente}>{paciente[0].nombre}</Text>
                <Text style={styles.itemContentPaciente}>{`Edad: ${paciente[0].edad}`}</Text>
                <Text style={styles.itemContentPaciente}>{`Peso: ${paciente[0].peso} kg`}</Text>
                <Text style={styles.itemContentPaciente}>{`Efermedad Cronica: ${paciente[0].enfermedadesCronicas}`}</Text>
            </View>
            <View style={styles.detailColumn2}>
                <List {...props}/>
            </View>
        </View>
    )
}

export default Body
