import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './webpack.common';

export default async (args: { env: string }): Promise<Configuration> => {
	const envConfig = await import(`./webpack.${args.env}.ts`);

	return merge(commonConfig, envConfig.default);
};
