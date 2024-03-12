


// 调用函数并传入目标 URL 和要包含的参数列表
// redirectToTargetURLWithParams("https://test.xboxcsgo.com", ["token"]);

/**
 * @description: 携带参数重定向(可以指定携带参数)
 * @param {*} targetURL
 * @param {*} paramsToInclude
 * @return {*}
 */
function redirectToTargetURLWithParams(targetURL, paramsToInclude = []) {
    // 获取当前页面的 URL
    const currentURL = window.location.href;

    // 提取当前页面的查询参数部分
    const searchParamsIndex = currentURL.indexOf('?');
    const currentSearchParams = searchParamsIndex !== -1 ? currentURL.slice(searchParamsIndex) : '';

    // 构建最终的重定向 URL
    let finalURL = targetURL;

    // 检查是否要包含特定的查询参数
    if (paramsToInclude.length > 0) {
        const searchParams = new URLSearchParams(currentSearchParams);

        // 循环遍历传入的参数，如果存在则添加到新的查询参数中
        paramsToInclude.forEach(param => {
            if (searchParams.has(param)) {
                if (finalURL.includes('?')) {
                    finalURL += `&${param}=${searchParams.get(param)}`;
                } else {
                    finalURL += `?${param}=${searchParams.get(param)}`;
                }
            }
        });
    } else {
        // 如果没有传入参数，则默认携带所有当前页面的查询参数
        finalURL += currentSearchParams;
    }

    // 重定向到最终 URL
    window.location.href = finalURL;
}