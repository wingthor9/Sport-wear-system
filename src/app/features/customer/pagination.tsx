import { Button } from "@/components/ui/button"

interface Props {
    page: number
    total: number
    setPage: (p: number) => void
}

export default function Pagination({
    page,
    total,
    setPage
}: Props) {

    return (
        <div className="flex justify-end gap-2 mt-6">

            <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </Button>

            <Button
                variant="outline"
                disabled={page === total}
                onClick={() => setPage(page + 1)}
            >
                Next
            </Button>

        </div>
    )
}