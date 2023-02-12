import { Button } from '@ui-kit/button/button';
import { useObservable } from '@ui-kit/hooks/use-observable';
import React from 'react';

import { IRecipeViewModel } from '../recipe-view-model';

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
			<div key={ control.id }>Control</div>
		));
	}

	function addIngredientControl(): void {
		viewModel.addIngredientControl();
	}
}
