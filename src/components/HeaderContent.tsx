import { Link } from "react-router-dom"
import Logo from '../assets/images/Logo.svg'

const HeaderContent = () => {
  return (
    <Link className="flex items-center px-[67px] py-[42px]" to={"/"}>
      <img src={Logo} alt="Logo" width={38} height={38} />
      <div className="ml-[17px]">
        <h1 className="text-[24px] leading-[19.23px] mb-[2px] font-bold">REACT PIZZA</h1>
        <p className="text-[16px] leading-[19.49px] text-[#7B7B7B]">Самая реактивная пицца</p>
      </div>
    </Link>
  )
}

export default HeaderContent