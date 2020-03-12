import classnames from 'classnames'
import React, { ChangeEvent } from 'react'
import { FiUpload } from 'react-icons/fi'

interface Props {
  label: string
  id: string
  image: string
  onChange: React.Dispatch<React.SetStateAction<any>>
}

function InputImage({ label, id, image, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const file = target.files ? target.files[0] : undefined

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        onChange(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }
  const inputRef = React.createRef<HTMLInputElement>()

  return (
    <>
      <label htmlFor={id} className="block my-4 w-full">
        <span className="text-gray-600">{label}</span>
        {!image && (
          <button
            className={classnames([
              'border-2 border-dashed border-gray-300 flex items-center justify-center h-32 mt-1 rounded w-full',
              'focus:outline-none focus:border-gray-600',
              'duration-150 ease-in-out transition',
            ])}
            type="button"
          >
            <FiUpload />
            <span className="ml-2">Agregar imágen</span>
          </button>
        )}
        {image && (
          <div className="max-w-xs mt-1 mx-auto">
            <img
              src={image}
              alt="Previsualización"
              className="border-4 border-white shadow-xl w-full"
            />
            <p className="flex items-center justify-center mt-4 text-gray-600">
              <span className="ml-2 text-sm">
                Click en la imágen para cambiarla
              </span>
            </p>
          </div>
        )}
      </label>
      <input
        className="visually-hidden"
        type="file"
        name={id}
        id={id}
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
    </>
  )
}

export default InputImage
