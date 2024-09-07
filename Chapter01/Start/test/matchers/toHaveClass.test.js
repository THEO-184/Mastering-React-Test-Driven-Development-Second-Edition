import { toHaveClass } from "./toHaveClass";
import { stripTerminalColor } from "./toContainText.test";

describe("toHaveClass Matcher", () => {
	it("returns pass is true when the given class is found in the element's className ", () => {
		const domElement = {
			className: "toggled isVisible",
		};

		const result = toHaveClass(domElement, "toggled");
		expect(result.pass).toBe(true);
	});
	it("returns pass is false when the given class is not found in the element's className ", () => {
		const domElement = {
			className: "toggled isVisible",
		};

		const result = toHaveClass(domElement, "visible");
		expect(result.pass).not.toBe(true);
	});

	it("returns a message that contains the source of line if no match", () => {
		const domElement = {
			className: "toggled",
		};
		const result = toHaveClass(domElement, "visible");
		expect(stripTerminalColor(result.message())).toContain(
			`expect(element).toHaveClass("visible")`
		);
	});
	it("returns the message that contains the source line if negated match", () => {
		const domElement = {
			className: "toggled",
		};
		const result = toHaveClass(domElement, "toggled");
		expect(stripTerminalColor(result.message())).toContain(
			`expect(element).not.toHaveClass("toggled")`
		);
	});
	it("returns a message that contains the actual class", () => {
		const domElement = {
			className: "toggled",
		};
		const result = toHaveClass(domElement, "toggled");
		expect(stripTerminalColor(result.message())).toContain(
			`Actual text: "toggled"`
		);
	});
});
