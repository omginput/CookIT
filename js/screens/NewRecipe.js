import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { ScrollView, StyleSheet, Button, Alert } from 'react-native';

import CustomFont from '../components/CustomFont';
import TitleInput from '../components/TitleInput';
import ImageInput from '../components/ImageInput';
import DurationInput from '../components/DurationInput';
import NationalityInput from '../components/NationalityInput';
import IngredientsInput from '../components/IngredientsInput';
import PreparationInput from '../components/PreparationInput';
import AuthorInput from '../components/AuthorInput';


const database = SQLite.openDatabase('recipes.db');

export default class NewRecipe extends React.Component {
    state = {
        recipe: {
            id: null,
            image: null,
            title: '',
            duration: '',
            nationality: 'none',
            ingredients: [
                { amount: '', ingredient: '' }
            ],
            preparation: '',
            favorite: null,
            author: '',
            createdAt: ''
        }
    };

    componentDidMount() {

        // change header title
        this.props.navigation.setOptions({ title: <CustomFont>Neues Rezept</CustomFont> });
    }


    _saveRecipe() {

        // validate inputs, check if empty
        let valid = true;
        if (
            this.state.recipe.title == '' ||
            this.state.recipe.duration == '' ||
            this.state.recipe.ingredients[0]['amount'] == '' ||
            this.state.recipe.ingredients[0]['ingredient'] == '' ||
            this.state.recipe.preparation == ''
        ) {
            valid = false;
        }

        if (valid) { // inputs are valid
            this._saveInDB(this.state.recipe);
            this.props.navigation.navigate('HomeScreen');
        } else { // inputs are invalid
            Alert.alert('Leere Pflichtfelder', 'Bitte füllen Sie alle Pflichtfelder.')
        }

    }

    _saveInDB(recipe) {

        // get amount of rows -> prepare id
        let amountRows;
        database.transaction(
            transaction => transaction.executeSql('SELECT * FROM recipe', [], (_, result) => {
                amountRows = result.rows.length;
            })
        );

        // save recipe in DB
        database.transaction(
            transaction => transaction.executeSql(
                'INSERT INTO recipe (id, image, title, duration, nationality, ingredients, preparation, author, favorite, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                [amountRows + 1, recipe.image, recipe.title, recipe.duration, recipe.nationality, JSON.stringify(recipe.ingredients), recipe.preparation, recipe.author, recipe.favorite, Date()]
            )
        );
        //console.log(recipe);
    }

    _handleImageInput(value) {
        // update title in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['image'] = value;
            return { recipe }
        });
    }

    _handleTitleInput(value) {
        // update title in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['title'] = value;
            return { recipe }
        });
    }

    _handleDurationInput(value) {
        // update duration in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['duration'] = value;
            return { recipe }
        });
    }

    _handleNationalityInput(value) {
        // update nationality in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['nationality'] = value;
            return { recipe }
        });
    }

    _handleIngredientsInput(ingredients) {
        // update ingredients in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['ingredients'] = ingredients;
            return { recipe }
        });

    }

    _handlePreparationInput(value) {
        // update preparation in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['preparation'] = value;
            return { recipe }

        });
    }

    _handleAuthorInput(value) {
        // update preparation in state.recipe
        this.setState(prevState => {
            let recipe = { ...prevState.recipe };
            recipe['author'] = value;
            return { recipe }

        });
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>


                <ImageInput
                    image={this.state.recipe.image}
                    onChange={(value) => this._handleImageInput(value)}
                />

                <TitleInput
                    value={this.state.recipe.title}
                    onChange={(value) => this._handleTitleInput(value)}
                />

                <DurationInput
                    value={this.state.recipe.duration}
                    onChange={(value) => this._handleDurationInput(value)}
                />

                <NationalityInput
                    selectedValue={this.state.recipe.nationality}
                    onChange={(Value) => this._handleNationalityInput(Value)}
                />

                <IngredientsInput
                    ingredient_list={this.state.recipe.ingredients}
                    onChange={(ingredients) => this._handleIngredientsInput(ingredients)}
                />

                <PreparationInput
                    value={this.state.recipe.preparation}
                    onChange={(value) => this._handlePreparationInput(value)}
                />

                <AuthorInput
                    value={this.state.recipe.author}
                    onChange={(value) => this._handleAuthorInput(value)}
                />

                <Button
                    title="Speichern"
                    onPress={() => this._saveRecipe()}
                />

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 40,
        alignItems: 'center'
    }
});