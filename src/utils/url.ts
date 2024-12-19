/**
 * @description: 带参数重定向，支持指定携带的查询参数
 * @param {string} targetURL - 目标 URL
 * @param {Array} paramsToInclude - 要包含的查询参数列表
 */
function redirectToTargetURLWithParams(targetURL, paramsToInclude = []) {
    // 获取当前页面的查询参数
    const currentSearchParams = new URLSearchParams(window.location.search);

    // 创建最终的 URL 对象
    const finalURL = new URL(targetURL, window.location.origin); // 支持相对路径

    // 如果没有传入要携带的参数，默认携带所有当前页面的查询参数
    if (paramsToInclude.length === 0) {
        currentSearchParams.forEach((value, key) => {
            finalURL.searchParams.append(key, value);
        });
    } else {
        // 只携带指定的参数
        paramsToInclude.forEach(param => {
            if (currentSearchParams.has(param)) {
                finalURL.searchParams.append(param, currentSearchParams.get(param) || '');
            }
        });
    }

    // 重定向到最终构建的 URL
    window.location.href = finalURL.toString();
}