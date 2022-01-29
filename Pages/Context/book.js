import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const BookContext = createContext();

export default function BookProvider({ children }) {
    const [book, setBook] = useState({});
    const [comments, setComments] = useState({});

    const providerBook = (type, data) => {
        return type === "set" ? setBook(data) : book;
    };

    const providerComments = (type, data) => {
        return type === "set" ? setComments(data) : comments;
    };

    return (
        <BookContext.Provider
            value={{
                providerBook,
                providerComments,
            }}
        >
            {children}
        </BookContext.Provider>
    );
}
export function useBookContext() {
    const context = useContext(BookContext);
    if (!context) throw new Error("useCount must be used within a CountProvider");

    const { providerBook, providerComments } = context;
    return { providerBook, providerComments };
}
