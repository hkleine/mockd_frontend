import React, { Fragment } from "react"
import { Protocols } from '../../types';
import { SubmitButton } from '..'

// Destructuring props
const FirstStep = ({ handleNext, handleChange, values: { protocol } }: any) => {
  // Check if all values are not empty or if there are some error
  const isValid = protocol.length > 0;

  return (
    <Fragment>
          <h2 className="text-gray-700 text-2xl font-medium pb-2">Protocol</h2>
          <span className="text-gray-700 text-sm pb-8">Which protocol should the virtual device comunicate on?</span>
          <div className="flex flex-row w-full justify-between">
            <label className="labl">
                <input type="radio" aria-label="protocol" name="protocol" value={Protocols.HTTP} onChange={handleChange}/>
                <div className="max-w-sm rounded-lg overflow-hidden text-gray-700 text-xl font-medium shadow-lg bg-white p-8">HTTP</div>
            </label>
            <label className="labl">
              <input type="radio" aria-label="protocol" name="protocol" value={Protocols.MQTT} onChange={handleChange}/>
              <div className="max-w-sm rounded-lg overflow-hidden text-gray-700 text-xl font-medium shadow-lg bg-white p-8">MQTT</div>
            </label>
          </div>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <SubmitButton isValid={isValid} onClick={handleNext}>next</SubmitButton>
      </div>
    </Fragment>
  )
}

export default FirstStep
