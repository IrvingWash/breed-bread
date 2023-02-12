import React from 'react';

import { IIngredient } from '../ingredient';

import * as s from './converted-weights-display.pcss';

interface ConvertedWeightsDisplayProps {
	ingredients: IIngredient[];
}

export function ConvertedWeightsDisplay(props: ConvertedWeightsDisplayProps): JSX.Element {
	return (
		<div className={ s.convertedWeightDisplay }>
			<ul className={ s.list }>
				{ renderIngredients() }
			</ul>
		</div>
	);

	function renderIngredients(): JSX.Element[] {
		return props.ingredients.map((ingredient) => (
			<li className={ s.item } key={ ingredient.id }>
				<p>Name: { ingredient.name }</p>
				<p>Default weight: { ingredient.defaultWeight }</p>
				<p>Converted weight: { ingredient.convertedWeight }</p>
			</li>
		));
	}
}
