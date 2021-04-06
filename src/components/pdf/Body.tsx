import { View, Text,StyleSheet } from '@react-pdf/renderer';
import List from './List';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
        detailColumn: {
        flexDirection: 'column',
        flexGrow: 1
    },
    itemContent: {
        flex: 1,
        fontSize: 10
    }
  });

function Body(props : any) {
    return (
        <View style={styles.container}>
            <View style={styles.detailColumn}>
                <Text style={styles.itemContent}>Datos del paciente:</Text>
                <Text style={styles.itemContent}>Edwin Miguel Lara Espinoza</Text>
                <Text style={styles.itemContent}>28</Text>
                <Text style={styles.itemContent}>Es bien reata</Text>
            </View>
            <View style={styles.detailColumn}>
                <List {...props}/>
            </View>
        </View>
    )
}

export default Body
