import React from 'react'
import InputRadio from './InputRadio'

export interface IVisualProp {
  text: string
  value: string
}

interface IProps {
  id: string
  name: string
  onChange: Function
  selectedOption: string
  title?: string
  options: IVisualProp[]
}

export default function OptionsSelector({
  id,
  name,
  onChange,
  selectedOption,
  title,
  options,
}: IProps) {
  return (
    <div className="flex flex-col my-4">
      {title && <span className="text-gray-600">{title}</span>}
      <div className="flex mt-1">
        {options.map((opt, i) => (
          <InputRadio
            {...opt}
            name={name}
            key={opt.text}
            onChange={() => {
              onChange(id, opt.value)
            }}
            selected={selectedOption === opt.value}
          />
        ))}
      </div>
    </div>
  )
}
