import React from 'react';

import { IRecipeViewModel, RecipeViewModel } from './recipe/recipe-view-model';
import { RecipeView } from './recipe/recipe-view/recipe-view';

interface AppProps {}
interface AppState {}

export class App extends React.Component<AppProps, AppState> {
	private _recipeViewModel: IRecipeViewModel;

	public constructor(props: AppProps) {
		super(props);

		this._recipeViewModel = new RecipeViewModel();
	}

	public override render(): JSX.Element {
		return (
			<>
				<RecipeView viewModel={ this._recipeViewModel } />
			</>
		);
	}
}
