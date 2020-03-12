import React, { useState } from 'react'
import InputRadio from './InputRadio'

interface Theme {
  text: string
  value: string
}

interface Props {
  currentTheme: Theme
  setTheme: Function
  themes: Theme[]
}

export default function Themes({ themes, currentTheme, setTheme }: Props) {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-center text-xl uppercase">
        Color del título
      </h2>
      <div className="flex justify-center mt-4">
        {themes.map((theme, i) => (
          <InputRadio
            {...theme}
            name="theme"
            key={i}
            onChange={() => setTheme(theme)}
            selected={currentTheme.value === theme.value}
          />
        ))}
      </div>
    </div>
  )
}
