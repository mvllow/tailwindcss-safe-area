// eslint-disable-next-line unicorn/prefer-module
const plugin = require('tailwindcss/plugin')

const safeArea = plugin(({addUtilities}) => {
	const utilities = {
		'.m-safe': {
			marginTop: 'env(safe-area-inset-top)',
			marginRight: 'env(safe-area-inset-right)',
			marginBottom: 'env(safe-area-inset-bottom)',
			marginLeft: 'env(safe-area-inset-left)',
		},
		'.mx-safe': {
			marginRight: 'env(safe-area-inset-right)',
			marginLeft: 'env(safe-area-inset-left)',
		},
		'.my-safe': {
			marginTop: 'env(safe-area-inset-top)',
			marginBottom: 'env(safe-area-inset-bottom)',
		},
		'.mt-safe': {
			marginTop: 'env(safe-area-inset-top)',
		},
		'.mr-safe': {
			marginRight: 'env(safe-area-inset-right)',
		},
		'.mb-safe': {
			marginBottom: 'env(safe-area-inset-bottom)',
		},
		'.ml-safe': {
			marginLeft: 'env(safe-area-inset-left)',
		},
		'.p-safe': {
			paddingTop: 'env(safe-area-inset-top)',
			paddingRight: 'env(safe-area-inset-right)',
			paddingBottom: 'env(safe-area-inset-bottom)',
			paddingLeft: 'env(safe-area-inset-left)',
		},
		'.px-safe': {
			paddingRight: 'env(safe-area-inset-right)',
			paddingLeft: 'env(safe-area-inset-left)',
		},
		'.py-safe': {
			paddingTop: 'env(safe-area-inset-top)',
			paddingBottom: 'env(safe-area-inset-bottom)',
		},
		'.pt-safe': {
			paddingTop: 'env(safe-area-inset-top)',
		},
		'.pr-safe': {
			paddingRight: 'env(safe-area-inset-right)',
		},
		'.pb-safe': {
			paddingBottom: 'env(safe-area-inset-bottom)',
		},
		'.pl-safe': {
			paddingLeft: 'env(safe-area-inset-left)',
		},
		'.min-h-screen-safe': {
			minHeight: [
				'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
				'-webkit-fill-available',
			],
		},
		'.h-screen-safe': {
			height: [
				'calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))',
				'-webkit-fill-available',
			],
		},
	}

	addUtilities(utilities)
})

// eslint-disable-next-line unicorn/prefer-module
module.exports = safeArea
