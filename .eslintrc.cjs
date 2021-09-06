module.exports = {
	env: {
		es2021: true,
		mocha: true,
		node: true,
	},
	extends: ['@fuelrats/eslint-config'],
	rules: {
		// Core
		indent: ['error', 'tab'],
		'new-parens': ['error', 'never'],
		'no-param-reassign': ['error', {
			props: false,
		}],

		// Import
		'import/extensions': ['error', 'ignorePackages'],
	},
	overrides: [
		{
			files: ['tests/**/*.js'],
			env: {
				jest: true,
			},
		},
	],
}
