export type Book = {
    id: string,
    volumeInfo: {
        title: string,
        description?: string,
        authors: string[],
        categories: string[],
        imageLinks?: {
            thumbnail?: string,
            medium?: string
        }
    }
}