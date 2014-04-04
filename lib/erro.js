erro.interpolate = interpolate;

module.exports = erro;

function erro(format) {
	return new Error(interpolate(format || '', Array.prototype.slice.call(arguments, 1)));
}

function interpolate(format, values) {

	var i = 0, l = values.length;

	return format.replace(/\{([\w\d-_]*)\}/gm, function(match, key) {
		var data = null;

		if (key) {
			// example: {0} or {prop}
			data = /^\d+$/.test(key) ? values : values[0];
		} else {
			// example: {}
			data = values;
			key = i++;
		}

		if (typeof data !== 'object' || !(key in data)) { return match; }

		var value = data[key], type = typeof value;

		if (type === 'string' || type === 'object') { return JSON.stringify(value); }

		return value;
	});

}