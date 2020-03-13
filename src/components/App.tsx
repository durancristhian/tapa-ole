import React, { useState } from 'react'
import 'typeface-inter'
import 'typeface-oswald'
import 'typeface-roboto-condensed'
import Form, { defaultFormData, IFormData } from './Form'
import Header from './Header'
import Preview from './Preview'

export default function App() {
  const [previewData, setPreviewData] = useState<IFormData>(defaultFormData)

  return (
    <div className="font-body text-gray-800">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Form updatePreview={setPreviewData} />
        <Preview previewData={previewData} />
      </div>
    </div>
  )
}
