import ns from 'imajs/client/core/namespace.js';

ns.namespace('Core.Interface');

/**
 * Helper for custom events.
 *
 * It offers public methods for firing custom events
 * and two methods for catching events (e.g. inside view components).
 *
 * @interface EventBus
 * @namespace Core.Interface
 * @module Core
 * @submodule Core.Interface
 */
export default class EventBus {

	/**
	 * Fires a new custom event of the specified name, carrying the provided data.
	 *
	 * Note that this method does not prevent the event listeners to modify the
	 * data in any way. The order in which the event listeners will be executed
	 * is unspecified and should not be relied upon.
	 *
	 * Note that default options of eventInit are { bubbles: true, cancelable: true },
	 * that are different like default values in native CustomEvents ({ bubbles: false, cancelable: false }).
	 *
	 * @method fire
	 * @chainable
	 * @param {EventTarget} eventSource The event source dispatching event (e.g. element/document/window).
	 * @param {string} eventName The name of the event to fire.
	 * @param {*} data The data to pass to the event listeners.
	 * @param {Object=} [options={}] Using options could be define or override an EventInit dictionary options too.
	 *								 Options of eventInit are { bubbles: true, cancelable: true } by default.
	 *								 For more info see: https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
	 * @return {Core.Event.Bus} This custom event bus.
	 * @throws {Error} Thrown if there is no event source defined.
	 */
	fire(eventSource, eventName, data, options = {}) {}

	/**
	 * Registers the provided event listener to be executed when the any
	 * custom event is fired.
	 *
	 * When the specified event is fired, the event listener will be executed
	 * with the event passed as the first argument.
	 *
	 * The order in which the event listeners will be executed is unspecified and
	 * should not be relied upon.
	 *
	 * @chainable
	 * @method listen
	 * @param {EventTarget} eventTarget The event target listining for all events.
	 * @param {function(<CustomEvent>)} listener The event listener to register.
	 * @return {Core.Event.Bus} This custom event bus.
	 */
	listenAll(eventTarget, listener) {}

	/**
	 * Registers the provided event listener to be executed when the specific
	 * custom event is fired.
	 *
	 * When the specified event is fired, the event listener will be executed
	 * with the event passed as the first argument.
	 *
	 * The order in which the event listeners will be executed is unspecified and
	 * should not be relied upon.
	 *
	 * @chainable
	 * @method listen
	 * @param {EventTarget} eventTarget The event target listining for specific event.
	 * @param {string} eventName The name of the event to listen for.
	 * @param {function(<CustomEvent>)} listener The event listener to register.
	 * @return {Core.Event.Bus} This custom event bus.
	 */
	listen(eventTarget, eventName, listener) {}
}

ns.Core.Interface.EventBus = EventBus;
