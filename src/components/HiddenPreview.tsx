import React from 'react'
import { IFormData } from './Form'

const gradient = require('../assets/gradient.png')
const ole = require('../assets/ole.png')
const powerade = require('../assets/powerade.png')

interface IProps {
  exportRef: React.Ref<HTMLDivElement>
  previewData: IFormData
}

export default function HiddenPreview({ exportRef, previewData }: IProps) {
  return (
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
            style={{ backgroundImage: `url(${previewData.background})` }}
          ></div>
          <div className="absolute flex justify-between items-start left-0 right-0 top-0 z-10">
            <img src={ole} style={{ height: 325, width: 525 }} />
            <img
              src={powerade}
              style={{
                paddingRight: 64,
                paddingTop: 64,
                width: 400,
              }}
            />
          </div>
          <div
            className="absolute bg-center bg-cover bottom-0 font-semibold gradient italic leading-none left-0 pb-8 px-4 right-0 text-center text-shadow text-white z-10"
            style={{ backgroundImage: `url(${gradient})` }}
          >
            <h1
              className="font-oswald mb-8 uppercase"
              style={{
                color: previewData.titleColor,
                fontSize: previewData.titleSize,
              }}
            >
              {previewData.title}
            </h1>
            <h2 className="font-roboto-condensed text-5xl">
              {previewData.subtitle}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
