import React, { useState } from 'react';

import { Button } from '@ui-kit/components/button/button';
import { useObservable } from '@ui-kit/hooks/use-observable';
import { Select } from '@ui-kit/components/select/select';

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
	const [breadWeight, setBreadWeight] = useState(BreadWeight.Medium);

	function makeSelectOptions(): string[] {
		return [
			String(BreadWeight.Small),
			String(BreadWeight.Medium),
			String(BreadWeight.Large),
		];
	}

	return (
		<div>
			<Select
				value={ String(breadWeight) }
				options={ makeSelectOptions() }
				changeHandler={ handleBreadWeightSelect }
			/>

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
