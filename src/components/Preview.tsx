// @ts-ignore
import canvas2image from 'canvas2image-module'
import classnames from 'classnames'
import html2canvas from 'html2canvas'
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
  const exportRef = React.createRef<HTMLDivElement>()
  const canvasContainerRef = React.createRef<HTMLDivElement>()

  const [preview, setPreview] = useState<HTMLCanvasElement | null>()

  const isFormFulfilled = previewData && isFulfilled(previewData)

  const onDownloadClick = () => {
    canvas2image.saveAsJPEG(preview)
  }

  useEffect(() => {
    const makePreview = async () => {
      if (exportRef.current && canvasContainerRef.current) {
        const canvas = await html2canvas(exportRef.current, {
          logging: false,
        })
        canvas.style.height = '100%'
        canvas.style.width = '100%'

        canvasContainerRef.current.innerHTML = ''
        canvasContainerRef.current.appendChild(canvas)

        setPreview(canvas)
      }
    }

    makePreview()
  }, [isFormFulfilled])

  return (
    isFormFulfilled && (
      <>
        <HiddenPreview exportRef={exportRef} previewData={previewData} />
        <div className="my-4">
          {!preview && (
            <Loading>
              <p>Generando preview...</p>
            </Loading>
          )}
          <div
            className={classnames([
              'border-4 border-white shadow-xl',
              !preview ? 'visually-hidden' : '',
            ])}
            ref={canvasContainerRef}
          />
        </div>
        <div className="text-right">
          <Button type="button" onClick={onDownloadClick} disabled={!preview}>
            <span className="mr-2">Descargar</span>
            <FiDownload />
          </Button>
        </div>
      </>
    )
  )
}

const isFulfilled = (obj: Object) => obj && Object.values(obj).every(Boolean)
