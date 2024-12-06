import React, { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContexType {
    categoryId: string | null,
    setCategoryId: React.Dispatch<SetStateAction<null | string>>
}

export const Context = createContext<ContexType>({
    categoryId: null,
    setCategoryId: () => ""
})

export const ProductContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<string | null>(null)

    return (
        <Context.Provider value={{ categoryId, setCategoryId }}>{children}</Context.Provider>
    )
}