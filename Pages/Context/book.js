import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const BookContext = createContext();

import { getBooks } from "../../api/api";

export default function BookProvider({ children }) {
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);
    const [bookList, setBookList] = useState({});

    const fetchBookList = async () => {
        try {
            const response = await getBooks();
            setBookList(response);
        } catch (err) {
            console.log(err);
        }
    };

    const setBookContext = async data => {
        setBook(data);
    };

    const providerComments = (type, data) => {
        return type === "set" ? setComments(data) : comments;
    };

    return (
        <BookContext.Provider
            value={{
                setBookContext,
                providerComments,
                fetchBookList,
                bookList,
                book,
            }}
        >
            {children}
        </BookContext.Provider>
    );
}
export function useBookContext() {
    const context = useContext(BookContext);
    if (!context) throw new Error("useCount must be used within a CountProvider");

    const {
        setBookContext, //functions
        providerComments,
        fetchBookList,
        bookList,
        book, //states
    } = context;
    return { setBookContext, providerComments, fetchBookList, bookList, book };
}
