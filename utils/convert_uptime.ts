export type ConvertedUptime = {
	days: number,
	hours: number,
	minutes: number,
	seconds: number,
}

export function convertUptime(uptime: number): ConvertedUptime {
	uptime = Math.round(uptime);

	let days = Math.floor(uptime / 86400);
	let hours = Math.floor((uptime % 86400) / 3600);
	let minutes = Math.floor((uptime % 3600) / 60);
	let seconds = uptime % 60;

	return { days, hours, minutes, seconds };
}