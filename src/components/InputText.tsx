import classnames from 'classnames'
import React from 'react'

interface IProps {
  id: string
  label: string
  onChange: Function
  value: string
}

export default function InputText({ id, label, onChange, value }: IProps) {
  return (
    <label htmlFor={id} className="flex flex-col my-8">
      <span className="text-gray-600">{label}</span>
      <input
        type="text"
        className={classnames([
          'border-2 border-gray-300 mt-1 p-2 rounded',
          'focus:border-gray-600 focus:outline-none focus:shadow-outline hover:border-gray-600',
        ])}
        id={id}
        value={value}
        onChange={e => onChange(id, e.target.value)}
      />
    </label>
  )
}
