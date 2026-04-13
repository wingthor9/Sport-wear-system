"use client"

import { useState } from "react"

export function useSearch(initial = "") {
  const [search, setSearch] = useState(initial)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const clearSearch = () => {
    setSearch("")
  }

  return {
    search,
    setSearch,
    onSearchChange,
    clearSearch
  }
}