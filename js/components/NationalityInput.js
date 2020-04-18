import * as React from 'react';
import { Text, StyleSheet, View, Picker } from 'react-native';


export default class NationalityInput extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Nationalität: </Text>
                <Picker
                    style={styles.picker}
                    onValueChange={this.props.onChange}
                    selectedValue={this.props.selectedValue}
                >
                    <Picker.Item label="Keine" value="none" />
                    <Picker.Item label="Italienisch" value="ita" />
                    <Picker.Item label="Deutsch" value="deu" />
                    <Picker.Item label="Griechisch" value="gre" />
                    <Picker.Item label="Chinesisch" value="chi" />
                    <Picker.Item label="Türkisch" value="tur" />
                </Picker>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontSize: 20
    },
    picker: {
        width: 150
    }
});