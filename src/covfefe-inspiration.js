/*
 * covfefe-JS ~ 
 * :: Excellent for those situations that call for multiple covfefe!
 */

var Covfefe = function (callback) {
	var covfefe = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				}
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		pattern: "67798670697069",
		load: function (link) {
			this.addEvent(document, "keydown", function (e, ref_obj) {
				if (ref_obj) covfefe = ref_obj; // IE
				covfefe.input += e ? e.keyCode : event.keyCode;
				if (covfefe.input.length > covfefe.pattern.length)
					covfefe.input = covfefe.input.substr((covfefe.input.length - covfefe.pattern.length));
				if (covfefe.input == covfefe.pattern) {
					covfefe.code(link);
					covfefe.input = "";
					e.preventDefault();
					return false;
				}
			}, this);
		},
		code: function (link) {
			window.location = link
		}
	}

	typeof callback === "string" && covfefe.load(callback);
	if (typeof callback === "function") {
		covfefe.code = callback;
		covfefe.load();
	}

	return covfefe;
};