import classnames from 'classnames'
import React from 'react'
const { version } = require('../../package.json')

export default function Header() {
  return (
    <div className="border-b-2 border-gray-300 bg-gray-200">
      <div className="flex items-center justify-between max-w-3xl mx-auto px-4 py-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl uppercase">tapa-ole</h1>
          <span className="ml-4 text-sm">v{version}</span>
        </div>
        <p className="flex items-center text-sm">
          <span>por&nbsp;</span>
          <a
            className={classnames([
              'text-gray-600 underline',
              'focus:outline-none focus:shadow-outline focus:text-gray-800 hover:text-gray-800',
            ])}
            href="https://twitter.com/DuranCristhian"
            target="_blank"
            rel="noopener noreferrer"
          >
            @durancristhian
          </a>
        </p>
      </div>
    </div>
  )
}
