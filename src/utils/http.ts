/*
 * @Date: 2024-03-21
 * @Description: 基于 fetch 的 HTTP 请求工具
 */

interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  data?: any;
}

class Http {
  private config: RequestConfig = {
    timeout: 10000, // 10s
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  private requestInterceptors: ((config: RequestOptions) => RequestOptions)[] = [];
  private responseInterceptors: ((response: Response) => Promise<any>)[] = [];

  constructor(config?: RequestConfig) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  // 添加请求拦截器
  interceptors = {
    request: {
      use: (interceptor: (config: RequestOptions) => RequestOptions) => {
        this.requestInterceptors.push(interceptor);
      }
    },
    response: {
      use: (interceptor: (response: Response) => Promise<any>) => {
        this.responseInterceptors.push(interceptor);
      }
    }
  };

  // 处理请求配置
  private async handleRequest(url: string, options: RequestOptions): Promise<RequestOptions> {
    let config: RequestOptions = {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers
      }
    };

    // 处理请求拦截器
    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config);
    }

    // 处理 URL 参数
    if (config.params) {
      const params = new URLSearchParams();
      Object.entries(config.params).forEach(([key, value]) => {
        params.append(key, String(value));
      });
      url += `?${params.toString()}`;
    }

    return config;
  }

  // 处理响应
  private async handleResponse(response: Response): Promise<any> {
    // 处理响应拦截器
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  // 发送请求
  private async request(url: string, options: RequestOptions): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const config = await this.handleRequest(url, options);
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      return this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // GET 请求
  get(url: string, options: RequestOptions = {}): Promise<any> {
    return this.request(url, { ...options, method: 'GET' });
  }

  // POST 请求
  post(url: string, data?: any, options: RequestOptions = {}): Promise<any> {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT 请求
  put(url: string, data?: any, options: RequestOptions = {}): Promise<any> {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE 请求
  delete(url: string, options: RequestOptions = {}): Promise<any> {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

// 创建默认实例
const http = new Http();

// 添加默认响应拦截器
http.interceptors.response.use(async (response) => {
  const data = await response.json();
  return data;
});

export default http; 