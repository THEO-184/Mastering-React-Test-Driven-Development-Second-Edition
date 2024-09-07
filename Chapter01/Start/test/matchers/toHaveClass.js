import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
export const toHaveClass = (domElement, expectedClass) => {
	const pass = domElement.className.includes(expectedClass);
	const sourceHint = () =>
		matcherHint("toHaveClass", "element", printExpected(expectedClass), {
			isNot: pass,
		});

	const actualTextHint = () =>
		"Actual text: " + printReceived(domElement.className);

	const message = () => [sourceHint(), actualTextHint()].join("\n\n");

	return {
		pass,
		message,
	};
};
