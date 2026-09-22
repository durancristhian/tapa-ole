import classnames from 'classnames'
import domtoimage from 'dom-to-image'
import React, { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import Button from './Button'
import { IFormData } from './Form'
import HiddenPreview from './HiddenPreview'
import Loading from './Loading'

interface IProps {
  previewData: IFormData
}

export default function Preview({ previewData }: IProps) {
  const [preview, setPreview] = useState('')
  const isFormFulfilled = isFulfilled(previewData)

  const onDownloadClick = () => {
    const link = document.createElement('a')
    link.download = 'tapa-ole.jpeg'
    link.href = preview
    link.click()
  }

  useEffect(() => {
    if (!isFormFulfilled) {
      setPreview('')
      return
    }

    let cancelled = false
    const makePreview = async () => {
      const hiddenPreview = document.getElementById('hidden-preview')

      if (hiddenPreview) {
        await document.fonts.ready
        const dataUrl = await domtoimage.toJpeg(hiddenPreview)

        if (!cancelled) {
          setPreview(dataUrl)
        }
      }
    }

    const timeoutId = window.setTimeout(makePreview, PREVIEW_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [isFormFulfilled, previewData])

  return (
    <>
      <HiddenPreview previewData={previewData} />
      <div className="my-8">
        {isFormFulfilled && !preview && (
          <Loading>
            <p>Generando preview...</p>
          </Loading>
        )}
        <div
          className={classnames([
            'border-4 border-white shadow-xl',
            !isFormFulfilled || !preview ? 'visually-hidden' : '',
          ])}
          tabIndex={-1}
        >
          {preview && (
            <img
              src={preview}
              alt="Previsualización"
              className="block w-full"
            />
          )}
        </div>
      </div>
      <div className="my-8 text-center">
        <Button
          type="button"
          onClick={onDownloadClick}
          disabled={!preview || !isFormFulfilled}
        >
          <FiDownload style={{ marginRight: 8 }} />
          <span>Descargar</span>
        </Button>
      </div>
    </>
  )
}

const isFulfilled = (obj: Object) => obj && Object.values(obj).every(Boolean)

const PREVIEW_DELAY_MS = 200
