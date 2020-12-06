// @ts-ignore
import classnames from 'classnames'
import domtoimage from 'dom-to-image'
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
  const [preview, setPreview] = useState('')
  const isFormFulfilled = isFulfilled(previewData)

  const onDownloadClick = () => {
    const hiddenPreview = document.getElementById('hidden-preview')

    if (hiddenPreview) {
      domtoimage.toJpeg(hiddenPreview).then(function(dataUrl) {
        const link = document.createElement('a')
        link.download = 'tapa-ole.jpeg'
        link.href = dataUrl
        link.click()
      })
    }
  }

  useDeepCompareEffect(() => {
    if (!isFormFulfilled) {
      return
    }

    const hiddenPreview = document.getElementById('hidden-preview')

    if (hiddenPreview) {
      domtoimage.toJpeg(hiddenPreview).then(function(dataUrl) {
        setPreview(dataUrl)
      })
    }
  }, [previewData])

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
          <img src={preview} alt="previe" className="block w-full" />
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
