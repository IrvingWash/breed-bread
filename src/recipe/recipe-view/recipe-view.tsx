import { Button } from '@ui-kit/button/button';
import { useObservable } from '@ui-kit/hooks/use-observable';
import React from 'react';

import { IRecipeViewModel } from '../recipe-view-model';
import { IngredientControl } from './ingredient-control';

interface RecipeViewProps {
	viewModel: IRecipeViewModel;
}

export function RecipeView(props: RecipeViewProps): JSX.Element {
	const { viewModel } = props;

	const ingredientControls = useObservable(viewModel.ingredientControls$, viewModel.getIngredientControls());

	return (
		<div>
			{ renderIngredientControls() }

			<Button text='Add ingredient' onClick={ addIngredientControl } />
			<Button text='Convert' />
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
}
