import {Text,View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
    },
        detailColumn: {
        flexDirection: 'column',
        flexGrow: 9,
        textTransform: 'uppercase',
    },
    name: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 10
    }   
});

function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.detailColumn}>
                <Text style={styles.name}>Consultorio</Text>
                <Text style={styles.subtitle}>Médico</Text>
                <Text style={styles.subtitle}>Dra. Maria Elena test test</Text>
            </View>
            <View style={styles.detailColumn}>
                <Text style={styles.subtitle}>{Date.now()}</Text>
                <Text style={styles.subtitle}>viendo que pedo</Text>
            </View>
            <View style={styles.detailColumn}>
                <Text style={styles.subtitle}>otra putadas</Text>
            </View>
        </View>
    )
}

export default Header
