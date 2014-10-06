module.exports = function(options) {
	if (options === undefined) { options = {}; }

	var er = {
		keyLocator: options.keyLocator || /:([_\w][_\w\d]*(\.[_\w][_\w\d]*)*)/g,
		keySplitter: options.keySplitter || '.',
		create: create, interpolate: interpolate,
		extract: extract, prepare: prepare
	}

	return er;

	function create(key) {
		return function(message, data, original) {
			var e = {
				key: key,
				message: interpolate(message, data),
				data: data
			};
			if (original !== undefined) { e.original = original; }
			return e;
		}
	}

	function interpolate(message, data) {
		return message.replace(er.keyLocator, function(match, key) {
			var e = extract(key, data);
			return e.found ? prepare(e.value) : match;
		});
	}

	function extract(key, data) {
		var accessors = key.split(er.keySplitter);
		for (var i = 0, l = accessors.length; i < l; i++) {
			var key = accessors[i];
			if (!data || typeof data !== 'object' || !(key in data)) {
				return { found: false, value: data };
			}
			data = data[accessors[i]];
		}
		return { found: true, value: data };
	}

	function prepare(value) {
		var t = typeof value;
		return (t === 'string') || (t === 'object') ? JSON.stringify(value) : '' + value;
	}

}