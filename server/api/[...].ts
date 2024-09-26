import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // we get the runtimeconfig proxy url
  const proxyUrl = useRuntimeConfig().myProxyUrl
  // we check the path
  const path = event.path.replace(/^\/api\//, '') // /api/images/search -> images/search
  const target = joinURL(proxyUrl, path)

  // finally we proxy it!
  return proxyRequest(event, target)
})