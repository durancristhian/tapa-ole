import classnames from 'classnames'
import React from 'react'

interface Props {
  label: string
  id: string
  onChange: React.Dispatch<React.SetStateAction<any>>
  value: string
}

function InputText({ label, id, onChange, value }: Props) {
  return (
    <label htmlFor={id} className="flex flex-col my-4 w-full">
      <span className="text-gray-600">{label}</span>
      <input
        type="text"
        className={classnames([
          'border-2 border-gray-300 mt-1 p-2 rounded',
          'focus:outline-none focus:border-gray-600',
        ])}
        name={id}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  )
}

export default InputText
