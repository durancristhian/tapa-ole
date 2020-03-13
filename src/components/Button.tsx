import classnames from 'classnames'
import React from 'react'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean
  type: 'button' | 'submit' | 'reset' | undefined
}

export default function Button({
  children,
  disabled = false,
  type,
  ...rest
}: IProps) {
  return (
    <button
      type={type}
      className={classnames([
        'bg-orange-200 border-2 border-orange-400 px-4 py-2 rounded text-orange-600',
        'focus:bg-orange-300 focus:border-orange-500 focus:outline-none focus:shadow-outline focus:text-orange-700',
        'duration-150 ease-in-out transition',
        'disabled:opacity-50',
      ])}
      disabled={disabled}
      {...rest}
    >
      <span className="flex items-center w-full">{children}</span>
    </button>
  )
}
