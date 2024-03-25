import React from "react"

const InputField = ({ name, setFunc, errors }) => {
  let errorType
  if (name === "day") {
    errorType = errors.dayError
  } else if (name === "month") {
    errorType = errors.monthError
  } else {
    errorType = errors.yearError
  }

  const stringForPlaceholder =
    (name === "day" && "DD") ||
    (name === "month" && "MM") ||
    (name === "year" && "YYYY")
  // console.log(errorType)
  const handleChange = (e) => {
    setFunc(e.target.value)
  }
  return (
    <div className="flex flex-col mr-[1.5em]">
      <label
        htmlFor="day"
        className={`uppercase tracking-[.2rem] font-poppins text-xs font-extrabold ${
          errorType.length > 0 ? "text-rose-500" : "text-neutral-500 mb-2"
        }`}
      >
        {name}
      </label>
      <input
        type="text"
        id="day"
        className="w-[6rem] h-[3rem] border border-solid rounded-md border-neutral-300 pl-4 pr-4 pt-4 pb-4 font-poppins font-extrabold focus:border-violet-500 focus:outline-none"
        onChange={handleChange}
        placeholder={stringForPlaceholder}
      />
      <p className="font-poppins text-[11px] text-rose-500">{errorType}</p>
    </div>
  )
}

export default InputField
