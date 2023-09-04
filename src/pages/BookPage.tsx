import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Book as BookType} from "@/lib/types/Book.ts";
import {getBookById} from "@/lib/Books.ts";
import parse from 'html-react-parser';

export const BookPage = () => {
    const {id} = useParams()
    const [book, setBook] = useState<BookType>()
    useEffect(() => {
        if (!id) return
        getBookById(id).then((res) => {
            if (!res) return
            setBook(res)
        })
    }, [id])
    return (
        <div className={"flex flex-col lg:flex-row gap-x-16 gap-y-8 p-6"}>
            <img className={"w-full h-auto md:w-1/4 md:min-w-[400px] lg:w-1/3 rounded-lg drop-shadow-md"}
                 src={
                     book?.volumeInfo?.imageLinks?.medium ||
                     book?.volumeInfo?.imageLinks?.thumbnail ||
                     "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                 alt="book cover"/>
            <div>
                <p className={"opacity-50 text-sm mb-2"}>{book?.volumeInfo?.categories?.[0]}</p>
                <h1 className={"font-bold text-xl md:text-2xl mb-2"}>{book?.volumeInfo?.title}</h1>
                <p className={"opacity-50 text-sm mb-6"}>{book?.volumeInfo?.authors?.join(", ")}</p>
                <span>{parse(book?.volumeInfo?.description || "")}</span>
            </div>
        </div>
    );
};

export default BookPage