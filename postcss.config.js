const colors = require('./src/ui-kit/variables/colors.json');
const sizes = require('./src/ui-kit/variables/sizes.json');

module.exports = {
	plugins: [
		require('postcss-simple-vars')({ variables: { ...colors, ...sizes } }),
		require('autoprefixer'),
		require('postcss-nested'),
	],
};
