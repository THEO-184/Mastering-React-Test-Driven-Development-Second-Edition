import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (domElement, expectedText) => {
	const pass = domElement.textContent.includes(expectedText);
	const sourceHint = () =>
		matcherHint("toContainText", "element", printExpected(expectedText), {
			isNot: pass,
		});

	const actualTextHint = () =>
		"Actual text: " + printReceived(domElement.textContent);
	const message = () => [sourceHint(), actualTextHint()].join("\n\n");

	return {
		pass,
		message,
	};
};
