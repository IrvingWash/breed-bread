import React from 'react';

interface AppProps {}
interface AppState {}

export class App extends React.Component<AppProps, AppState> {
	public constructor(props: AppProps) {
		super(props);
	}

	public override render(): JSX.Element {
		return (
			<>
				Hello World
			</>
		);
	}
}
