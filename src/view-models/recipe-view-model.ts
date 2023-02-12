import { IIngredient, Ingredient } from 'src/recipe/ingredient';
import { BreadWeight, IRecipe, Recipe } from 'src/recipe/recipe';

export interface IngredientInput {
	id: number;
	name: string;
	weight: number;
}

export interface IRecipeViewModel {
	addIngredientInput(): void;
	getIngredientInputs(): IngredientInput[];
	saveIngredients(): void;
	convertWeights(breadWeight: BreadWeight): IIngredient[];
}

export class RecipeViewModel implements IRecipeViewModel {
	private _recipe: IRecipe;

	private _ingredientInputs: IngredientInput[];
	private _ingredientID = 0;

	public constructor() {
		this._recipe = new Recipe();

		this._ingredientInputs = [];
		this.addIngredientInput();
	}

	public addIngredientInput(): void {
		this._ingredientInputs.push({ id: this._ingredientID, name: '', weight: 0 });

		this._ingredientID++;
	}

	public getIngredientInputs(): IngredientInput[] {
		return this._ingredientInputs;
	}

	public saveIngredients(): void {
		this._ingredientInputs.forEach((ingredientInput) => {
			this._recipe.addIngredient(
				new Ingredient(
					ingredientInput.id,
					ingredientInput.name,
					ingredientInput.weight
				)
			);
		});
	}

	public convertWeights(breadWeight: BreadWeight): IIngredient[] {
		this._recipe.setBreadWeight(breadWeight);

		return this._recipe.getIngredients();
	}
}
