// @ts-ignore
import canvas2image from 'canvas2image-module'
import classnames from 'classnames'
import html2canvas from 'html2canvas'
import React, { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import useDeepCompareEffect from 'use-deep-compare-effect'
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

  const [preview, setPreview] = useState<HTMLCanvasElement>()

  const isFormFulfilled = isFulfilled(previewData)

  const onDownloadClick = () => {
    canvas2image.saveAsJPEG(preview)
  }

  useDeepCompareEffect(() => {
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

    /* return () => {
      setPreview(undefined)
    } */
  }, [previewData])

  if (!isFormFulfilled) return <></>

  return (
    <>
      <HiddenPreview exportRef={exportRef} previewData={previewData} />
      <div className="my-8">
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
          tabIndex={-1}
        />
      </div>
      <div className="my-8 text-center">
        <Button type="button" onClick={onDownloadClick} disabled={!preview}>
          <FiDownload />
          <span>&nbsp;&nbsp;Descargar</span>
        </Button>
      </div>
    </>
  )
}

const isFulfilled = (obj: Object) => obj && Object.values(obj).every(Boolean)
