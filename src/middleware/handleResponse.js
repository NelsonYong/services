import { RESPONSE_CODE } from '../constant'

export function handleResponse() {
	return async function (ctx, next) {
		await next()
		if (!ctx.state.apiResponse) {
			ctx.body = null
			return
		}
		const { code, data, msg } = ctx.state.apiResponse
		ctx.body = getResult(code, data, msg)
	}
}

function getResult(code, data = null, msg = null) {
	const result = {
		code,
		data,
		msg,
	}
	if (code === RESPONSE_CODE.SUC) {
		result.data = data
	}

	if (code === RESPONSE_CODE.ERR) {
		result.msg = msg
	}

	console.log(result)
	return result
}
