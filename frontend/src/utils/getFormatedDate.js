
function getFormatedDate(data) {
	return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format()
}

export default getFormatedDate