export type Table = {
    search: string
    setSort: (field: string) => void
    setOrder: (order: "asc" | "desc") => void
    setSearch: (search: string) => void
}

export type PropsTable = {
    table: Table
    onAdd: () => void
}