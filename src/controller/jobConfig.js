import * as services from '../services/jobConfig'
import { RESPONSE_CODE } from '../constant'

export async function getConfigList(ctx, next) {
	try {
		const { currPage = 1, pageSize = 20, projectName } = ctx.request.query
		const pageData = await services.findJobPage(currPage, pageSize, {
			projectName,
		})
		const total = await services.countJob({ projectName })

		ctx.state.apiResponse = {
			code: RESPONSE_CODE.SUC,
			data: {
				list: pageData,
				currPage: currPage,
				pageSize: pageSize,
				total: total,
			},
			msg: 'success!',
		}
	} catch (e) {
		ctx.state.apiResponse = {
			code: RESPONSE_CODE.ERR,
			msg: '配置分页查询失败',
		}
	}
	next()
}
