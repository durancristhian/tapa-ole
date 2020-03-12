import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'typeface-inter'
import Header from './Header'
import Loading from './Loading'

const Step1 = lazy(() => import('./Step1'))
const Step2 = lazy(() => import('./Step2'))

function App() {
  return (
    <div className="font-body text-gray-800">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Step1} />
              <Route path="/preview" component={Step2} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </div>
    </div>
  )
}

export default App
