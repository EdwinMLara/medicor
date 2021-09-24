import { View, Text,StyleSheet } from '@react-pdf/renderer';
import List from './List';

const styles = StyleSheet.create({
    containerBody: {
        marginTop:10,
        marginBottom:10,
        flexDirection: 'row',
        height:200
    },
    detailColumnPaciente:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    detailColumn: {
        flex:1,
        flexDirection: 'column',
    },
    detailColumn2:{
        flex:2,
        flexDirection: 'column',
        paddingLeft:10
    },
    title:{
        fontSize: 12,
        marginBottom: 2,
        fontWeight:'bold'
    },
    subtitle: {
        fontSize: 10,
        alignItems:'center',
        fontWeight:'ultrabold'
    },
    sintomas:{
        fontSize:10,
        fontWeight:'ultrabold',
        marginBottom:15
    },
    itemContentPaciente: {
        fontSize: 10,
        marginBottom: 2
    },
    firmaContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    firma:{
        borderColor:'black',
        borderTopWidth: 2,
        borderStyle:'solid',
        paddingTop:5
    },
    fechaContainer:{
        alignItems:'center'
    }
  });

function Body(props : any) {
    const {paciente,sintomas} = props

    let d1 = new Date();
    let curr_date = d1.getDate();
    let curr_month = d1.getMonth() + 1; //Months are zero based
    let curr_year = d1.getFullYear();

    let temperatura = props.temperatura || 'No registrada';
    let tensionArterial = props.tensionArterial || 'No registrada';
    let frecuenciaCardiaca = props.frecuenciaCardiaca || 'No registrada';
    let frecuenciaRespiratoria = props.frecuenciaRespiratoria || 'No registrada';

    return (
        <View style={styles.containerBody}>
            <View style={styles.detailColumnPaciente}>
                <Text style={styles.subtitle}>Datos del paciente:</Text>
                <Text style={styles.itemContentPaciente}>{paciente[0].nombre}</Text>
                <Text style={styles.itemContentPaciente}>{`Edad: ${paciente[0].edad}`}</Text>
                <Text style={styles.itemContentPaciente}>{`Peso: ${paciente[0].peso} kg`}</Text>
                <Text style={styles.itemContentPaciente}>{`Temp: ${temperatura}`}</Text>
                <Text style={styles.itemContentPaciente}>{`T.A: ${tensionArterial}`}</Text>
                <Text style={styles.itemContentPaciente}>{`F.C: ${frecuenciaCardiaca}`}</Text>
                <Text style={styles.itemContentPaciente}>{`F.R: ${frecuenciaRespiratoria}`}</Text>
                <Text style={styles.itemContentPaciente}>{`Efermedad Cronica: ${paciente[0].enfermedadesCronicas}`}</Text>
            </View>
            <View style={styles.detailColumn2}>
                <Text style={styles.sintomas}>{`Sintomas: ${sintomas}`}</Text>
                <List {...props}/>
            </View>
            <View style={styles.detailColumn}>
                <View style={styles.fechaContainer}>
                    <Text style={styles.subtitle}>{`Fecha: ${curr_date}/${curr_month}/${curr_year}`}</Text>
                </View>
                <View style={styles.firmaContainer}>
                    <Text style={styles.firma}>{'       Firma       '}</Text>
                </View>
            </View>
        </View>
    )
}

export default Body
