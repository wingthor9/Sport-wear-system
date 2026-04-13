"use client"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,} from "@/components/ui/pagination"
interface Props {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function AppPagination({ page, totalPages, onPageChange }: Props) {
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages, page + 1)
    const pages = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
    )

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (page > 1) onPageChange(page - 1)
                        }}
                    />
                </PaginationItem>
                {/* Page Numbers */}
                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href="#"
                            isActive={p === page}
                            onClick={(e) => {
                                e.preventDefault()
                                onPageChange(p)
                            }}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (page < totalPages) onPageChange(page + 1)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}