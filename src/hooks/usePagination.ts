"use client"

import { useState } from "react"

export const usePagination = (initialPage = 1) => {

    const [page, setPage] = useState(initialPage)

    const goToPage = (p: number) => setPage(p)

    const nextPage = () => setPage((p) => p + 1)

    const prevPage = () => setPage((p) => Math.max(1, p - 1))

    return {
        page,
        setPage,
        goToPage,
        nextPage,
        prevPage
    }
}