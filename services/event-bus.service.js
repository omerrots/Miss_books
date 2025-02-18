function createEventEmitter() {
	const listenersMap = {};

	return {
		on(evName, listener) {
			listenersMap[evName] = listenersMap[evName]
				? [...listenersMap[evName], listener]
				: [listener];
			return () => {
				listenersMap[evName] = listenersMap[evName].filter(
					func => func !== listener
				);
			};
		},

		emit(evName, data) {
			if (!listenersMap[evName]) return;
			listenersMap[evName].forEach(listener => listener(data));
		},
	};
}

export const eventBusService = createEventEmitter();

export function showSuccessMsg(txt) {
	showUserMsg({ txt, type: "success" });
	console.log(txt);
}

export function showErrorMsg(txt) {
	showUserMsg({ txt, type: "error" });
	console.log(txt);
}

function showUserMsg(msg) {
	eventBusService.emit("show-user-msg", msg);
}
