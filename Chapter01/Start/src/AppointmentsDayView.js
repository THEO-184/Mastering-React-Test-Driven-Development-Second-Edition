import React, { useState } from "react";
export const Appointment = ({ customer }) => {
	return (
		<div>
			<header>
				Todays's appointment at {appointmentTimeOfDay(customer.startsAt)}
			</header>

			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Telephone Number</th>
						<th>Stylist Name</th>
						<th>Salon Service</th>
						<th>Appointment Notes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{customer.firstName}</td>
						<td>{customer.phoneNumber}</td>
						<td>{customer.stylist}</td>
						<td>{customer.service}</td>
						<td>{customer.notes}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export const AppointmentsDayView = ({ appointments = [] }) => {
	const [selectedAppointment, setSelectedAppointment] = useState(0);

	return (
		<div id="appointmentsDayView">
			<ol>
				{appointments.map((item, i) => {
					return (
						<li key={item.startsAt}>
							<button
								className={selectedAppointment === i ? "toggled" : ""}
								type="button"
								onClick={() => setSelectedAppointment(i)}
							>
								{appointmentTimeOfDay(item.startsAt)}
							</button>
						</li>
					);
				})}
			</ol>
			{appointments.length === 0 ? (
				<p>There are no appointments scheduled for today.</p>
			) : (
				<Appointment {...appointments[selectedAppointment]} />
			)}
		</div>
	);
};

const appointmentTimeOfDay = (startsAt) => {
	const [h, m] = new Date(startsAt).toTimeString().split(":");

	return `${h}:${m}`;
};
