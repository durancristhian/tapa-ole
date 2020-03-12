import React from 'react'

interface IProps {
  message?: string
}

export default function Loading({ message = 'Cargando...' }: IProps) {
  return (
    <div className="my-4 text-center">
      <p>{message}</p>
    </div>
  )
}
