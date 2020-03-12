import classnames from 'classnames'
import React from 'react'
import { FiCheck } from 'react-icons/fi'

interface IProps {
  name: string
  onChange: Function
  selected: boolean
  text: string
  value: string
}

export default function InputRadio({
  name,
  onChange,
  selected,
  text,
  value,
}: IProps) {
  return (
    <label
      htmlFor={value}
      className={classnames([
        'border-2 border-gray-300 cursor-pointer flex items-center mr-4 px-4 py-2 rounded',
        selected ? 'bg-gray-300 border-gray-600' : null,
      ])}
    >
      <input
        className="visually-hidden"
        type="radio"
        name={name}
        id={value}
        onChange={() => onChange()}
      />
      {selected && <FiCheck />}
      <p className="ml-2">{text}</p>
    </label>
  )
}
