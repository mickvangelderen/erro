module.exports = function(options) {
	if (options === undefined) { options = {}; }

	var _keyLocator = options.keyLocator || /:([_\w][_\w\d]*(?:\.[_\w][_\w\d]*)*)/g;
	var _keySplitter = options.keySplitter || '.';

	function create(name, key) {
		function ErrorConstructor(message, data, original) {
			if (!this instanceof ErrorConstructor) {
				return new ErrorConstructor(message, data, original);
			}
			// error properties
			this.name = name;
			this.message = _interpolate(message, data);
			// custom properties
			this.key = key;
			this.data = data;
			if (original) { this.original = original; }
		}
		ErrorConstructor.prototype = Object.create(Error.prototype);
		return ErrorConstructor;
	}

	function _interpolate(message, data) {
		return message.replace(_keyLocator, function(match, key) {
			try {
				return _prepare(_extract(key, data));
			} catch (error) {
				if (error === 'not-found') { return match; }
				throw error;
			}
		});
	}

	function _extract(key, data) {
		var accessors = key.split(_keySplitter);
		for (var i = 0, l = accessors.length; i < l; i++) {
			var key = accessors[i];
			if (!(data && typeof data === 'object' && key in data)) { throw 'not-found'; }
			data = data[key];
		}
		return data;
	}

	function _prepare(value) {
		var type = typeof value;
		// Cast the following to strings
		if (
			value instanceof RegExp ||
		 	value instanceof Error ||
		 	value instanceof Date ||
		 	type === 'function'
		) { return value.toString(); }
		// Cast the following to JSON
		if (
			type === 'string' ||
			(value && type === 'object')
		) { return JSON.stringify(value); }
		// Leave the rest as-is
		return value;
	}

	return {
		create: create,
		_keyLocator: _keyLocator,
		_keySplitter: _keySplitter,
		_interpolate: _interpolate,
		_extract: _extract,
		_prepare: _prepare
	};
}
