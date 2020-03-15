import React from 'react'

interface IProps {
  children: React.ReactNode
}

export default function Loading({ children = 'Cargando...' }: IProps) {
  return <div className="my-8 text-center">{children}</div>
}
