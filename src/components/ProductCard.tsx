import { Segmented } from 'antd'
import React, { SetStateAction, useState } from 'react'
import { ProductType } from '../service/Products'
import { AddIcon } from '../assets/images/logo'
import { useDispatch } from 'react-redux'
import { saveOrderProducts } from '../store/orderSlice'
import OrderButton from './orderButton'

interface ProductCardType {
  item: ProductType
  getAllProducts: ProductType[]
  setGetAllProducts: React.Dispatch<SetStateAction<ProductType[]>>
}

const ProductCard: React.FC<ProductCardType> = ({ item, getAllProducts, setGetAllProducts }) => {
  const dispatch = useDispatch()
  const [type, setType] = useState<string>('тонкое')
  const [size, setSize] = useState<string>(item.size[0])

  function SegmentedOption(arr: string[]): any {
    const list = [
      { label: '26 см.', value: '26 см.', disabled: true },
      { label: '30 см.', value: '30 см.', disabled: true },
      { label: '40 см.', value: '40 см.', disabled: true }]
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] == list[i].label) {
          list[i].disabled = false
        }
      }
    }
    return list
  }
  function handleOrderBtnClick() {
    let data = { ...item, orderCount: item.orderCount + 1 }
    setGetAllProducts(
      getAllProducts.map((value: ProductType) => (value.id === item.id ? data : value)))
    dispatch(saveOrderProducts({ ...data, type: [type], size: [size] }))
  }
  return (
    <div className='w-[280px] flex flex-col border-[2px] rounded-md items-center'>
      <img className='imgUrl mb-[11px] rounded-md' src={item.imgUrl} alt="img" width={260} height={260} />
      <h2 className='text-[20px] mb-[22px] font-bold'>{item.name}</h2>
      <Segmented<string> options={['тонкое', 'традиционное']} onChange={(e) => setType(e)} />
      <Segmented<string> className='mb-[17px]' options={SegmentedOption(item.size)} onChange={(e) => setSize(e)} />
      <div onClick={handleOrderBtnClick} className='flex items-center gap-[20px] mb-[20px] flex-nowrap'>
        <strong className='text-[22px] flex-shrink-0'>от {item.price} ₽</strong>
        <OrderButton title="Добавить" leftIcon={<AddIcon />} orderCount={item.orderCount} />
      </div>
    </div>
  )
}
export default ProductCard
