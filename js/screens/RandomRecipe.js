import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Add2FavoritesButton from '../components/Add2FavoritesButton';
import CustomFont from '../components/CustomFont';


const database = SQLite.openDatabase('recipes.db');

export default class RandomRecipe extends React.Component {
    state = {
        recipe: {},
        image_default: require('../../assets/images/defaultRecipeImage.png')
    };


    componentDidMount() {

        // change header title
        this.props.navigation.setOptions({ title: <CustomFont>Zufällig</CustomFont> });

        this._nextRandomRecipe();
    }

    _nextRandomRecipe() {
        database.transaction(
            transaction => transaction.executeSql('SELECT * FROM recipe', [], (_, result) => {

                let rcps = [];
                result.rows._array.forEach(e => {
                    rcps.push({
                        id: e.id,
                        image: null,
                        title: e.title,
                        duration: e.duration,
                        nationality: e.nationality,
                        ingredients: JSON.parse(e.ingredients),
                        preparation: e.preparation,
                        favorite: e.favorite,
                        author: e.author,
                        createdAt: e.createdAt
                    });
                });

                // show random item of recipe array
                this.setState({ recipe: rcps[Math.floor(Math.random() * result.rows.length)] });
            }
            )
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    key={'default'}
                    style={styles.image}
                    source={this.state.image_default}
                />

                <Add2FavoritesButton
                    styling={{ position: 'absolute', top: 17, left: 20 }}
                    favorite={this.state.recipe.favorite}
                />

                <Text style={styles.title}>
                    {this.state.recipe.title}
                </Text>

                <View style={styles.containerDurationNationality}>
                    <Text style={styles.duration}>{this.state.recipe.duration} Min</Text>
                    <Text style={styles.separator}> | </Text>
                    <Text style={styles.nationality}>{this.state.recipe.nationality}</Text>
                </View>

                <TouchableOpacity
                    style={styles.kochen}
                    onPress={() => this.props.navigation.navigate('Recipe', { recipe: this.state.recipe })}
                >
                    <Text style={styles.kochen_label}>Kochen!</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.weiter}
                    onPress={() => this._nextRandomRecipe()}
                >
                    <Text style={styles.weiter_label}>Weiter</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    image: {
        height: 200,
        width: '100%',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        margin: 20
    },
    containerDurationNationality: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    duration: {
        width: 100,
        fontSize: 18,
        paddingHorizontal: 20,
        textAlign: 'right'
    },
    separator: {
        width: 70,
        fontSize: 25,
        fontWeight: '300',
        textAlign: 'center'
    },
    nationality: {
        width: 100,
        fontSize: 20,
        paddingHorizontal: 20,
        textAlign: 'left'
    },
    kochen: {
        height: 65,
        width: 230,
        position: 'absolute',
        bottom: 210,
        backgroundColor: '#f6b26b',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 30,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    kochen_label: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    weiter: {
        height: 50,
        width: 200,
        position: 'absolute',
        bottom: 130,
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    weiter_label: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }
});