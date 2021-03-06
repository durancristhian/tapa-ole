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
    <div className="flex flex-col my-8">
      {title && <span className="text-gray-600">{title}</span>}
      <div className="overflow-auto whitespace-no-wrap">
        {options.map(opt => (
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
