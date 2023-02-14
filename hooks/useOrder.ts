'use client'

import useSWR from 'swr'

interface OrdersResponse {
  Content: []
  Count: number
  TotalCount: number
  ItemsPerPage: number
  StatusCode: number
  Success: boolean
  Message: unknown
  ValidationErrors: {}
}

const CE_REST_API = process.env.NEXT_PUBLIC_CE_REST_API
const CE_API_KEY = process.env.NEXT_PUBLIC_CE_API_KEY

// wrapper of native fetch
const fetcher = (...args) => fetch(...args).then((res) => res.json())

/**
 * Custom hook to fetch Orders
 * @param page
 * @param statuses
 * @returns OrdersResponse
 */
const useOrder = (page: number, statuses = []) => {
  const statusQuery = statuses.map((status) => `statuses=${status}`).join('&')
  const url = `${CE_REST_API}orders?apikey=${CE_API_KEY}&page=${page}&${statusQuery}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  // if (data?.StatusCode !== 200) return { isError: data?.Message }

  const orders = data?.Content.map((order) => {
    return {
      key: order.Id,
      ...order,
    } as OrdersResponse
  })

  return {
    orders,
    pagination: {
      count: data?.Count,
      total: data?.TotalCount,
      pageSize: data?.ItemsPerPage,
    },
    isLoading,
    isError: error,
  }
}

export default useOrder
