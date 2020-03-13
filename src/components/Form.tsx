import React, { useState, useEffect } from 'react'
import InputImage from './InputImage'
import InputText from './InputText'
import OptionsSelector from './OptionsSelector'

interface IProps {
  updatePreview: Function
}

export default function Form({ updatePreview }: IProps) {
  const [formData, setFormData] = useState<IFormData>(defaultFormData)

  const onFieldChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  useEffect(() => {
    updatePreview(formData)
  }, [formData])

  return (
    <>
      <InputText
        id="title"
        label="Título"
        onChange={onFieldChange}
        value={formData.title}
      ></InputText>
      <OptionsSelector
        id="titleSize"
        name="titleSize"
        onChange={onFieldChange}
        selectedOption={formData.titleSize}
        title="Tamaño del título"
        options={TITLE_SIZES}
      />
      <OptionsSelector
        id="titleColor"
        name="titleColor"
        onChange={onFieldChange}
        selectedOption={formData.titleColor}
        title="Color del título"
        options={TITLE_COLORS}
      />
      <InputText
        id="subtitle"
        label="Bajada"
        onChange={onFieldChange}
        value={formData.subtitle}
      ></InputText>
      <InputImage
        id="background"
        image={formData.background}
        label="Fondo"
        onChange={onFieldChange}
      ></InputImage>
    </>
  )
}

export interface IFormData {
  background: string
  title: string
  titleColor: string
  titleSize: string
  subtitle: string
}

const TITLE_COLORS = [
  {
    text: 'Clásico',
    value: '#b1c903',
  },
  {
    text: 'Alternativo',
    value: '#faaf00',
  },
]

const TITLE_SIZES = [
  {
    text: 'Grande',
    value: '150px',
  },
  {
    text: 'Mediano',
    value: '115px',
  },
  {
    text: 'Chico',
    value: '90px',
  },
]

export const defaultFormData = {
  background: '',
  title: '',
  titleColor: TITLE_COLORS[0].value,
  titleSize: TITLE_SIZES[0].value,
  subtitle: '',
}
