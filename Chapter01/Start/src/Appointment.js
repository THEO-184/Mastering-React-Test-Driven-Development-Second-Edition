import React from "react";
export const Appointment = ({ customer }) => {
	return <div>{customer.firstName}</div>;
};

export const AppointmentsDayView = ({ appointments = [] }) => {
	return (
		<div id="AppointmentsDayView">
			<ol>
				{appointments.map((item) => {
					return (
						<li key={item.startsAt}>{appointmentTimeOfDay(item.startsAt)}</li>
					);
				})}
			</ol>
			{appointments.length === 0 ? (
				<p>There are no appointments scheduled for today.</p>
			) : (
				<Appointment {...appointments[0]} />
			)}
		</div>
	);
};

const appointmentTimeOfDay = (startsAt) => {
	const [h, m] = new Date(startsAt).toTimeString().split(":");

	return `${h}:${m}`;
};
