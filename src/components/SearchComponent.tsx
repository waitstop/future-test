import React, {useState} from 'react';
import {getBooks} from "@/lib/Books.ts";
import {Input} from "@components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@components/ui/select.tsx";
import {Button} from "@components/ui/button.tsx";
import {ReactComponent as IconRefresh} from '@assets/icons/refresh.svg'
import {useAppDispatch} from "@/store/hooks.ts";
import {addBooks, resetSearch, setLastRequestString, setTotalFound} from "@/store/reducers/BooksReducer.ts";

const categories = [
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry'
]
const sorts = [
    'relevance',
    'newest'
]

const SearchComponent = () => {
    const [searchCategory, setSearchCategory] = useState<string>(categories[0])
    const [searchInput, setSearchInput] = useState<string>("")
    const [searchSort, setSearchSort] = useState<string>(sorts[0])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    return (
        <div>
            <div className={"px-4 py-12"}>
                <h1 className={"text-2xl font-bold text-center mb-6"}>
                    Search for books
                </h1>
                <form onSubmit={handleSubmit}
                      className="flex flex-col w-full max-w-lg items-center space-y-2 mx-auto">
                    <Input onChange={(e) => setSearchInput(e.target.value)}
                           placeholder={"Search..."}
                           type={"text"}
                           required
                           value={searchInput}/>

                    <Select onValueChange={e => setSearchCategory(e)}
                            value={searchCategory}
                            required>
                        <SelectTrigger className={"capitalize"}>
                            <SelectValue placeholder={"Category"}/>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem className={"capitalize"} key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={e => setSearchSort(e)}
                            value={searchSort}
                            required>
                        <SelectTrigger className={"capitalize"}>
                            <SelectValue placeholder={"Sort by..."}/>
                        </SelectTrigger>
                        <SelectContent>
                            {sorts.map((sort) => (
                                <SelectItem className={"capitalize"} key={sort} value={sort}>
                                    {sort}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button disabled={isLoading} className={"w-full"} type="submit">{isLoading ?
                        <IconRefresh className={"animate-spin stroke-white h-6"}/> : 'Search'}</Button>
                </form>
            </div>
        </div>
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!(searchInput || searchCategory || searchSort)) return
        dispatch(resetSearch())
        dispatch(setLastRequestString({
            search: searchInput,
            category: searchCategory,
            sort: searchSort
        }))
        setIsLoading(true)
        getBooks(searchInput, searchCategory, searchSort)
            .then(res => {
                if(!res) return
                dispatch(addBooks(res.books))
                dispatch(setTotalFound(res.totalItems))
            })
            .finally(() => setIsLoading(false))
    }
};

export default SearchComponent;