import classnames from 'classnames'
import React from 'react'
import { FiCheck } from 'react-icons/fi'
import VisuallyHidden from './VisuallyHidden'

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
        'bg-white border-2 border-gray-300 cursor-pointer flex items-center mr-4 px-4 py-2 rounded',
        'focus-within:border-gray-600 focus-within:outline-none focus-within:shadow-outline hover:border-gray-600',
        selected ? 'bg-gray-300 border-gray-600' : null,
      ])}
    >
      <VisuallyHidden tabIndex={-1}>
        <input
          id={`${name}-${text}`}
          name={name}
          onChange={() => {
            onChange()
          }}
          type="radio"
          value={value}
        />
      </VisuallyHidden>
      {selected && <FiCheck />}
      <span>&nbsp;&nbsp;{text}</span>
    </label>
  )
}
