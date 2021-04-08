import { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { FontDownloadTwoTone } from '@material-ui/icons';


const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    bulletPoint: {
      width: 10,
      fontSize: 10,
    },
    itemContent: {
      fontSize: 10,
      fontWeight: 'bold'
    }
  });

 function List(props : any){
    console.log("List",props);
    const {receta} : any = props;
    return(<Fragment>
            {
                receta.map((medicamento:any,index:number)=>{
                    const auxSalida = `${medicamento.cantidad} ${medicamento.nombre} :   ${medicamento.prescripcion}`;
                    return (
                        <Fragment key={index}>
                            <View style={styles.item}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.itemContent}>{auxSalida} </Text>
                            </View>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
 }
  

export default List
