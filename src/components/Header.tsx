import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/images/Logo.svg'
import { BasketIcon } from '../assets/images/logo'
import { useSelector } from "react-redux"
import { ProductType } from "../service/Products"
import OrderButton from "./orderButton"
import { useState } from "react"
import { Input, Modal, Select } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../hook/useAxios"
import { CategoryType } from "../service/Categories"

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const orderedProducts = useSelector((state: { orderList: ProductType[] }) => state.orderList)
    const queryClinet = useQueryClient()
    const [categoryId, setCategoryId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number | null>(null)
    const [size, setSize] = useState<string[] | null>(null)


    const totalPrice = orderedProducts.reduce((val: number, item: ProductType) => {
        val += (item.price * item.orderCount)
        return val
    }, 0)
    const { data: categoryList } = useQuery({
        queryKey: ["categorySelect"],
        queryFn: () => useAxios().get("/categories").then(res => res.data.map((item: CategoryType) => ({ label: item.title, value: item.id })))
    })
    const mutation = useMutation({
        mutationFn: (data: any) => useAxios().post("/products", data),
        onSuccess: () => {
            setIsOpen(false)
            queryClinet.invalidateQueries({ queryKey: ['products'] })
        }
    })
    function handleSavePizza() {
        const data = {
            categoryId,
            imgUrl: "https://img.povar.ru/main-micro/6f/6f/d6/4a/picca_quotchizburgerquot-688938.jpg",
            name,
            type: ["тонкое", "традиционное"],
            size,
            price,
            orderCount: 0
        }
        mutation.mutate(data)
    }
    return (
        <div className="flex items-center pb-[40px] border-b-[2px] border-[#b9b9b9] justify-between">
            <Link className="flex items-center" to={"/"}>
                <img src={Logo} alt="Logo" width={38} height={38} />
                <div className="ml-[17px]">
                    <h1 className="text-[16xpx] leading-[19.23px] font-bold">REACT PIZZA</h1>
                    <p className="text-[16px] leading-[19.49px] text-[#7B7B7B]">самая вкусная пицца во вселенной</p>
                </div>
            </Link>
            <div className="flex items-center gap-5">
                <button onClick={() => navigate("/basket")} className="w-[150px] text-white rounded-[30px] flex items-center justify-center gap-[13px] cursor-pointer py-[12px] bg-[#FE5F1E]">
                    <strong className="text-[16px]">{totalPrice}₽</strong>
                    <span className="inline-block w-[2px] h-[25px] bg-[#FFFFFF40]"></span>
                    <div className="flex items-center space-x-[8px]">
                        <BasketIcon />
                        <span>{orderedProducts.length > 0 && orderedProducts.length}</span>
                    </div>
                </button>
                <OrderButton onClick={() => setIsOpen(true)} title="Add Pizza" />
            </div>
            <Modal className="!w-[600px]" onCancel={() => setIsOpen(false)} open={isOpen} onOk={handleSavePizza}>
                <div className="p-5 space-y-5">
                    <Select
                        showSearch
                        allowClear
                        className="w-full"
                        size="large"
                        placeholder="Choose category"
                        optionFilterProp="label"
                        options={categoryList}
                        onChange={(e) => setCategoryId(e)}
                    />
                    <Input value={name} className="w-full" onChange={(e) => setName(e.target.value)} size="large" placeholder="Enter Pizza name" allowClear />
                    <Input value={price ? price : ""} className="w-full" onChange={(e) => setPrice(Number(e.target.value))} size="large" type="number" placeholder="Enter Pizza price" allowClear />
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Choose size"
                        onChange={(e) => setSize(e)}
                        options={[
                            {
                                label: "26 см.",
                                value: "26 см."
                            },
                            {
                                label: "30 см.",
                                value: "30 см."
                            },
                            {
                                label: "40 см.",
                                value: "40 см."
                            }
                        ]}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Header