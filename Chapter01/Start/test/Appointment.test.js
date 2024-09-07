import React, { act } from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsDayView } from "../src/Appointment";

describe("Appointment", () => {
	let container;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.replaceChildren(container);
	});
	const render = (component) =>
		act(() => ReactDOM.createRoot(container).render(component));
	it("renders the customer first name", () => {
		const customer = { firstName: "Ashley" };
		render(<Appointment customer={customer} />);
		expect(document.body.textContent).toContain("Ashley");
	});
	it("renders another customer first name", () => {
		const customer = { firstName: "Jordan" };
		render(<Appointment customer={customer} />);
		expect(document.body.textContent).toContain("Jordan");
	});
});

describe("AppointmentsDayView", () => {
	let container;
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

	beforeEach(() => {
		container = document.createElement("div");
		document.body.replaceChildren(container);
	});

	const render = (component) => {
		act(() => ReactDOM.createRoot(container).render(component));
	};

	it("renders a div with the right id", () => {
		render(<AppointmentsDayView appointments={[]} />);
		expect(document.querySelector("div#AppointmentsDayView")).not.toBeNull();
	});

	it("renders an ol element to display appointments", () => {
		render(<AppointmentsDayView appointments={[]} />);
		expect(
			document.querySelector("div#AppointmentsDayView  ol")
		).not.toBeNull();
	});

	it("renders an li element for each appointment", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		const listChildren = document.querySelectorAll("ol > li");
		expect(listChildren).toHaveLength(2);
	});

	it("renders the time for each component", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		const listChildren = document.querySelectorAll("ol > li");
		expect(listChildren[0].textContent).toEqual("12:00");
		expect(listChildren[1].textContent).toEqual("13:00");
	});

	it("initially shows a message that there is no appointment view", () => {
		render(<AppointmentsDayView appointments={[]} />);
		expect(document.body.textContent).toContain(
			"There are no appointments scheduled for today."
		);
	});

	it("selects the first appointment by default", () => {
		render(<AppointmentsDayView appointments={appointments} />);
		expect(document.body.textContent).toContain("Ashley");
	});
});
