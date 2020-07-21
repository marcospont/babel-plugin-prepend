const babel = require('@babel/core');

module.exports = () => ({
	visitor: {
		Program: {
			enter: (path, state) => {
				const opts = state.opts || {};
				const file = state.file || {};

				if (!opts || !opts.prepend) {
					throw new Error('The prepend option is missing');
				}

				if (typeof opts.accept !== 'undefined' && typeof opts.accept !== 'function') {
					throw new Error('The accept option must be a function');
				}

				if (opts.accept && !opts.accept(file.opts.filename)) {
					return;
				}

				let parsed = null;

				try {
					parsed = babel.parse(opts.prepend, { filename: '' });
				} catch (e) {
					throw new Error('Error parsing prepend value: ' + opts.prepend);
				}

				if (!parsed || !parsed.program || !parsed.program.body) {
					throw new Error('Error parsing prepend value: ' + opts.prepend);
				}

				if (parsed.program.body.length > 1) {
					throw new Error('The prepend value must contain one single statement');
				}

				path.node.body.unshift(parsed.program.body[0]);
			}
		}
	}
});
