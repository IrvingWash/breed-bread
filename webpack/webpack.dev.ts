import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const devConfig: Configuration = {
	mode: 'development',
	devServer: {
		hot: true,
		open: true,
		historyApiFallback: true,
		allowedHosts: 'all',
	} as DevServerConfiguration,
	devtool: 'cheap-module-source-map',
};

export default devConfig;
