import Big from 'big.js';

import { IIngredient } from './ingredient';

export const enum BreadWeight {
	Small = 500,
	Medium = 750,
	Large = 1000,
}

export interface IRecipe {
	getBreadWeight(): BreadWeight;
	getIngredients(): IIngredient[];
	setBreadWeight(weight: BreadWeight): void;
	addIngredient(ingredient: IIngredient): void;
	removeIngredient(id: number): void;
}

export class Recipe implements IRecipe {
	private _breadWeight: BreadWeight;
	private _ingredients: IIngredient[];

	public constructor(breadWeight?: BreadWeight, ingredients?: IIngredient[]) {
		this._breadWeight = breadWeight ?? BreadWeight.Medium;
		this._ingredients = ingredients ?? [];
	}

	public getBreadWeight(): BreadWeight {
		return this._breadWeight;
	}

	public getIngredients(): IIngredient[] {
		return this._ingredients;
	}

	public setBreadWeight(weight: BreadWeight): void {
		if (this._breadWeight === weight) {
			return;
		}

		this._breadWeight = weight;

		this._convertIngredientWeights();
	}

	public addIngredient(ingredient: IIngredient): void {
		this._ingredients.push(ingredient);
	}

	public removeIngredient(id: number): void {
		const index = this._ingredients.findIndex((ingredient) => ingredient.id === id);

		this._ingredients.splice(index, 1);
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
