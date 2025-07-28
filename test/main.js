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

describe("Safe Area Utilities", () => {
	const directions = ["top", "right", "bottom", "left"];

	test("margin", () => {
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

	test("negative margin", () => {
		expectSelectors([
			".-m-safe",
			".-mx-safe",
			".-my-safe",
			".-mt-safe",
			".-mr-safe",
			".-mb-safe",
			".-ml-safe",
			".-ms-safe",
			".-me-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`margin-${d}`,
					`calc(env(safe-area-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("logical margin", () => {
		expectCSSProperties({
			"margin-inline-start": "env(safe-area-inset-left)",
			"margin-inline-end": "env(safe-area-inset-right)",
		});
	});

	test("negative logical margin", () => {
		expectCSSProperties({
			"margin-inline-start": "calc(env(safe-area-inset-left) * -1)",
			"margin-inline-end": "calc(env(safe-area-inset-right) * -1)",
		});
	});

	test("padding", () => {
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

	test("negative padding", () => {
		expectSelectors([
			".-p-safe",
			".-px-safe",
			".-py-safe",
			".-pt-safe",
			".-pr-safe",
			".-pb-safe",
			".-pl-safe",
			".-ps-safe",
			".-pe-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`padding-${d}`,
					`calc(env(safe-area-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("logical padding", () => {
		expectCSSProperties({
			"padding-inline-start": "env(safe-area-inset-left)",
			"padding-inline-end": "env(safe-area-inset-right)",
		});
	});

	test("negative logical padding", () => {
		expectCSSProperties({
			"padding-inline-start": "calc(env(safe-area-inset-left) * -1)",
			"padding-inline-end": "calc(env(safe-area-inset-right) * -1)",
		});
	});

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

	test("negative scroll margin", () => {
		expectSelectors([".-scroll-m-safe"]);
		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`scroll-margin-${d}`,
					`calc(env(safe-area-inset-${d}) * -1)`,
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

	test("negative scroll padding", () => {
		expectSelectors([".-scroll-p-safe"]);
		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`scroll-padding-${d}`,
					`calc(env(safe-area-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("inset", () => {
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

	test("negative inset", () => {
		expectSelectors([
			".-inset-safe",
			".-inset-x-safe",
			".-inset-y-safe",
			".-start-safe",
			".-end-safe",
			".-top-safe",
			".-right-safe",
			".-bottom-safe",
			".-left-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`${d}`, `calc(env(safe-area-inset-${d}) * -1)`]),
			),
		);
	});

	test("logical inset", () => {
		expectCSSProperties({
			"inset-inline-start": "env(safe-area-inset-left)",
			"inset-inline-end": "env(safe-area-inset-right)",
		});
	});

	test("negative logical inset", () => {
		expectCSSProperties({
			"inset-inline-start": "calc(env(safe-area-inset-left) * -1)",
			"inset-inline-end": "calc(env(safe-area-inset-right) * -1)",
		});
	});

	test("height", () => {
		expectSelectors([
			".h-screen-safe",
			".h-vh-safe",
			".h-dvh-safe",
			".h-svh-safe",
			".h-lvh-safe",
			".min-h-screen-safe",
			".max-h-screen-safe",
			".h-fill-safe",
			".min-h-fill-safe",
			".max-h-fill-safe",
		]);

		ok(css.includes("calc("));
		ok(css.includes("100vh"));
		ok(css.includes("env(safe-area-inset-top)"));
		ok(css.includes("env(safe-area-inset-bottom)"));
		ok(css.includes("-webkit-fill-available"));
		ok(css.includes("min-height"));
		ok(css.includes("max-height"));
		ok(css.includes("calc("));
		ok(css.includes("height: -webkit-fill-available"));
	});

	test("offset", () => {
		expectSelectors([
			".m-safe-offset-4",
			".p-safe-offset-4",
			".inset-safe-offset-4",
			".scroll-m-safe-offset-4",
		]);
	});

	test("negative offset", () => {
		expectSelectors([
			".-m-safe-offset-4",
			".-p-safe-offset-4",
			".-inset-safe-offset-4",
			".-scroll-m-safe-offset-4",
		]);
	});

	test("or", () => {
		expectSelectors([
			".m-safe-or-4",
			".p-safe-or-4",
			".inset-safe-or-4",
			".scroll-m-safe-or-4",
		]);

		ok(css.includes("max("));
	});

	test("negative or", () => {
		expectSelectors([
			".-m-safe-or-4",
			".-p-safe-or-4",
			".-inset-safe-or-4",
			".-scroll-m-safe-or-4",
		]);

		ok(css.includes("min("));
	});
});
