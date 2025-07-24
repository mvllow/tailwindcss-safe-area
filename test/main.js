import { ok } from "node:assert";
import { exec } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { before, describe, test } from "node:test";
import { promisify } from "node:util";

const execAsync = promisify(exec);

function normalizeWhitespace(value) {
	return value.replace(/\s+/g, " ").trim();
}

function contains(value, pattern) {
	return normalizeWhitespace(value).includes(normalizeWhitespace(pattern));
}

function expectSelectors(selectors) {
	selectors.forEach((selector) => {
		ok(css.includes(selector), `Missing selector: ${selector}`);
	});
}

function expectCSSProperties(properties) {
	for (const [property, value] of Object.entries(properties)) {
		ok(contains(css, `${property}: ${value}`), `Missing ${property}: ${value}`);
	}
}

let css = "";
const input = join(import.meta.dirname, "test.css");
const outputDir = mkdtempSync(join(tmpdir(), "tailwindcss-safe-area-"));
const output = `${outputDir}/out.css`;

before(async () => {
	mkdirSync(outputDir, { recursive: true });
	try {
		await execAsync(`npx @tailwindcss/cli -i ${input} -o ${output}`);
		css = readFileSync(output, "utf8");
		console.log("CSS generated successfully");
	} catch (err) {
		console.error("Failed to generate CSS:", err);
		throw err;
	}
});

describe("Tailwind CSS Safe Area Plugin", () => {
	const directions = ["top", "right", "bottom", "left"];

	describe("Margin Utilities", () => {
		test("basic margin utilities", () => {
			expectSelectors([
				".m-safe",
				".mx-safe",
				".my-safe",
				".mt-safe",
				".mr-safe",
				".mb-safe",
				".ml-safe",
				".ms-safe",
				".me-safe",
			]);

			expectCSSProperties(
				Object.fromEntries(
					directions.map((d) => [`margin-${d}`, `env(safe-area-inset-${d})`]),
				),
			);
		});

		test("logical margin properties", () => {
			expectCSSProperties({
				"margin-inline-start": "env(safe-area-inset-left)",
				"margin-inline-end": "env(safe-area-inset-right)",
			});
		});
	});

	describe("Padding Utilities", () => {
		test("basic padding utilities", () => {
			expectSelectors([
				".p-safe",
				".px-safe",
				".py-safe",
				".pt-safe",
				".pr-safe",
				".pb-safe",
				".pl-safe",
				".ps-safe",
				".pe-safe",
			]);

			expectCSSProperties(
				Object.fromEntries(
					directions.map((d) => [`padding-${d}`, `env(safe-area-inset-${d})`]),
				),
			);
		});

		test("logical padding properties", () => {
			expectCSSProperties({
				"padding-inline-start": "env(safe-area-inset-left)",
				"padding-inline-end": "env(safe-area-inset-right)",
			});
		});
	});

	describe("Scroll Margin and Padding", () => {
		test("scroll margin", () => {
			expectSelectors([".scroll-m-safe"]);
			expectCSSProperties(
				Object.fromEntries(
					directions.map((d) => [
						`scroll-margin-${d}`,
						`env(safe-area-inset-${d})`,
					]),
				),
			);
		});

		test("scroll padding", () => {
			expectSelectors([".scroll-p-safe"]);
			expectCSSProperties(
				Object.fromEntries(
					directions.map((d) => [
						`scroll-padding-${d}`,
						`env(safe-area-inset-${d})`,
					]),
				),
			);
		});
	});

	describe("Inset Utilities", () => {
		test("basic inset", () => {
			expectSelectors([
				".inset-safe",
				".inset-x-safe",
				".inset-y-safe",
				".start-safe",
				".end-safe",
				".top-safe",
				".right-safe",
				".bottom-safe",
				".left-safe",
			]);

			expectCSSProperties(
				Object.fromEntries(
					directions.map((d) => [`${d}`, `env(safe-area-inset-${d})`]),
				),
			);
		});

		test("logical inset", () => {
			expectCSSProperties({
				"inset-inline-start": "env(safe-area-inset-left)",
				"inset-inline-end": "env(safe-area-inset-right)",
			});
		});
	});

	describe("Height Utilities", () => {
		test("viewport height safe utilities", () => {
			expectSelectors([
				".h-screen-safe",
				".h-vh-safe",
				".h-dvh-safe",
				".h-svh-safe",
				".h-lvh-safe",
			]);

			ok(css.includes("calc("));
			ok(css.includes("100vh"));
			ok(css.includes("env(safe-area-inset-top)"));
			ok(css.includes("env(safe-area-inset-bottom)"));
			ok(css.includes("-webkit-fill-available"));
		});

		test("min/max height safe utilities", () => {
			expectSelectors([".min-h-screen-safe", ".max-h-screen-safe"]);
			ok(css.includes("min-height"));
			ok(css.includes("max-height"));
			ok(css.includes("calc("));
		});

		test("fill available height", () => {
			expectSelectors([".h-fill-safe", ".min-h-fill-safe", ".max-h-fill-safe"]);
			ok(css.includes(css, "height: -webkit-fill-available"));
		});
	});

	describe("Offset Variant Utilities", () => {
		test("margin, padding, inset, scroll-margin", () => {
			expectSelectors([
				".m-safe-offset-4",
				".mx-safe-offset-2",
				".my-safe-offset-1",
				".mt-safe-offset-8",
				".p-safe-offset-4",
				".px-safe-offset-2",
				".py-safe-offset-1",
				".pt-safe-offset-8",
				".inset-safe-offset-4",
				".top-safe-offset-2",
				".right-safe-offset-1",
				".scroll-m-safe-offset-4",
				".scroll-mx-safe-offset-2",
			]);

			ok(css.includes("env(safe-area-inset-top)"));
			ok(css.includes("1rem") || css.includes("var(--spacing)"));
		});
	});

	describe("Or Variant Utilities", () => {
		test("margin, padding, inset, scroll-padding", () => {
			expectSelectors([
				".m-safe-or-4",
				".mx-safe-or-2",
				".my-safe-or-1",
				".mt-safe-or-8",
				".p-safe-or-4",
				".px-safe-or-2",
				".py-safe-or-1",
				".pt-safe-or-8",
				".inset-safe-or-4",
				".top-safe-or-2",
				".right-safe-or-1",
				".scroll-p-safe-or-4",
				".scroll-px-safe-or-2",
			]);

			ok(css.includes("max("));
			ok(css.includes("env(safe-area-inset-top)"));
		});
	});

	describe("Combinations and Edge Cases", () => {
		test("combination utilities", () => {
			expectSelectors([
				".m-safe",
				".p-safe-offset-4",
				".h-screen-safe",
				".inset-safe-or-2",
			]);
		});

		test("viewport variations", () => {
			["100vh", "100dvh", "100svh", "100lvh"].forEach((unit) => {
				ok(css.includes(unit), `Missing ${unit}`);
			});
		});
	});

	describe("CSS Output Validation", () => {
		test("env() formatting", () => {
			directions.forEach((dir) => {
				ok(css.includes(`env(safe-area-inset-${dir})`));
			});
		});

		test("calc() expressions", () => {
			ok(css.includes("calc("));
			ok(css.includes("100vh"));
			ok(css.includes("env(safe-area-inset-top)"));
			ok(css.includes("env(safe-area-inset-bottom)"));
		});
	});
});
