
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

type Order = "asc" | "desc"

export function useDataTable() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 10)
  const search = searchParams.get("search") ?? ""
  const sort = searchParams.get("sort") ?? ""
  const order = (searchParams.get("order") as Order) ?? "asc"

  const updateParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, String(value))
    router.push(`?${params.toString()}`)
  }

  const setPage = (page: number) => updateParams("page", page)
  const setLimit = (limit: number) => updateParams("limit", limit)

  const setSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("search", value)
    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }

  const setSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentSort = params.get("sort")
    const currentOrder = params.get("order")

    if (currentSort === field && currentOrder === "asc") {
      params.set("order", "desc")
    } else {
      params.set("sort", field)
      params.set("order", "asc")
    }

    router.push(`?${params.toString()}`)
  }

  const setOrder = (order: Order) => {
    updateParams("order", order)
  }

  const params = useMemo(() => {
    return { page, limit, search, sort, order }
  }, [page, limit, search, sort, order])


  const [filters, setFilters] = useState<Record<string, string>>({})
  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return {
    page,
    limit,
    search,
    sort,
    order,
    setPage,
    setLimit,
    setSearch,
    setSort,
    setOrder,
    filters,
    setFilter,
    params,
    ...filters
  }
}