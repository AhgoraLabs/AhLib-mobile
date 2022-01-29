import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const BookContext = createContext();

export default function BookProvider({ children }) {
    const [book, setBook] = useState({});

    const providerBook = (type, bookData) => {
        return type === "set" ? setBook(bookData) : book;
    };

    return (
        <BookContext.Provider
            value={{
                providerBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
}
export function useBookContext() {
    const context = useContext(BookContext);
    if (!context) throw new Error("useCount must be used within a CountProvider");

    const { providerBook } = context;
    return { providerBook };
}
