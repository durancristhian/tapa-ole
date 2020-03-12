import domtoimage from 'dom-to-image'
import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiDownload } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import 'typeface-oswald'
import 'typeface-roboto-condensed'
import Button from './Button'
import Loading from './Loading'
import Themes from './Themes'

const ole = require('../assets/ole.png')
const powerade = require('../assets/powerade.png')

const themes = [
  {
    text: 'Clásico',
    value: 'classic',
    styles: {
      title: {
        color: '#b1c903',
      },
    },
  },
  {
    text: 'Alternativo',
    value: 'alternative',
    styles: {
      title: {
        color: '#faaf00',
      },
    },
  },
]

function Step2() {
  const { background, subtitle, theme, title } = JSON.parse(
    localStorage.getItem('form') || ''
  )
  const exportRef = React.createRef<HTMLDivElement>()
  const [currentTheme, setTheme] = useState(theme || themes[0])
  const [preview, setPreview] = useState('')
  const history = useHistory()
  const download = async () => {
    if (exportRef.current) {
      const link = document.createElement('a')
      link.download = 'tapa-ole.jpeg'
      link.href = await domtoimage.toJpeg(exportRef.current)
      link.click()
    }
  }

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem('form') || '{}')
    const newForm = {
      ...form,
      theme: { ...currentTheme },
    }

    localStorage.setItem('form', JSON.stringify(newForm))
  }, [currentTheme])

  useEffect(() => {
    const makePreview = async () => {
      if (exportRef.current) {
        const newPreview = await domtoimage.toJpeg(exportRef.current)

        setPreview(newPreview)
      }
    }

    setTimeout(makePreview, 3000)
  }, [currentTheme])

  return (
    <div className="mt-4">
      <div className="visually-hidden">
        <div
          style={{
            height: 1500,
            width: 1200,
          }}
          ref={exportRef}
        >
          <div className="flex flex-col h-full items-center justify-center relative w-full">
            <div
              className="absolute bg-center bg-cover bottom-0 left-0 right-0 top-0 z-0"
              style={{ backgroundImage: `url(${background})` }}
            ></div>
            <div className="absolute flex justify-between items-start left-0 right-0 top-0 z-10">
              <img src={ole} style={{ height: 325, width: 525 }} />
              <img
                src={powerade}
                style={{ paddingRight: 64, paddingTop: 64, width: 400 }}
              />
            </div>
            <div className="absolute bottom-0 font-semibold gradient italic leading-none left-0 pb-8 px-4 right-0 text-center text-shadow text-white z-10">
              <h1
                className="font-oswald mb-8 uppercase"
                style={{ ...currentTheme.styles.title, fontSize: 150 }}
              >
                {title}
              </h1>
              <h2 className="font-roboto-condensed text-5xl">{subtitle}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        {!preview && <Loading message="Generando preview..." />}
        {preview && (
          <img
            src={preview}
            alt="Previsualización"
            className="border-4 border-white shadow-xl w-full"
          />
        )}
      </div>
      <Themes themes={themes} currentTheme={currentTheme} setTheme={setTheme} />
      <div className="flex justify-between mt-8">
        <Button type="button" onClick={() => history.push('/')}>
          <FiArrowLeft />
          <span className="ml-2">Información</span>
        </Button>
        <Button type="button" onClick={download}>
          <span className="mr-2">Exportar</span>
          <FiDownload />
        </Button>
      </div>
    </div>
  )
}

export default Step2
