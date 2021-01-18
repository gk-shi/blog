import { AxiosResponse } from 'axios'
import axios from './axios'


export function getWebsiteRecordApi (): Promise<AxiosResponse> {
  return axios.get('/website')
}

export function getBlogListApi (): Promise<AxiosResponse> {
  return axios.get('/articles')
}

export function getCitysApi (): Promise<AxiosResponse> {
  return axios.get('/citys')
}

export function getBlessesApi (params: any): Promise<AxiosResponse> {
  return axios.get('/bless', { params })
}

export function publishBlessApi (data: any): Promise<AxiosResponse> {
  return axios.post('/bless', data)
}

export function getTagsApi (params?: any): Promise<AxiosResponse> {
  return axios.get('/tags', { params })
}

export function getArticleListApi (params?: any): Promise<AxiosResponse> {
  return axios.get('/articles', { params })
}

export function getArticleContentApi (id: string): Promise<AxiosResponse> {
  return axios.get(`/articles/${id}`, { params: { flag: 'site' } })
}

export function getCommentApi (params?: any): Promise<AxiosResponse> {
  return axios.get('/comments', { params })
}

export function publishCommentApi (data?: any): Promise<AxiosResponse> {
  return axios.post('/comments', data)
}
