import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration } from 'webpack';

const commonConfig: Configuration = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			path.resolve(__dirname, '..', 'node_modules'),
			path.resolve(__dirname, '..', './'),
		],
		alias: {
			'@ui-kit': path.resolve(__dirname, '..', './src/ui-kit'),
			'@common': path.resolve(__dirname, '..', './src/common'),
		},
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '..', 'dist'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(ts)x?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.pcss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							esModule: true,
							modules: {
								localIdentName: '[local]--[hash:base64:5]',
								namedExport: true,
							},
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', './src/index.html'),
		}),
		new MiniCssExtractPlugin(),
		new Dotenv({ systemvars: true }),
	],
};

export default commonConfig;
