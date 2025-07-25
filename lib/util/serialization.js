/*
	MIT License http://www.opensource.org/licenses/mit-license.php
*/

"use strict";

const { DEFAULTS } = require("../config/defaults");
const memoize = require("./memoize");

/** @typedef {import("../serialization/BinaryMiddleware").MEASURE_END_OPERATION_TYPE} MEASURE_END_OPERATION */
/** @typedef {import("../serialization/BinaryMiddleware").MEASURE_START_OPERATION_TYPE} MEASURE_START_OPERATION */
/** @typedef {typeof import("../util/Hash")} Hash */
/** @typedef {import("../util/fs").IntermediateFileSystem} IntermediateFileSystem */

/**
 * @template D, S, C
 * @typedef {import("../serialization/Serializer")<D, S, C>} Serializer
 */

const getBinaryMiddleware = memoize(() =>
	require("../serialization/BinaryMiddleware")
);
const getObjectMiddleware = memoize(() =>
	require("../serialization/ObjectMiddleware")
);
const getSingleItemMiddleware = memoize(() =>
	require("../serialization/SingleItemMiddleware")
);
const getSerializer = memoize(() => require("../serialization/Serializer"));
const getSerializerMiddleware = memoize(() =>
	require("../serialization/SerializerMiddleware")
);

const getBinaryMiddlewareInstance = memoize(
	() => new (getBinaryMiddleware())()
);

const registerSerializers = memoize(() => {
	require("./registerExternalSerializer");

	// Load internal paths with a relative require
	// This allows bundling all internal serializers
	const internalSerializables = require("./internalSerializables");

	getObjectMiddleware().registerLoader(/^webpack\/lib\//, req => {
		const loader =
			internalSerializables[
				/** @type {keyof import("./internalSerializables")} */
				(req.slice("webpack/lib/".length))
			];
		if (loader) {
			loader();
		} else {
			// eslint-disable-next-line no-console
			console.warn(`${req} not found in internalSerializables`);
		}
		return true;
	});
});

/**
 * @type {Serializer<EXPECTED_ANY, EXPECTED_ANY, EXPECTED_ANY>}
 */
let buffersSerializer;

// Expose serialization API
module.exports = {
	get register() {
		return getObjectMiddleware().register;
	},
	get registerLoader() {
		return getObjectMiddleware().registerLoader;
	},
	get registerNotSerializable() {
		return getObjectMiddleware().registerNotSerializable;
	},
	get NOT_SERIALIZABLE() {
		return getObjectMiddleware().NOT_SERIALIZABLE;
	},
	/** @type {MEASURE_START_OPERATION} */
	get MEASURE_START_OPERATION() {
		return getBinaryMiddleware().MEASURE_START_OPERATION;
	},
	/** @type {MEASURE_END_OPERATION} */
	get MEASURE_END_OPERATION() {
		return getBinaryMiddleware().MEASURE_END_OPERATION;
	},
	get buffersSerializer() {
		if (buffersSerializer !== undefined) return buffersSerializer;
		registerSerializers();
		const Serializer = getSerializer();
		const binaryMiddleware = getBinaryMiddlewareInstance();
		const SerializerMiddleware = getSerializerMiddleware();
		const SingleItemMiddleware = getSingleItemMiddleware();
		return /** @type {Serializer<EXPECTED_ANY, EXPECTED_ANY, EXPECTED_ANY>} */ (
			buffersSerializer = new Serializer([
				new SingleItemMiddleware(),
				new (getObjectMiddleware())(context => {
					if ("write" in context) {
						context.writeLazy = value => {
							context.write(
								SerializerMiddleware.createLazy(value, binaryMiddleware)
							);
						};
					}
				}, DEFAULTS.HASH_FUNCTION),
				binaryMiddleware
			])
		);
	},
	/**
	 * @template D, S, C
	 * @param {IntermediateFileSystem} fs filesystem
	 * @param {string | Hash} hashFunction hash function to use
	 * @returns {Serializer<D, S, C>} file serializer
	 */
	createFileSerializer: (fs, hashFunction) => {
		registerSerializers();
		const Serializer = getSerializer();

		const FileMiddleware = require("../serialization/FileMiddleware");

		const fileMiddleware = new FileMiddleware(fs, hashFunction);
		const binaryMiddleware = getBinaryMiddlewareInstance();
		const SerializerMiddleware = getSerializerMiddleware();
		const SingleItemMiddleware = getSingleItemMiddleware();
		return /** @type {Serializer<D, S, C>} */ (
			new Serializer([
				new SingleItemMiddleware(),
				new (getObjectMiddleware())(context => {
					if ("write" in context) {
						context.writeLazy = value => {
							context.write(
								SerializerMiddleware.createLazy(value, binaryMiddleware)
							);
						};
						context.writeSeparate = (value, options) => {
							const lazy = SerializerMiddleware.createLazy(
								value,
								fileMiddleware,
								options
							);
							context.write(lazy);
							return lazy;
						};
					}
				}, hashFunction),
				binaryMiddleware,
				fileMiddleware
			])
		);
	}
};
