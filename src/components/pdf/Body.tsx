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
        fontSize: 10
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
    }
  });

function Body(props : any) {
    const {paciente} = props

    let d1 = new Date();
    let curr_date = d1.getDate();
    let curr_month = d1.getMonth() + 1; //Months are zero based
    let curr_year = d1.getFullYear();
    return (
        <View style={styles.containerBody}>
            <View style={styles.detailColumnPaciente}>
                <Text style={styles.title}>Datos del paciente:</Text>
                <Text style={styles.itemContentPaciente}>{paciente[0].nombre}</Text>
                <Text style={styles.itemContentPaciente}>{`Edad: ${paciente[0].edad}`}</Text>
                <Text style={styles.itemContentPaciente}>{`Peso: ${paciente[0].peso} kg`}</Text>
                <Text style={styles.itemContentPaciente}>{`Efermedad Cronica: ${paciente[0].enfermedadesCronicas}`}</Text>
                <Text style={styles.itemContentPaciente}>{'Temp: ____________'}</Text>
                <Text style={styles.itemContentPaciente}>{'T.A: _____________'}</Text>
                <Text style={styles.itemContentPaciente}>{'F.c: _____________'}</Text>
                <Text style={styles.itemContentPaciente}>{'F.R: _____________'}</Text>
            </View>
            <View style={styles.detailColumn2}>
                <List {...props}/>
            </View>
            <View style={styles.detailColumn}>
                <Text style={styles.subtitle}>{`Fecha: ${curr_date}/${curr_month}/${curr_year}`}</Text>
                <View style={styles.firmaContainer}>
                    <Text style={styles.firma}>{'       Firma       '}</Text>
                </View>
            </View>
        </View>
    )
}

export default Body
