import {Text,View, StyleSheet,Image} from '@react-pdf/renderer';
import {healthSimbol} from '../images/defaulImage'

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
    },
    imageContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:50,
        height:'auto'
    }   
});

function Header(props : any) {
    console.log(props);
    return (
        <View style={styles.container}>
            <View style={styles.detailColumn}>
                <Text style={styles.name}>Consultorio</Text>
                <Text style={styles.subtitle}>Médico</Text>
                <Text style={styles.subtitle}>Dra. Maria Elena test test</Text>
            </View>
            <View style={styles.detailColumn}>
                <Text style={styles.subtitle}>{Date.now()}</Text>
                <Text style={styles.subtitle}>Numero de cedula:</Text>
                <Text style={styles.subtitle}>45865488</Text>
            </View>
            <View style={styles.detailColumn}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        src={healthSimbol}
                    />
                </View>
            </View>
        </View>
    )
}

export default Header
