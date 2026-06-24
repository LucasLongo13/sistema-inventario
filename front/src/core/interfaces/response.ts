export interface Pagination {
    limit: number
    nextPage: number
    page: number
    previousPage: number
    totalItems: number
    totalPages: number
}

export interface ResponseData<T> {
    data: T
    pagination: Pagination
}