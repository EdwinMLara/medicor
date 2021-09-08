import {Text,View, StyleSheet,Image} from '@react-pdf/renderer';
import SimboloSalud from '../images/SimboloSalud.png'
import Corazon3 from '../images/Corazon3.png'

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
    textContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    },
    name: {
        fontSize: 18,
        fontWeight:'bold'
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
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        src={SimboloSalud}
                    />
                </View>
            </View>
            <View style={styles.detailColumn}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Dra. Maria Elena Guzmán Guzmán</Text>
                    <Text style={styles.subtitle}>Medicina General C.P 4948001</Text>
                    <Text style={styles.subtitle}>U.D.E.F.A</Text>
                </View>
            </View>
            <View style={styles.detailColumn}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        src={Corazon3}
                    />
                </View>
            </View>
        </View>
    )
}

export default Header
