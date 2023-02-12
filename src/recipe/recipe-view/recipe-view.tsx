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

			<Button text="Add ingredient" onClick={ addIngredientControl } />
		</div>
	);

	function renderIngredientControls(): JSX.Element[] {
		return ingredientControls.map((control) => (
			<IngredientControl key={ control.id } />
		));
	}

	function addIngredientControl(): void {
		viewModel.addIngredientControl();
	}
}
