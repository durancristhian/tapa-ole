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
      htmlFor={`${name}-${text}`}
      className={classnames([
        'border-2 border-gray-300 cursor-pointer flex items-center mr-4 px-4 py-2 rounded',
        'focus-within:border-gray-600 focus-within:outline-none focus-within:shadow-outline hover:border-gray-600',
        selected ? 'bg-gray-300 border-gray-600' : null,
      ])}
    >
      <input
        className="visually-hidden"
        id={`${name}-${text}`}
        name={name}
        onChange={() => {
          onChange()
        }}
        type="radio"
        value={value}
      />
      {selected && (
        <span className="mr-2">
          <FiCheck />
        </span>
      )}
      <span>{text}</span>
    </label>
  )
}
