import React from 'react'
// @ts-ignore
import sponsors from '../assets/sponsors/*.png'
import { IFormData } from './Form'
/* import VisuallyHidden from './VisuallyHidden' */

interface IProps {
  exportRef: React.Ref<HTMLDivElement>
  previewData: IFormData
}

export default function HiddenPreview({
  exportRef,
  previewData: { background, sponsor, subtitle, title, titleColor, titleSize },
}: IProps) {
  const sponsorConfig = SPONSORS_CONFIG[sponsor]

  return (
    <div style={{ height: 1500, width: 1200 }} ref={exportRef}>
      <div className="flex flex-col h-full items-center justify-center relative w-full">
        <div
          className="absolute bg-center bg-cover bottom-0 left-0 right-0 top-0 z-0"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute flex justify-between items-start left-0 right-0 top-0 z-10">
          <img src={ASSETS.logo} style={{ height: 325, width: 525 }} />
          <img src={sponsorConfig.img} style={{ ...sponsorConfig.style }} />
        </div>
        <div
          className="absolute bg-center bg-cover bottom-0 font-semibold gradient italic leading-none left-0 pb-8 px-4 right-0 text-center text-shadow text-white z-10"
          style={{ backgroundImage: `url(${ASSETS.gradient})` }}
        >
          <h1
            className="font-oswald mb-8 uppercase"
            style={{ color: titleColor, fontSize: titleSize }}
          >
            {title}
          </h1>
          <h2 className="font-roboto-condensed text-5xl">{subtitle}</h2>
        </div>
      </div>
    </div>
  )
}

const ASSETS = {
  gradient: require('../assets/gradient.png'),
  logo: require('../assets/ole.png'),
}

interface ILogoConfig {
  [name: string]: {
    style: React.CSSProperties
    img: any
  }
}

const SPONSORS_CONFIG: ILogoConfig = {
  cimes: {
    style: {
      width: 350,
    },
    img: sponsors['cimes'],
  },
  quilmes: {
    style: {
      paddingRight: 50,
      paddingTop: 50,
      width: 300,
    },
    img: sponsors['quilmes'],
  },
  powerade: {
    style: {
      paddingRight: 50,
      paddingTop: 50,
      width: 400,
    },
    img: sponsors['powerade'],
  },
}
