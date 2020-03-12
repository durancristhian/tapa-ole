import React, { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import Button from './Button'
import InputImage from './InputImage'
import InputText from './InputText'

function Step1() {
  const form = JSON.parse(localStorage.getItem('form') || '{}')

  const [title, setTitle] = useState(form.title || '')
  const [subtitle, setSubtitle] = useState(form.subtitle || '')
  const [background, setBackground] = useState(form.background || '')
  const history = useHistory()

  const canSubmit = Boolean(title && subtitle && background)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (canSubmit) {
      history.push('/preview')
    }
  }

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem('form') || '{}')
    const newForm = {
      ...form,
      background,
      subtitle,
      title,
    }

    localStorage.setItem('form', JSON.stringify(newForm))
  }, [title, subtitle, background])

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        label="Título"
        id="title"
        value={title}
        onChange={setTitle}
      ></InputText>
      <InputText
        label="Bajada"
        id="subtitle"
        value={subtitle}
        onChange={setSubtitle}
      ></InputText>
      <InputImage
        label="Fondo"
        id="background"
        image={background}
        onChange={setBackground}
      ></InputImage>
      <div className="flex justify-between mt-8">
        <div></div>
        <Button type="submit" disabled={!canSubmit}>
          <span className="mr-2">Previsualizar</span>
          <FiArrowRight />
        </Button>
      </div>
    </form>
  )
}

export default Step1
