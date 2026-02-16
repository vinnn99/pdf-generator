'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = require('@adonisjs/framework/src/Route/Manager')

/**
 * ============================================================================
 * Routes
 * ============================================================================
 *
 * Here is where you can register all of the routes for an application.
 * It is a breeze. Simply tell Adonis the URIs it should respond to
 * and give it the controller. And you're done! Build something remarkable!
 *
 */

/**
 * Render a welcome page on the "/" route
 */
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/**
 * PDF Agreement Generation Routes
 */
Route.group(() => {
  Route.post('/generate', 'DocAgreementController.generate')
}, { prefix: 'api/v1/doc_agreement' })

module.exports = Route
