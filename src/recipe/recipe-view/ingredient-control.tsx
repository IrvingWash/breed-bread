import React, { useState } from 'react';

import { Input } from '@ui-kit/input/input';

import * as s from './ingredient-control.pcss';

interface IngredientControlProps {
	id: number;
	name: string;
	weight: number;
	onControlChange: (id: number, data: { name?: string, weight?: number }) => void;
}

export function IngredientControl(props: IngredientControlProps): JSX.Element {
	const [name, setName] = useState(props.name);
	const [weight, setWeight] = useState(props.weight);

	return (
		<div className={ s.ingredientControl }>
			<div className={ s.input }>
				<label htmlFor='name'>Name</label>
				<Input
					name='name'
					placeholder='Name'
					value={ name }
					onChange={ handleNameInputChange }
				/>
			</div>

			<div className={ s.input }>
				<label htmlFor='weight'>Weight</label>
				<Input
					name='weight'
					placeholder='Weight'
					value={ weight }
					onChange={ handleWeightInputChange }
				/>
			</div>
		</div>
	);

	function handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const value = event.target.value;

		props.onControlChange(props.id, { name: value });

		setName(value);
	}

	function handleWeightInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const value = Number(event.target.value);

		if (isNaN(value)) {
			return setWeight((prevState) => prevState);
		}

		props.onControlChange(props.id, { weight: value });

		setWeight(value);
	}
}
