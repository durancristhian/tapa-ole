import classnames from 'classnames'
import React from 'react'
import { FiMinus, FiUpload } from 'react-icons/fi'

interface IProps {
  id: string
  image: string
  label: string
  onChange: Function
}

export default function InputImage({ label, id, image, onChange }: IProps) {
  const inputRef = React.createRef<HTMLInputElement>()
  const clearImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()

    onChange(id, '')
  }
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file = target.files ? target.files[0] : undefined

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        onChange(id, reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <label htmlFor={id} className="flex flex-col my-4">
        <span className="text-gray-600">{label}</span>
        {!image && (
          <button
            className={classnames([
              'border-2 border-dashed border-gray-300 flex items-center justify-center h-64 mt-1 rounded w-full',
              'focus:border-gray-600 focus:outline-none focus:shadow-outline',
              'duration-150 ease-in-out transition',
            ])}
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            <FiUpload />
            <span className="ml-2">Agregar imágen</span>
          </button>
        )}
        {image && (
          <div className="flex justify-center mt-1">
            <div className="h-64 mx-auto relative">
              <img
                src={image}
                alt="Previsualización"
                className="border-4 border-white h-full shadow-xl"
              />
              <button
                className={classnames([
                  'absolute bg-black border-2 border-white -mr-2 -mt-2 rounded-full p-2 right-0 top-0',
                  'focus:outline-none focus:shadow-outline',
                ])}
                onClick={clearImage}
              >
                <FiMinus color="white" />
              </button>
            </div>
          </div>
        )}
      </label>
      <input
        accept="image/*"
        className="visually-hidden"
        id={id}
        onChange={handleOnChange}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />
    </>
  )
}
