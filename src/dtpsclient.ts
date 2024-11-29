import { Api, HttpClient } from "./dtpsApi"
import CryptoJS from "crypto-js"

interface DTPSInitConfig {
  url: string
  apiKey: string
  apiSecret: string
}

const generateSignature = (secret: string, path: string, data: any) => {
  let message = path
  if (data) {
    message += data
  }

  const signature = CryptoJS.HmacSHA256(message, secret)
  return CryptoJS.enc.Hex.stringify(signature)
}

export class DTPSClient {
  init(config: DTPSInitConfig) {
    const httpClient = this.generateHTTPClient(config)
    const api = new Api(httpClient)
    return api
  }

  private generateHTTPClient({ url, apiKey, apiSecret }: DTPSInitConfig) {
    const httpClient = new HttpClient({
      baseURL: url,
    })
    httpClient.instance.interceptors.request.use(
      (config) => {
        //@ts-ignore
        const fullURL = config.baseURL + config.url
        if (config.data) {
          config.data = JSON.stringify(config.data)
        }
        const urlObj = new URL(fullURL)
        const signature = generateSignature(
          apiSecret,
          urlObj.pathname,
          config.data
        )
        config.headers["X-Api-Key"] = apiKey
        config.headers["X-Api-Signature"] = signature
        return config
      },
      (error) => {
        // Handle the error
        return Promise.reject(error)
      }
    )

    httpClient.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error?.response?.data || "")
      }
    )

    return httpClient
  }
}
