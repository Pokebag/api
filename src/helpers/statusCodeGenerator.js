/**
 * Middleware that sets a reasonable status code if one has not been set.
 *
 * @param {*} context
 * @param {*} next
 */
export async function statusCodeGenerator (context, next) {
	await next()

	if (!context.status) {
		if (context.body.data) {
			context.status = 200
		} else if (context.body.errors) {
			context.status = 500
		} else {
			context.status = 204
		}
	}
}
