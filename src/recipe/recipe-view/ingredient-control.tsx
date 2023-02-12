import React from 'react';

import { Input } from '@ui-kit/input/input';

import * as s from './ingredient-control.pcss';

export function IngredientControl(): JSX.Element {
	return (
		<div className={ s.ingredientControl }>
			<div className={ s.input }>
				<label>Name</label>
				<Input placeholder='Name' />
			</div>

			<div className={ s.input }>
				<label>Weight</label>
				<Input placeholder='Weight' />
			</div>
		</div>
	);
}
