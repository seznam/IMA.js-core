import ns from 'imajs/client/core/namespace.js';

ns.namespace('Core.Interface');

/**
 * The router manages the application's routing configuration and dispatches
 * controllers and views according to the current URL and the route it matches.
 *
 * @interface Router
 * @namespace Core.Interface
 * @module Core
 * @submodule Core.Interface
 */
export default class Router {

	/**
	 * Initializes the router with the provided configuration.
	 *
	 * @method init
	 * @param {{$Protocol: string, $Domain: string, $Root: string, $LanguagePartPath: string}} config
	 *        Router configuration.
	 *        The {@code $Protocol} field must be the current protocol used to
	 *        access the application, terminated by a collon (for example
	 *        {@code https:}).
	 *        The {@code $Domain} field must be the application's domain in the
	 *        following form: {@code `${protocol}//${host}`}.
	 *        The {@code $Root} field must specify the URL path pointing to the
	 *        application's root.
	 *        The {@code $LanguagePartPath} field must be the URL path fragment
	 *        used as a suffix to the {@code $Root} field that specifies the
	 *        current language.
	 */
	init(config) {}

	/**
	 * Adds a new route to router.
	 *
	 * @chainable
	 * @method add
	 * @param {string} name The unique name of this route, identifying it among
	 *        the rest of the routes in the application.
	 * @param {string} pathExpression A path expression specifying the URL path
	 *        part matching this route (must not contain a query string),
	 *        optionally containing named parameter placeholders specified as
	 *        {@code :parameterName}.
	 * @param {string} controller The full name of Object Container alias
	 *        identifying the controller associated with this route.
	 * @param {string} view The full name or Object Container alias identifying
	 *        the view class associated with this route.
	 * @return {Core.Interface.Router} This router.
	 * @throws {Core.IMAError} Thrown if a route with the same name is added
	 *         multiple times.
	 */
	add(name, pathExpression, controller, view) {}

	/**
	 * Removes the specified route from the router's known routes.
	 *
	 * @chainable
	 * @method remove
	 * @param {string} name The route's unique name, identifying the route to
	 *        remove.
	 * @return {Core.Interface.Router} This router.
	 */
	remove(name) {}

	/**
	 * Ruturns current path part of the current URL, including the query string
	 * (if any).
	 *
	 * @method getPath
	 * @return {string} The path and query parts of the current URL.
	 */
	getPath() {}

	/**
	 * Returns the current absolute URL (including protocol, host, query, etc).
	 *
	 * @method getUrl
	 * @return {string} The current absolute URL.
	 */
	getUrl() {}

	/**
	 * Returns the application's domain in the following form
	 * {@code `${protocol}//${host}`}.
	 *
	 * @method getDomain
	 * @return {string} The current application's domain.
	 */
	getDomain() {}

	/**
	 * Returns the current protocol used to access the application, terminated by
	 * a collon (for example {@code https:}).
	 *
	 * @method getProtocol
	 * @return {string} The current application protocol used to access the
	 *         application.
	 */
	getProtocol() {}

	/**
	 * Registers event listeners at the client side window object allowing the
	 * router to capture user's history (history pop state - going "back") and
	 * page (clicking links) navigation.
	 *
	 * The router will start processing the navigation internally, handling the
	 * user's navigation to display the page related to the URL resulting from
	 * the user's action.
	 *
	 * Note that the router will not prevent forms from being submitted to the
	 * server.
	 *
	 * The effects of this method cannot be reverted. This method has no effect
	 * at the server side.
	 *
	 * @chainable
	 * @method listen
	 * @return {Core.Interface.Router} This router.
	 */
	listen() {}

	/**
	 * Redirects the client to the specified location.
	 *
	 * At the server side the method results in responsing to the client with a
	 * redirect HTTP status code and the {@code Location} header.
	 *
	 * At the client side the method updates the current URL by manipulating the
	 * browser history (if the target URL is at the same domain and protocol as
	 * the current one) or performs a hard redirect (if the target URL points to
	 * a different protocol or domain).
	 *
	 * The method will result in the router handling the new URL and routing the
	 * client to the related page if the URL is set at the client side and points
	 * to the same domain and protocol.
	 *
	 * @method redirect
	 * @param {string} url The URL to which the client should be redirected.
	 */
	redirect(url) {}

	/**
	 * Generates an absolute URL (including protocol, domain, etc) for the
	 * specified route by substituting the route's parameter placeholders with
	 * the provided parameter values.
	 *
	 * @method link
	 * @param {string} routeName The unique name of the route, identifying the
	 *        route to use.
	 * @param {Object<string, string>} params Parameter values for the route's
	 *        parameter placeholders. Extraneous parameters will be added as URL
	 *        query.
	 * @return {string} An absolute URL for the specified route and parameters.
	 */
	link(routeName, params) {}

	/**
	 * Routes the application to the route matching the providing path, renders
	 * the route page and sends the result to the client.
	 *
	 * @method route
	 * @param {string} path The URL path part received from the client, with
	 *        optional query.
	 * @return {Promise<undefined>} A promise resolved when the error has been
	 *         handled and the response has been sent to the client, or displayed
	 *         if used at the client side.
	 */
	route(path) {}

	/**
	 * Handles an internal server error by responding with the appropriate
	 * "internal server error" error page.
	 *
	 * @method handleError
	 * @param {Object<string, string>} params Parameters extracted from the
	 *        current URL path and query.
	 * @return {Promise<undefined>} A promise resolved when the error has been
	 *         handled and the response has been sent to the client, or displayed
	 *         if used at the client side.
	 */
	handleError(params) {}

	/**
	 * Handles a "not found" error by responsing with the appropriate "not found"
	 * error page.
	 *
	 * @method handleNotFound
	 * @param {Object<string, string>} params Parameters extracted from the
	 *        current URL path and query.
	 * @return {Promise<undefined>} A promise resolved when the error has been
	 *         handled and the response has been sent to the client, or displayed
	 *         if used at the client side.
	 */
	handleNotFound(params) {}

	/**
	 * Tests, if possible, whether the specified error was caused by the client's
	 * action (for example wrong URL or request encoding) or by a failure at the
	 * server side.
	 *
	 * @method isClientError
	 * @param {(Core.IMAError|Error)} reason The encountered error.
	 * @return {boolean} {@code true} if the error was caused the action of the
	 *         client.
	 */
	isClientError(reason) {}
}

ns.Core.Interface.Router = Router;
