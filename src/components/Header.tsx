import React from 'react'
const { version } = require('../../package.json')

export default function Header() {
  return (
    <div className="border-b-2 border-gray-300 bg-gray-200 flex items-center justify-center px-4 py-2">
      <h1 className="font-bold text-2xl uppercase">tapa-ole</h1>
      <span className="ml-4">v{version}</span>
    </div>
  )
}
