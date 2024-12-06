import { useContext, useEffect, useState } from "react"
import { Context } from "../Context/Context"
import { useQuery } from "@tanstack/react-query"
import { useAxios } from "../hook/useAxios"
import ProductCard from "../components/ProductCard"
import { useSelector } from "react-redux"

export interface ProductType {
    id: string
    categoryId: string
    imgUrl: string
    name: string
    type: string[]
    size: string[]
    price: number
    orderCount: number
}
function Products() {
    const { categoryId } = useContext(Context)
    const orderList = useSelector((state: { orderList: ProductType[] }) => state.orderList)
    const { data: products = [] } = useQuery({
        queryKey: ["products", categoryId],
        queryFn: () => useAxios().get(`/products`, { params: { categoryId } }).then((res) => res.data)
    })
    const [getAllProducts, setGetAllProducts] = useState<ProductType[]>(products)
    useEffect(() => {
        setGetAllProducts(products)
    }, [products])
    useEffect(() => {
        const updateProducts = getAllProducts.map((products) => {
            const orderProduct = orderList.find((item) => item.id == products.id)
            return { ...products, orderCount: orderProduct ? orderProduct.orderCount : 0 }
        })
        setGetAllProducts(updateProducts)
    }, [])
    return (
        <>
            <h1 className="mt-[32px] mb-[35px] font-bold text-black text-[32px]">Все пиццы</h1>
            <div className="flex justify-between gap-[35px] flex-wrap">
                {getAllProducts.map((item: ProductType) => (
                    <ProductCard key={item.id} item={item} getAllProducts={getAllProducts} setGetAllProducts={setGetAllProducts} />
                ))}
            </div>
        </>
    )
}

export default Products