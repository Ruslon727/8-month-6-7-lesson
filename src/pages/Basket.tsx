import { useDispatch, useSelector } from "react-redux"
import { ProductType } from "../service/Products"
import { AddIcon, BtnLogo, ClearIcon, KorzinaIcon } from "../assets/images/logo"
import { deleteOrderProduct, incrementOrderCount, decrementOrderCount, clearOrderList } from "../store/orderSlice"
import { useNavigate } from "react-router-dom"
import HeaderContent from "../components/HeaderContent"
import { useEffect } from "react"

const Basket = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderProducts = useSelector(
    (state: { orderList: ProductType[] }) => state.orderList
  )
  useEffect(() => {
    if (orderProducts.length == 0) {
      navigate('/nothing')
    }
  }, [orderProducts, navigate])
  const totalPrice = orderProducts.reduce((val: number, item: ProductType) => {
    val += item.price * item.orderCount
    return val
  }, 0)
  return (
    <div className="bg-white p-5 rounded-md">
      <div>
        <HeaderContent />
        <span className="border-b-[2px] mb-[20px] border-slate-300 inline-block w-full"></span>
        <div className="flex items-center justify-between w-[900px] mx-auto">
          <strong className="flex items-center gap-[7px] text-[32px] text-black font-bold">
            <KorzinaIcon />
            Корзина
          </strong>
          <button onClick={() => dispatch(clearOrderList())} className="flex hover:scale-[1.1] duration-300 items-center space-x-2 text-[#B6B6B6]">
            <ClearIcon />
            <span>Очистить корзину</span>
          </button>
        </div>
        <ul className="w-[900px] space-y-5 mx-auto mt-[50px]">
          {orderProducts.map((item: ProductType) => (
            <li key={item.id} className="flex  items-center gap-[15px] justify-between">
              <div className="flex items-center space-x-[15px]">
                <img src={item.imgUrl} alt="img" width={80} height={80} />
                <div>
                  <h2 className="text-[22px] font-bold">{item.name}</h2>
                  <p className="text-[16px] text-[#8D8D8D]">{item.type[0]} тесто, {item.size[0]}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-[38px] h-[38px] flex items-center justify-center rounded-full border-[2px] border-[#FE5F1E] text-[#FE5F1E] text-[22px] font-bold" onClick={() => dispatch(decrementOrderCount(item.id))}>-</button>
                <strong className="text-[22px] font-bold ">{item.orderCount}</strong>
                <button className="w-[38px] h-[38px] flex items-center justify-center rounded-full border-[2px] border-[#FE5F1E] text-[#FE5F1E] text-[22px] font-bold" onClick={() => dispatch(incrementOrderCount(item.id))}>+</button>
              </div>
              <strong>{item.price * item.orderCount}₽</strong>
              <button onClick={() => dispatch(deleteOrderProduct(item.id))} className="rotate-[45deg] rounded-full flex items-center justify-center w-[22px] h-[22px] text-[#D7D7D7] border-[1px] border-[#D7D7D7]"><AddIcon /></button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between w-[900px] mx-auto mt-10">
          <p className="font-semibold text-[20px]">
            Всего пицц: <span className="font-bold text-[18px] text-black">{orderProducts.length}</span> шт.
          </p>
          <p className="text-[26px] font-semibold">
            Сумма заказа: <span className="font-bold text-[22px] text-[#FE5F1E]">{totalPrice}</span> ₽
          </p>
        </div>
        <div className="flex items-center py-[42px] gap-[498px] w-[900px] mx-auto mt-10">
          <button onClick={() => navigate(-1)} className="w-[211px] hover:scale-[0.9] duration-300 border-[2px] gap-[7px] text-[#CACACA] flex items-center justify-center rounded-[30px] border-[#D3D3D3] py-[18px] text-[16px]">
            <BtnLogo />
            Вернуться назад
          </button>
          <button className="w-[211px] py-[18px] hover:bg-white hover:text-[#FE5F1E] duration-300 rounded-[30px] border-[2px] border-[#FE5F1E] bg-[#FE5F1E] text-[16px] text-[#FFFFFF]">
            Оплатить сейчас
          </button>
        </div>
      </div>
    </div>
  )
}
export default Basket
