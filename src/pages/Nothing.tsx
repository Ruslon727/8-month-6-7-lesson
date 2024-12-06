import HeaderContent from "../components/HeaderContent"
import basketImg from '../assets/images/basketImg.png'
import { useNavigate } from "react-router-dom"

const Nothing = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white p-5 rounded-md">
      <HeaderContent />
      <span className="border-b-[2px] border-slate-300 inline-block w-full"></span>
      <div className="mt-[104px] flex flex-col justify-center items-center">
        <h2 className="text-[32px] text-black font-bold mb-[10px]">Корзина пустая 😕</h2>
        <p className="text-[18px] w-[547px] text-center text-[#777777] mb-[47px]">Вероятней всего, вы не заказывали ещё пиццу.
          Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
        <img className="mb-[74px]" src={basketImg} alt="Img" width={300} height={255} />
        <button onClick={() => navigate('/')} className="w-[210px] mb-[63px] rounded-[30px] border-[2px] border-[#282828] font-semibold bg-[#282828] py-[14px] text-[16px] text-white">Вернуться назад</button>
      </div>
    </div>
  )
}

export default Nothing