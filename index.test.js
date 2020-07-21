var plugin = require('./');
var babel = require('@babel/core');
var expect = require('chai').expect;

test('should check the mandatory prepend option', () => {
	var fixture = 'var b = 2;';
	var transform = function() {
		return babel.transform(fixture, {
			plugins: [
				[
					plugin,
					{}
				]
			]
		})
	};

	expect(transform).to.throw(/The prepend option is missing/);
});

test('should assert if the accept option is a function', () => {
	var fixture = 'var b = 2;';
	var transform = function() {
		return babel.transform(fixture, {
			plugins: [
				[
					plugin,
					{
						prepend: 'var a = 1;',
						accept: false
					}
				]
			]
		})
	};

	expect(transform).to.throw(/The accept option must be a function/);
});

test('should accept only one single statement', () => {
	var fixture = 'var b = 2;';
	var transform = function() {
		return babel.transform(fixture, {
			plugins: [
				[
					plugin,
					{
						prepend: 'var a = 1; var c = 3;'
					}
				]
			]
		})
	};

	expect(transform).to.throw(/The prepend value must contain one single statement/);
});

test('should throw an error when the prepend option cannot be parsed', () => {
	var fixture = 'var b = 2;';
	var transform = function() {
		return babel.transform(fixture, {
			plugins: [
				[
					plugin,
					{
						prepend: 'this is a syntax error'
					}
				]
			]
		})
	};

	expect(transform).to.throw(/Error parsing prepend value/);
});

test('should prepend a valid statement', () => {
	var fixture = 'var b = 2;';
	var expected = 'var a = 1;\nvar b = 2;'
	var transform = function() {
		return babel.transform(fixture, {
			plugins: [
				[
					plugin,
					{
						prepend: 'var a = 1;'
					}
				]
			]
		})
	};

	expect(transform().code).to.be.equal(expected);
});

test('should skip transformation when the accept function returns false', () => {
	var fixture = 'var b = 2;';
	var expected = 'var b = 2;'
	var transform = function() {
		return babel.transform(fixture, {
			plugins: [
				[
					plugin,
					{
						prepend: 'var a = 1;',
						accept: function() {
							return false;
						}
					}
				]
			]
		})
	};

	expect(transform().code).to.be.equal(expected);
});