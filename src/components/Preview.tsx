// @ts-ignore
import canvas2image from 'canvas2image-2'
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
  const exportRef = React.useRef<HTMLDivElement>(null)
  const canvasContainerRef = React.useRef<HTMLDivElement>(null)

  const [preview, setPreview] = useState<HTMLCanvasElement>()

  const isFormFulfilled = isFulfilled(previewData)

  const onDownloadClick = () => {
    canvas2image.saveAsPNG(preview)
  }

  useDeepCompareEffect(() => {
    const viewportMeta = document.getElementById('viewportMeta')

    if (!exportRef.current || !isFormFulfilled || !viewportMeta) {
      return
    }

    const vp = viewportMeta.getAttribute('content')
    viewportMeta.setAttribute('content', 'width=1024')

    html2canvas(exportRef.current)
      .then(canvas => {
        canvas.style.height = '100%'
        canvas.style.width = '100%'

        if (vp) {
          viewportMeta.setAttribute('content', vp)
        }

        if (canvasContainerRef.current) {
          canvasContainerRef.current.innerHTML = ''
          canvasContainerRef.current.appendChild(canvas)

          setPreview(canvas)
        }
      })
      .catch(error => {
        alert(error)
      })
  }, [previewData])

  return (
    <>
      <HiddenPreview exportRef={exportRef} previewData={previewData} />
      <div className="my-8">
        {isFormFulfilled && !preview && (
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
        <Button
          type="button"
          onClick={onDownloadClick}
          disabled={!preview || !isFormFulfilled}
        >
          <FiDownload />
          <span>&nbsp;&nbsp;Descargar</span>
        </Button>
      </div>
    </>
  )
}

const isFulfilled = (obj: Object) => obj && Object.values(obj).every(Boolean)
