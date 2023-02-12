import React, { useState } from 'react';

import { Button } from '@ui-kit/components/button/button';
import { useObservable } from '@ui-kit/hooks/use-observable';

import { BreadWeight } from '../recipe';
import { IRecipeViewModel } from '../recipe-view-model';
import { IngredientControl } from './ingredient-control';
import { ConvertedWeightsDisplay } from './converted-weights-display';
import { BreadWeightSelect } from './bread-weight-select';

import * as s from './recipe-view.pcss';

interface RecipeViewProps {
	viewModel: IRecipeViewModel;
}

export function RecipeView(props: RecipeViewProps): JSX.Element {
	const { viewModel } = props;

	const ingredientControls = useObservable(viewModel.ingredientControls$, viewModel.getIngredientControls());

	const [isConverted, setIsConverted] = useState(false);
	const [breadWeight, setBreadWeight] = useState(BreadWeight.Medium);

	function makeSelectOptions(): string[] {
		return [
			String(BreadWeight.Small),
			String(BreadWeight.Medium),
			String(BreadWeight.Large),
		];
	}

	return (
		<div className={ s.recipeView }>
			<BreadWeightSelect
				className={ s.breadWeightSelect }
				onWeightChange={ handleBreadWeightSelect }
				options={ makeSelectOptions() }
				weight={ breadWeight }
			/>

			{ renderIngredientControls() }

			<div className={ s.actionButtons }>
				<Button text='Add ingredient' onClick={ addIngredientControl } />
				<Button text='Convert' onClick={ convertWeights } />
			</div>

			{ isConverted &&
				<ConvertedWeightsDisplay
					ingredients={ viewModel.getConvertedIngredients() }
				/>
			}
		</div>
	);

	function handleBreadWeightSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
		const value = Number(event.target.value);

		if (isNaN(value)) {
			throw new Error('Bread weight must be a number');
		}

		setBreadWeight(value);
	}

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
		viewModel.convertWeights(breadWeight);

		setIsConverted(true);
	}
}
