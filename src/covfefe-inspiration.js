/*
 * covfefe-JS ~ 
 * :: Excellent for those situations that call for multiple covfefe!
 *
 * Derived from the very well respected konamijs -- https://github.com/snaptortoise/konami-js
 *
 * This is a total parody, and I have the utmost respect for snaptortoise's implementation of the touch 
 * interaction, but I may not have much of a use for this.  I intend to evolve this freak into something 
 * that'll bind to every event of every input or background DOM element the closure method Covfefe()
 * is pointed towards and returns multiple covfefes in many fartscroll.js instantiations.  For keks.  
 * 
 * I am borrowing things from the snaptortoise konami-js base while I'm barely functional on 
 * vacation -- at least until this thing does the thing I want it to thing.  
 * 
 * Then the deluge of pull requests begins.  Please be gentle, folks.  
 *
 * --
 * 
 * Go forth and covfefe
 *
 * -Ed
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * edit:  fartscroll -- https://theonion.github.io/fartscroll.js/ <3
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