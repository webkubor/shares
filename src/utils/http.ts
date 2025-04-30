/*
 * @Date: 2024-03-21
 * @Description: 基于 fetch 的 HTTP 请求工具
 */

// 请求配置接口
interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

// 请求选项接口
interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  data?: any;
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer';
}

// 响应数据接口
interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 请求错误接口
interface RequestError extends Error {
  status?: number;
  response?: Response;
}

class Http {
  private config: RequestConfig = {
    timeout: 10000, // 10s
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
  };

  private requestInterceptors: ((config: RequestOptions) => RequestOptions)[] = [];
  private responseInterceptors: ((response: Response) => Promise<any>)[] = [];
  private errorInterceptors: ((error: RequestError) => Promise<any>)[] = [];

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
    },
    error: {
      use: (interceptor: (error: RequestError) => Promise<any>) => {
        this.errorInterceptors.push(interceptor);
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
      },
      credentials: this.config.withCredentials ? 'include' : 'same-origin'
    };

    // 处理请求拦截器
    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config);
    }

    // 处理 URL 参数
    if (config.params) {
      const params = new URLSearchParams();
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      url += `?${params.toString()}`;
    }

    // 处理 baseURL
    if (this.config.baseURL) {
      url = `${this.config.baseURL}${url}`;
    }

    return config;
  }

  // 处理响应
  private async handleResponse<T>(response: Response, responseType?: string): Promise<T> {
    // 处理响应拦截器
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    if (!response.ok) {
      const error: RequestError = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.response = response;
      throw error;
    }

    // 根据响应类型返回数据
    switch (responseType) {
      case 'text':
        return response.text() as Promise<T>;
      case 'blob':
        return response.blob() as Promise<T>;
      case 'arrayBuffer':
        return response.arrayBuffer() as Promise<T>;
      default:
        return response.json() as Promise<T>;
    }
  }

  // 处理错误
  private async handleError(error: RequestError): Promise<any> {
    // 处理错误拦截器
    for (const interceptor of this.errorInterceptors) {
      try {
        return await interceptor(error);
      } catch (e) {
        error = e as RequestError;
      }
    }
    throw error;
  }

  // 发送请求
  private async request<T>(url: string, options: RequestOptions): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const config = await this.handleRequest(url, options);
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      return this.handleResponse<T>(response, options.responseType);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      return this.handleError(error as RequestError);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // GET 请求
  get<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  // POST 请求
  post<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT 请求
  put<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE 请求
  delete<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  // PATCH 请求
  patch<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // 上传文件
  upload<T = any>(url: string, file: File, options: RequestOptions = {}): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        ...options.headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

// 创建默认实例
const http = new Http();

// 添加默认响应拦截器
http.interceptors.response.use(async (response) => {
  const data = await response.json();
  return data;
});

// 添加默认错误拦截器
http.interceptors.error.use(async (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

export default http; 


// GET 请求
// const getData = async () => {
//     try {
//       const response = await http.get<ResponseData<User>>('/users', {
//         params: { id: 1 }
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   // POST 请求
//   const createUser = async (userData: User) => {
//     try {
//       const response = await http.post<ResponseData>('/users', userData);
//       console.log(response.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   // PUT 请求
//   const updateUser = async (id: number, userData: User) => {
//     try {
//       const response = await http.put<ResponseData>(`/users/${id}`, userData);
//       console.log(response.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   // DELETE 请求
//   const deleteUser = async (id: number) => {
//     try {
//       const response = await http.delete<ResponseData>(`/users/${id}`);
//       console.log(response.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };

// const uploadFile = async (file: File) => {
//     try {
//       const response = await http.upload<ResponseData<{ url: string }>>('/upload', file);
//       console.log(response.data.url);
//     } catch (error) {
//       console.error(error);
//     }
//   };