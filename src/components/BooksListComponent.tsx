import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {Button} from "@components/ui/button.tsx";
import {getBooks} from "@/lib/Books.ts";
import {addBooks, incrementStartIndex} from "@/store/reducers/BooksReducer.ts";
import {useState} from "react";
import {ReactComponent as IconRefresh} from "@/assets/icons/refresh.svg";
import {Link} from "react-router-dom";

const BooksListComponent = () => {
    const dispatch = useAppDispatch()
    const books = useAppSelector(state => state.books.value)
    const lastRequestString = useAppSelector(state => state.books.lastRequestString)
    const startIndex = useAppSelector(state => state.books.startIndex)
    const totalFound = useAppSelector(state => state.books.totalFound)
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
            <h2 className={`text-center mb-6 ${totalFound !== 0 ? "block":"hidden"}`}>Total found: {totalFound}</h2>
            <div className={"grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"}>
                {
                    books.map((book, i) => (
                        <Link to={`book/${book.id}`} className={"bg-slate-200 p-4 rounded-md"} key={i+book.id}>
                            <img src={book.volumeInfo.imageLinks?.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                                 alt="book-cover"
                                 className={"mx-auto p-4 h-full drop-shadow-md"}
                            />

                            <span className={"underline opacity-50 text-sm mb-1"}>{book.volumeInfo.categories?.[0]}</span>
                            <h3 className={"font-bold"}>{book.volumeInfo.title}</h3>
                            <span className={"opacity-50 text-sm mb-1"}>{book.volumeInfo.authors?.join(", ")}</span>
                        </Link>
                    ))
                }
            </div>
            <Button
                disabled={isLoading}
                onClick={handleLoadMore}
                className={`mx-auto mt-2 ${books.length !== 0 ? "block":"hidden"}`}
            >
                {isLoading ? <IconRefresh className={"animate-spin h-5 w-5 stroke-white"}/>:"Load more..."}
            </Button>
        </>
    )

    function handleLoadMore() {
        setIsLoading(true)
        getBooks(lastRequestString.search, lastRequestString.category, lastRequestString.sort, startIndex+30)
            .then((res)=>{
                if (!res) return
                dispatch(incrementStartIndex())
                dispatch(addBooks(res?.books))
            })
            .finally(() => setIsLoading(false))
    }
};

export default BooksListComponent;