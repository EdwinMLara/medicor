import { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


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
      flex: 1,
      fontSize: 10
    },
  });

 function List(props : any){
    console.log("List",props);
    const {receta} : any = props;
    return(<Fragment>
            {
                receta.map((medicamento:any,index:number)=>{
                    return (
                        <Fragment key={index}>
                            <View style={styles.item}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.itemContent}>{medicamento.nombre}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemContent}>{medicamento.prescripcion}</Text>
                            </View>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
 }
  

export default List
