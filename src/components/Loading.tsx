import React from 'react'

interface Props {
  message?: string
}

export default function Loading({ message = 'Cargando...' }: Props) {
  return (
    <div className="my-4 text-center">
      <p>{message}</p>
    </div>
  )
}
