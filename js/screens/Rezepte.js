import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Rezepte_ListItem from '../components/Rezepte_ListItem';


export default class Rezepte extends React.Component {
    state = {
        recipes: [
            {
                image: null,
                title: 'Spaghetti Bolognese',
                duration: '14 Min',
                nationality: 'ita',
                ingredients: [
                    { amount: '100g', ingredient: 'Spaghetti' },
                    { amount: '3', ingredient: 'Tomaten' }
                ],
                preparation: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
                favorite: true
            },
            {
                image: null,
                title: 'Spaghetti Carbonara',
                duration: '15 Min',
                nationality: 'ita',
                ingredients: [
                    { amount: '200g', ingredient: 'Spaghetti' },
                    { amount: '10g', ingredient: 'Bauchspeck geschnitten' },
                    { amount: '2', ingredient: 'Sahne' }

                ],
                preparation: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata.',
                favorite: false
            }, {
                image: null,
                title: 'Quacamole',
                duration: '4 Min',
                nationality: 'gre',
                ingredients: [
                    { amount: '2', ingredient: 'Avocados' },
                    { amount: '3', ingredient: 'Tomaten' },
                    { amount: '1', ingredient: 'Zwiebel' },
                    { amount: '2', ingredient: 'Chilli' }
                ],
                preparation: '15 Minuten Kochen, dann salzen.',
                favorite: false
            }
        ]
    };

    componentDidMount() {

        // change header title
        this.props.navigation.setOptions({ title: 'Rezepte' });
    }

    render() {

        let recipes = this.state.recipes.map((recipe, i) => {
            return (
                <Rezepte_ListItem
                    key={'recipe_' + i}
                    title={recipe.title}
                    duration={recipe.duration}
                    nationality={recipe.nationality}
                    image={recipe.image}
                    favorite={recipe.favorite}
                    onPress={() => this.props.navigation.navigate('Rezept', { recipe })}
                />
            );
        });

        return (
            <ScrollView contentContainerStyle={styles.container}>
                {recipes}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: 'center'
    }
});