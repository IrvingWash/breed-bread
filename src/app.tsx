import React from 'react';
import { BreadWeight, Recipe } from './recipe/recipe';

export class App extends React.Component {
	public override render(): JSX.Element {
		const recipe = new Recipe();

		recipe.addIngredient({ name: 'Flour', defaultWeight: 1000, convertedWeight: 1000 });

		recipe.setBreadWeight(BreadWeight.Large);

		console.log(recipe.getIngredients());

		return (
			<>
				<div>Hello, World!</div>
			</>
		);
	}
}
