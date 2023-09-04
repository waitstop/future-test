import {Book} from "@/lib/types/Book.ts";

export async function getBooks(search: string, category: string, sort: string, startIndex: number = 0, maxResults: number = 20): Promise< {books: Book[], totalItems: number} | null> {
    const requestString = `https://www.googleapis.com/books/v1/volumes?q=${search}${category !== 'all' ? `+subject:${category}` : ''}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sort}&fields=items(id, volumeInfo(title, description, authors, categories, imageLinks/thumbnail, imageLinks/medium)), totalItems`

    return fetch(requestString)
        .then(async res => {
            const {items: books, totalItems}: { items: Book[], totalItems: number } = await res.json()
            return {books, totalItems}
        })
        .catch(() => {
            return null
        })
}

export async function getBookById(id: string): Promise<Book | null> {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?fields=id,volumeInfo(title, description, authors, categories, imageLinks/thumbnail, imageLinks/medium)&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
    if(!res.ok) return null
    return {...await res.json()}
}