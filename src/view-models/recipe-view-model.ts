import { Ingredient } from 'src/recipe/ingredient';
import { BreadWeight, Recipe } from 'src/recipe/recipe';

interface IngredientInput {
	name: string;
	weight: number;
}

export interface IRecipeViewModel {
	addIngredientInput(): void;
	saveIngredients(): void;
	convertWeights(breadWeight: BreadWeight): Set<Ingredient>;
}

export class RecipeViewModel implements IRecipeViewModel {
	private _recipe = new Recipe();
	private _ingredientInputs: Set<IngredientInput>;

	public constructor() {
		this._ingredientInputs = new Set();
		this.addIngredientInput();
	}

	public addIngredientInput(): void {
		this._ingredientInputs.add({ name: '', weight: 0 });
	}

	public getIngredientInputs(): Set<IngredientInput> {
		return this._ingredientInputs;
	}

	public saveIngredients(): void {
		this._ingredientInputs.forEach((ingredientInput) => {
			this._recipe.addIngredient({
				name: ingredientInput.name,
				defaultWeight: ingredientInput.weight,
				convertedWeight: ingredientInput.weight,
			});
		});
	}

	public convertWeights(breadWeight: BreadWeight): Set<Ingredient> {
		this._recipe.setBreadWeight(breadWeight);

		return this._recipe.getIngredients();
	}
}
