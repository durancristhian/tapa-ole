import React from 'react'

interface IProps extends React.Props<HTMLDivElement> {
  tabIndex?: number
}

export default function VisuallyHidden({ children, tabIndex = 0 }: IProps) {
  return (
    <div className="visually-hidden" tabIndex={tabIndex}>
      {children}
    </div>
  )
}
