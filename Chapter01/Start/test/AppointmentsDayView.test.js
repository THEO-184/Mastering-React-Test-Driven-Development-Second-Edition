import React, { act } from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import {
	initializeReactContainer,
	container,
	render,
	click,
	element,
	elements,
	textOf,
	typesOf,
} from "./reactTestExtensions";

describe("Appointment", () => {
	beforeEach(() => {
		initializeReactContainer();
	});

	it("renders the customer first name", () => {
		const customer = { firstName: "Ashley" };
		render(<Appointment customer={customer} />);
		expect(document.body).toContainText("Ashley");
	});
	it("renders another customer first name", () => {
		const customer = { firstName: "Jordan" };
		render(<Appointment customer={customer} />);
		expect(document.body).toContainText("Jordan");
	});
});

describe("AppointmentsDayView", () => {
	const today = new Date();
	const appointments = [
		{
			startsAt: today.setHours(12, 0),
			customer: { firstName: "Ashley" },
		},
		{
			startsAt: today.setHours(13, 0),
			customer: { firstName: "Jordan" },
		},
	];
	const secondButton = () => elements("ol li  button")[1];

	beforeEach(() => {
		initializeReactContainer();
	});

	const render = (component) => {
		act(() => ReactDOM.createRoot(container).render(component));
	};

	it("renders a div with the right id", () => {
		render(<AppointmentsDayView appointments={[]} />);
		expect(element("div#appointmentsDayView")).not.toBeNull();
	});

	it("renders an ol element to display appointments", () => {
		render(<AppointmentsDayView appointments={[]} />);
		expect(element("div#appointmentsDayView  ol")).not.toBeNull();
	});

	it("renders an li element for each appointment", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		const listChildren = elements("ol > li");
		expect(listChildren).toHaveLength(2);
	});

	it("renders the time for each component", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		expect(textOf(elements("ol > li"))).toEqual(["12:00", "13:00"]);
	});

	it("initially shows a message that there is no appointment view", () => {
		render(<AppointmentsDayView appointments={[]} />);
		expect(document.body).toContainText(
			"There are no appointments scheduled for today."
		);
	});

	it("selects the first appointment by default", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		expect(document.body).toContainText("Ashley");
	});

	it("has a button in each li element", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		expect(typesOf(elements("ol li > button"))).toEqual(["button", "button"]);
	});

	it("renders another component when button is clicked", () => {
		render(<AppointmentsDayView appointments={appointments} />);

		click(secondButton());
		expect(document.body).toContainText("Jordan");
	});

	it("adds toggled class to button when selected", () => {
		render(<AppointmentsDayView appointments={appointments} />);

		click(secondButton());
		expect(secondButton()).toHaveClass("toggled");
	});

	it("does not add toggled class if button is not selected", () => {
		render(<AppointmentsDayView appointments={appointments} />);

		expect(secondButton()).not.toHaveClass("toggled");
	});
});
