import { ok } from "node:assert";
import { exec } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { before, describe, test } from "node:test";
import { promisify } from "node:util";

const input = join(import.meta.dirname, "test.css");
const outputDir = mkdtempSync(join(tmpdir(), "tailwindcss-safe-area-"));
const output = `${outputDir}/out.css`;
const execAsync = promisify(exec);
const directions = ["top", "right", "bottom", "left"];

let css = "";

function normalizeWhitespace(value) {
	return value.replace(/\s+/g, " ").trim();
}

function contains(value, pattern) {
	return normalizeWhitespace(value).includes(normalizeWhitespace(pattern));
}

function escapeClassName(name) {
	return name.replace(/[^\w-]/g, "\\$&");
}

function expectClasses(classes) {
	classes.forEach((name) => {
		ok(css.includes(escapeClassName(name)), `Missing class: ${name}`);
	});
}

function expectCSSProperties(properties) {
	for (const [property, value] of Object.entries(properties)) {
		ok(contains(css, `${property}: ${value}`), `Missing ${property}: ${value}`);
	}
}

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
	test("margin", () => {
		expectClasses([
			"m-safe",
			"mx-safe",
			"my-safe",
			"mt-safe",
			"mr-safe",
			"mb-safe",
			"ml-safe",
			"ms-safe",
			"me-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`margin-${d}`, `var(--twsa-inset-${d})`]),
			),
		);
	});

	test("negative margin", () => {
		expectClasses([
			"-m-safe",
			"-mx-safe",
			"-my-safe",
			"-mt-safe",
			"-mr-safe",
			"-mb-safe",
			"-ml-safe",
			"-ms-safe",
			"-me-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`margin-${d}`,
					`calc(var(--twsa-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("logical margin", () => {
		expectCSSProperties({
			"margin-inline-start": "var(--twsa-inset-left)",
			"margin-inline-end": "var(--twsa-inset-right)",
		});
	});

	test("negative logical margin", () => {
		expectCSSProperties({
			"margin-inline-start": "calc(var(--twsa-inset-left) * -1)",
			"margin-inline-end": "calc(var(--twsa-inset-right) * -1)",
		});
	});

	test("padding", () => {
		expectClasses([
			"p-safe",
			"px-safe",
			"py-safe",
			"pt-safe",
			"pr-safe",
			"pb-safe",
			"pl-safe",
			"ps-safe",
			"pe-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`padding-${d}`, `var(--twsa-inset-${d})`]),
			),
		);
	});

	test("negative padding", () => {
		expectClasses([
			"-p-safe",
			"-px-safe",
			"-py-safe",
			"-pt-safe",
			"-pr-safe",
			"-pb-safe",
			"-pl-safe",
			"-ps-safe",
			"-pe-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`padding-${d}`,
					`calc(var(--twsa-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("logical padding", () => {
		expectCSSProperties({
			"padding-inline-start": "var(--twsa-inset-left)",
			"padding-inline-end": "var(--twsa-inset-right)",
		});
	});

	test("negative logical padding", () => {
		expectCSSProperties({
			"padding-inline-start": "calc(var(--twsa-inset-left) * -1)",
			"padding-inline-end": "calc(var(--twsa-inset-right) * -1)",
		});
	});

	test("scroll margin", () => {
		expectClasses(["scroll-m-safe"]);
		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`scroll-margin-${d}`, `var(--twsa-inset-${d})`]),
			),
		);
	});

	test("negative scroll margin", () => {
		expectClasses(["-scroll-m-safe"]);
		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`scroll-margin-${d}`,
					`calc(var(--twsa-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("scroll padding", () => {
		expectClasses(["scroll-p-safe"]);
		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`scroll-padding-${d}`,
					`var(--twsa-inset-${d})`,
				]),
			),
		);
	});

	test("negative scroll padding", () => {
		expectClasses(["-scroll-p-safe"]);
		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [
					`scroll-padding-${d}`,
					`calc(var(--twsa-inset-${d}) * -1)`,
				]),
			),
		);
	});

	test("inset", () => {
		expectClasses([
			"inset-safe",
			"inset-x-safe",
			"inset-y-safe",
			"start-safe",
			"end-safe",
			"top-safe",
			"right-safe",
			"bottom-safe",
			"left-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`${d}`, `var(--twsa-inset-${d})`]),
			),
		);
	});

	test("negative inset", () => {
		expectClasses([
			"-inset-safe",
			"-inset-x-safe",
			"-inset-y-safe",
			"-start-safe",
			"-end-safe",
			"-top-safe",
			"-right-safe",
			"-bottom-safe",
			"-left-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`${d}`, `calc(var(--twsa-inset-${d}) * -1)`]),
			),
		);
	});

	test("logical inset", () => {
		expectCSSProperties({
			"inset-inline-start": "var(--twsa-inset-left)",
			"inset-inline-end": "var(--twsa-inset-right)",
		});
	});

	test("negative logical inset", () => {
		expectCSSProperties({
			"inset-inline-start": "calc(var(--twsa-inset-left) * -1)",
			"inset-inline-end": "calc(var(--twsa-inset-right) * -1)",
		});
	});

	test("height", () => {
		expectClasses([
			"h-screen-safe",
			"h-vh-safe",
			"h-dvh-safe",
			"h-svh-safe",
			"h-lvh-safe",
			"min-h-screen-safe",
			"max-h-screen-safe",
			"h-fill-safe",
			"min-h-fill-safe",
			"max-h-fill-safe",
		]);

		ok(css.includes("calc("));
		ok(css.includes("100vh"));
		ok(css.includes("var(--twsa-inset-top)"));
		ok(css.includes("var(--twsa-inset-bottom)"));
		ok(css.includes("-webkit-fill-available"));
		ok(css.includes("min-height"));
		ok(css.includes("max-height"));
		ok(css.includes("calc("));
		ok(css.includes("height: -webkit-fill-available"));
	});

	test("offset", () => {
		expectClasses([
			"m-safe-offset-4",
			"p-safe-offset-4",
			"inset-safe-offset-4",
			"scroll-m-safe-offset-4",

			"m-safe-offset-3.5",
			"p-safe-offset-3.5",
			"inset-safe-offset-3.5",
			"scroll-m-safe-offset-3.5",
		]);
	});

	test("negative offset", () => {
		expectClasses([
			"-m-safe-offset-4",
			"-p-safe-offset-4",
			"-inset-safe-offset-4",
			"-scroll-m-safe-offset-4",

			"-m-safe-offset-3.5",
			"-p-safe-offset-3.5",
			"-inset-safe-offset-3.5",
			"-scroll-m-safe-offset-3.5",
		]);
	});

	test("or", () => {
		expectClasses([
			"m-safe-or-4",
			"p-safe-or-4",
			"inset-safe-or-4",
			"scroll-m-safe-or-4",

			"m-safe-or-3.5",
			"p-safe-or-3.5",
			"inset-safe-or-3.5",
			"scroll-m-safe-or-3.5",
		]);

		ok(css.includes("max("));
	});

	test("negative or", () => {
		expectClasses([
			"-m-safe-or-4",
			"-p-safe-or-4",
			"-inset-safe-or-4",
			"-scroll-m-safe-or-4",

			"-m-safe-or-3.5",
			"-p-safe-or-3.5",
			"-inset-safe-or-3.5",
			"-scroll-m-safe-or-3.5",
		]);

		ok(css.includes("min("));
	});

	test("CSS custom property defaults", () => {
		expectCSSProperties({
			"--twsa-inset-top": "env(safe-area-inset-top)",
			"--twsa-inset-right": "env(safe-area-inset-right)",
			"--twsa-inset-bottom": "env(safe-area-inset-bottom)",
			"--twsa-inset-left": "env(safe-area-inset-left)",
		});
	});

	test("safe area enable", () => {
		expectClasses([
			"safe",
			"safe-x",
			"safe-y",
			"safe-t",
			"safe-r",
			"safe-b",
			"safe-l",
		]);

		expectCSSProperties({
			"--twsa-inset-top": "env(safe-area-inset-top)",
			"--twsa-inset-right": "env(safe-area-inset-right)",
			"--twsa-inset-bottom": "env(safe-area-inset-bottom)",
			"--twsa-inset-left": "env(safe-area-inset-left)",
		});
	});

	test("safe area disable", () => {
		expectClasses([
			"safe-none",
			"safe-x-none",
			"safe-y-none",
			"safe-t-none",
			"safe-r-none",
			"safe-b-none",
			"safe-l-none",
		]);

		expectCSSProperties({
			"--twsa-inset-top": "0px",
			"--twsa-inset-right": "0px",
			"--twsa-inset-bottom": "0px",
			"--twsa-inset-left": "0px",
		});
	});

	test("border", () => {
		expectClasses([
			"border-safe",
			"border-x-safe",
			"border-y-safe",
			"border-s-safe",
			"border-e-safe",
			"border-t-safe",
			"border-r-safe",
			"border-b-safe",
			"border-l-safe",
		]);

		expectCSSProperties(
			Object.fromEntries(
				directions.map((d) => [`border-${d}-width`, `var(--twsa-inset-${d})`]),
			),
		);
	});

	test("border offset", () => {
		expectClasses([
			"border-safe-offset-4",
			"border-x-safe-offset-4",
			"border-y-safe-offset-4",
			"border-s-safe-offset-4",
			"border-e-safe-offset-4",
			"border-t-safe-offset-4",
			"border-r-safe-offset-4",
			"border-b-safe-offset-4",
			"border-l-safe-offset-4",

			"border-safe-offset-3.5",
			"border-x-safe-offset-3.5",
			"border-y-safe-offset-3.5",
			"border-s-safe-offset-3.5",
			"border-e-safe-offset-3.5",
			"border-t-safe-offset-3.5",
			"border-r-safe-offset-3.5",
			"border-b-safe-offset-3.5",
			"border-l-safe-offset-3.5",
		]);
	});

	test("border or", () => {
		expectClasses([
			"border-safe-or-4",
			"border-x-safe-or-4",
			"border-y-safe-or-4",
			"border-s-safe-or-4",
			"border-e-safe-or-4",
			"border-t-safe-or-4",
			"border-r-safe-or-4",
			"border-b-safe-or-4",
			"border-l-safe-or-4",

			"border-safe-or-3.5",
			"border-x-safe-or-3.5",
			"border-y-safe-or-3.5",
			"border-s-safe-or-3.5",
			"border-e-safe-or-3.5",
			"border-t-safe-or-3.5",
			"border-r-safe-or-3.5",
			"border-b-safe-or-3.5",
			"border-l-safe-or-3.5",
		]);

		ok(css.includes("max("));
	});
});
