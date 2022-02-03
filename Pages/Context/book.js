import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const BookContext = createContext();

import { getBooks } from "../../api/api";

export default function BookProvider({ children }) {
    const [book, setBook] = useState({});
    const [comments, setComments] = useState({});
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
        console.log("slc");
        setBook(data);
    };

    const setCommentsContext = (type, data) => {
        return type === "set" ? setComments(data) : comments;
    };

    return (
        <BookContext.Provider
            value={{
                setBookContext,
                setCommentsContext,
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
        setCommentsContext,
        fetchBookList,
        bookList,
        book, //states
        comments,
    } = context;
    return { setBookContext, setCommentsContext, fetchBookList, bookList, book, comments };
}
