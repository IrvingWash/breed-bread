import Big from 'big.js';

import { Ingredient } from './ingredient';

export const enum BreadWeight {
	Small = 500,
	Medium = 750,
	Large = 1000,
}

export interface IRecipe {
	getBreadWeight(): BreadWeight;
	getIngredients(): Set<Ingredient>;
	setBreadWeight(weight: BreadWeight): void;
	addIngredient(ingredient: Ingredient): void;
	removeIngredient(ingredient: Ingredient): void;
}

export class Recipe implements IRecipe {
	private _breadWeight: BreadWeight;
	private _ingredients: Set<Ingredient>;

	public constructor(breadWeight?: BreadWeight, ingredients?: Set<Ingredient>) {
		this._breadWeight = breadWeight ?? BreadWeight.Medium;
		this._ingredients = ingredients ?? new Set();
	}

	public getBreadWeight(): BreadWeight {
		return this._breadWeight;
	}

	public getIngredients(): Set<Ingredient> {
		return this._ingredients;
	}

	public setBreadWeight(weight: BreadWeight): void {
		if (this._breadWeight === weight) {
			return;
		}

		this._breadWeight = weight;

		this._convertIngredientWeights();
	}

	public addIngredient(ingredient: Ingredient): void {
		this._ingredients.add(ingredient);
	}

	public removeIngredient(ingredient: Ingredient): void {
		this._ingredients.delete(ingredient);
	}

	private _convertIngredientWeights(): void {
		this._ingredients.forEach((ingredient) => {
			ingredient.convertedWeight = Big(ingredient.defaultWeight)
				.div(BreadWeight.Medium)
				.mul(this._breadWeight)
				.round()
				.toNumber();
		});
	}
}
