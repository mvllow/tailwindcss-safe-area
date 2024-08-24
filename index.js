const plugin = require("tailwindcss/plugin");

function generateVariantUtilities(baseUtilities, variant, generateValue) {
	return Object.entries(baseUtilities).reduce(
		(acc, [selector, propertyValue]) => {
			const className = selector.slice(1);
			acc[`${className}-${variant}`] = (x) =>
				Object.entries(propertyValue).reduce((result, [property, value]) => {
					if (Array.isArray(value)) {
						result[property] = value.map((v) =>
							v === "-webkit-fill-available" ? v : generateValue(v, x),
						);
					} else {
						result[property] = generateValue(value, x);
					}
					return result;
				}, {});
			return acc;
		},
		{},
	);
}

const safeArea = plugin(({ addUtilities, matchUtilities, theme }) => {
	const baseUtilities = {
		".m-safe": {
			marginTop: "env(safe-area-inset-top)",
			marginRight: "env(safe-area-inset-right)",
			marginBottom: "env(safe-area-inset-bottom)",
			marginLeft: "env(safe-area-inset-left)",
		},
		".mx-safe": {
			marginRight: "env(safe-area-inset-right)",
			marginLeft: "env(safe-area-inset-left)",
		},
		".my-safe": {
			marginTop: "env(safe-area-inset-top)",
			marginBottom: "env(safe-area-inset-bottom)",
		},
		".ms-safe": {
			marginInlineStart: "env(safe-area-inset-left)",
		},
		".me-safe": {
			marginInlineEnd: "env(safe-area-inset-left)",
		},
		".mt-safe": {
			marginTop: "env(safe-area-inset-top)",
		},
		".mr-safe": {
			marginRight: "env(safe-area-inset-right)",
		},
		".mb-safe": {
			marginBottom: "env(safe-area-inset-bottom)",
		},
		".ml-safe": {
			marginLeft: "env(safe-area-inset-left)",
		},
		".p-safe": {
			paddingTop: "env(safe-area-inset-top)",
			paddingRight: "env(safe-area-inset-right)",
			paddingBottom: "env(safe-area-inset-bottom)",
			paddingLeft: "env(safe-area-inset-left)",
		},
		".px-safe": {
			paddingRight: "env(safe-area-inset-right)",
			paddingLeft: "env(safe-area-inset-left)",
		},
		".py-safe": {
			paddingTop: "env(safe-area-inset-top)",
			paddingBottom: "env(safe-area-inset-bottom)",
		},
		".ps-safe": {
			paddingInlineStart: "env(safe-area-inset-left)",
		},
		".pe-safe": {
			paddingInlineEnd: "env(safe-area-inset-left)",
		},
		".pt-safe": {
			paddingTop: "env(safe-area-inset-top)",
		},
		".pr-safe": {
			paddingRight: "env(safe-area-inset-right)",
		},
		".pb-safe": {
			paddingBottom: "env(safe-area-inset-bottom)",
		},
		".pl-safe": {
			paddingLeft: "env(safe-area-inset-left)",
		},
		".scroll-m-safe": {
			scrollMarginTop: "env(safe-area-inset-top)",
			scrollMarginRight: "env(safe-area-inset-right)",
			scrollMarginBottom: "env(safe-area-inset-bottom)",
			scrollMarginLeft: "env(safe-area-inset-left)",
		},
		".scroll-mx-safe": {
			scrollMarginRight: "env(safe-area-inset-right)",
			scrollMarginLeft: "env(safe-area-inset-left)",
		},
		".scroll-my-safe": {
			scrollMarginTop: "env(safe-area-inset-top)",
			scrollMarginBottom: "env(safe-area-inset-bottom)",
		},
		".scroll-ms-safe": {
			scrollMarginInlineStart: "env(safe-area-inset-left)",
		},
		".scroll-me-safe": {
			scrollMarginInlineEnd: "env(safe-area-inset-left)",
		},
		".scroll-mt-safe": {
			scrollMarginTop: "env(safe-area-inset-top)",
		},
		".scroll-mr-safe": {
			scrollMarginRight: "env(safe-area-inset-right)",
		},
		".scroll-mb-safe": {
			scrollMarginBottom: "env(safe-area-inset-bottom)",
		},
		".scroll-ml-safe": {
			scrollMarginLeft: "env(safe-area-inset-left)",
		},
		".scroll-p-safe": {
			scrollPaddingTop: "env(safe-area-inset-top)",
			scrollPaddingRight: "env(safe-area-inset-right)",
			scrollPaddingBottom: "env(safe-area-inset-bottom)",
			scrollPaddingLeft: "env(safe-area-inset-left)",
		},
		".scroll-px-safe": {
			scrollPaddingRight: "env(safe-area-inset-right)",
			scrollPaddingLeft: "env(safe-area-inset-left)",
		},
		".scroll-py-safe": {
			scrollPaddingTop: "env(safe-area-inset-top)",
			scrollPaddingBottom: "env(safe-area-inset-bottom)",
		},
		".scroll-ps-safe": {
			scrollPaddingInlineStart: "env(safe-area-inset-left)",
		},
		".scroll-pe-safe": {
			scrollPaddingInlineEnd: "env(safe-area-inset-left)",
		},
		".scroll-pt-safe": {
			scrollPaddingTop: "env(safe-area-inset-top)",
		},
		".scroll-pr-safe": {
			scrollPaddingRight: "env(safe-area-inset-right)",
		},
		".scroll-pb-safe": {
			scrollPaddingBottom: "env(safe-area-inset-bottom)",
		},
		".scroll-pl-safe": {
			scrollPaddingLeft: "env(safe-area-inset-left)",
		},
		".inset-safe": {
			top: "env(safe-area-inset-top)",
			right: "env(safe-area-inset-right)",
			bottom: "env(safe-area-inset-bottom)",
			left: "env(safe-area-inset-left)",
		},
		".inset-x-safe": {
			right: "env(safe-area-inset-right)",
			left: "env(safe-area-inset-left)",
		},
		".inset-y-safe": {
			top: "env(safe-area-inset-top)",
			bottom: "env(safe-area-inset-bottom)",
		},
		".start-safe": {
			insetInlineStart: "env(safe-area-inset-left)",
		},
		".end-safe": {
			insetInlineEnd: "env(safe-area-inset-left)",
		},
		".top-safe": {
			top: "env(safe-area-inset-top)",
		},
		".right-safe": {
			right: "env(safe-area-inset-right)",
		},
		".bottom-safe": {
			bottom: "env(safe-area-inset-bottom)",
		},
		".left-safe": {
			left: "env(safe-area-inset-left)",
		},
		".min-h-screen-safe": {
			minHeight: [
				"calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))",
				"-webkit-fill-available",
			],
		},
		".max-h-screen-safe": {
			maxHeight: [
				"calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))",
				"-webkit-fill-available",
			],
		},
		".h-screen-safe": {
			height: [
				"calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))",
				"-webkit-fill-available",
			],
		},
	};
	addUtilities(baseUtilities);

	const offsetUtilities = generateVariantUtilities(
		baseUtilities,
		"offset",
		(v, x) => `calc(${v} + ${x})`,
	);
	matchUtilities(offsetUtilities, {
		values: theme("spacing"),
		supportsNegativeValues: true,
	});

	const orUtilities = generateVariantUtilities(
		baseUtilities,
		"or",
		(v, x) => `max(${v}, ${x})`,
	);
	matchUtilities(orUtilities, {
		values: theme("spacing"),
		supportsNegativeValues: true,
	});
});

module.exports = safeArea;
