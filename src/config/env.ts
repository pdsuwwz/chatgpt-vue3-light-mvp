const isDev = import.meta.env.DEV

/**
 * TODO: 若是 Github 演示部署环境，则仅模拟大模型相关策略，不调接口
 */
export const isGithubDeployed = process.env.VITE_ROUTER_MODE === 'hash'

