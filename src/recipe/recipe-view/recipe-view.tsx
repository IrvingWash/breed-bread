import React, { useState } from 'react';

import { Button } from '@ui-kit/button/button';
import { useObservable } from '@ui-kit/hooks/use-observable';

import { BreadWeight } from '../recipe';
import { IRecipeViewModel } from '../recipe-view-model';
import { IngredientControl } from './ingredient-control';
import { ConvertedWeightsDisplay } from './converted-weights-display';

interface RecipeViewProps {
	viewModel: IRecipeViewModel;
}

export function RecipeView(props: RecipeViewProps): JSX.Element {
	const { viewModel } = props;

	const ingredientControls = useObservable(viewModel.ingredientControls$, viewModel.getIngredientControls());

	const [isConverted, setIsConverted] = useState(false);

	return (
		<div>
			{ renderIngredientControls() }

			<Button text='Add ingredient' onClick={ addIngredientControl } />
			<Button text='Convert' onClick={ convertWeights } />

			{ isConverted &&
				<ConvertedWeightsDisplay
					ingredients={ viewModel.getConvertedIngredients() }
				/>
			}
		</div>
	);

	function renderIngredientControls(): JSX.Element[] {
		return ingredientControls.map((control) => (
			<IngredientControl
				key={ control.id }
				id={ control.id }
				name={ control.name }
				weight={ control.weight }
				onControlChange={ handleControlChange }
			/>
		));
	}

	function addIngredientControl(): void {
		setIsConverted(false);

		viewModel.addIngredientControl();
	}

	function handleControlChange(id: number, data: { name?: string, weight?: number }): void {
		const controlToChange = ingredientControls.find((control) => control.id === id);

		if (controlToChange === undefined) {
			return;
		}

		if (data.name !== undefined) {
			controlToChange.name = data.name;
		}

		if (data.weight !== undefined) {
			controlToChange.weight = data.weight;
		}
	}

	function convertWeights(): void {
		// TODO: Remove hardcode
		viewModel.convertWeights(BreadWeight.Large);

		setIsConverted(true);
	}
}
