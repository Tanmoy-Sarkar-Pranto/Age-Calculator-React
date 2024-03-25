import { useState } from "react"
import InputField from "./components/InputField"
import arrowIcon from "./assets/images/icon-arrow.svg"

function App() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const [errors, setErrors] = useState({
    dayError: false,
    monthError: false,
    yearError: false,
  })

  const [ageDay, setAgeDay] = useState(null)
  const [ageMonth, setAgeMonth] = useState(null)
  const [ageYear, setAgeYear] = useState(null)

  const validateDate = () => {
    const newErrors = { dayError: false, monthError: false, yearError: false } // Reset errors

    if (!day) {
      newErrors.dayError = "This field is required."
    } else if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
      newErrors.dayError = "Must be a valid day"
    }

    if (!month) {
      newErrors.monthError = "This field is required."
    } else if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      newErrors.monthError = "Must be a valid month"
    }

    const currentYear = new Date().getFullYear()
    if (!year) {
      newErrors.yearError = "This field is required."
    } else if (parseInt(year, 10) < 1 || parseInt(year, 10) > currentYear) {
      newErrors.yearError =
        parseInt(year, 10) > currentYear
          ? "Must be in the past."
          : "Must be a valid year."
    } else {
      // Only check for valid days if year is valid
      const isLeapYear =
        (parseInt(year, 10) % 4 === 0 && parseInt(year, 10) % 100 !== 0) ||
        parseInt(year, 10) % 400 === 0
      const daysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ]
      if (parseInt(day, 10) > daysInMonth[parseInt(month, 10) - 1]) {
        newErrors.dayError = "Must be a valid date"
      }
    }

    setErrors(newErrors)
  }

  const calculateAge = (day, month, year) => {
    // console.log(day, month, year)
    // Get current date
    var currentDate = new Date()
    // console.log(currentDate)
    // Subtract birthdate from current date
    var birthDate = new Date(year, month - 1, day) // Note: month - 1 because months are zero-indexed
    // console.log(birthDate)
    var ageInMilliseconds = currentDate - birthDate
    // console.log(ageInMilliseconds)

    // Convert age from milliseconds to years, months, and days
    var ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25) // Account for leap years
    // console.log(ageInYears)
    var ageYears = Math.floor(ageInYears)
    // console.log(ageYears)
    var remainingMonths = (ageInYears - ageYears) * 12
    var ageMonths = Math.floor(remainingMonths)
    var remainingDays = (remainingMonths - ageMonths) * (365.25 / 12)
    var ageDays = Math.floor(remainingDays)

    // console.log(ageDays, ageMonths, ageYears)

    setAgeDay(ageDays)
    setAgeMonth(ageMonths)
    setAgeYear(ageYears)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    validateDate()

    // Only calculate age if no errors

    calculateAge(day, month, year)
    // Calculate age logic here (using validated date values)
  }

  return (
    <div className="bg-zinc-300 h-screen w-screen flex justify-center ">
      <div className="bg-white h-[28rem] w-[25rem] flex flex-col mt-[4rem] pt-[3rem] pl-[1.5rem] rounded-[30px] rounded-br-[125px] md:w-[32rem] md:h-[30rem]">
        <div className="flex flex-col ">
          <form className="flex ">
            <InputField name={"day"} setFunc={setDay} errors={errors} />
            <InputField name={"month"} setFunc={setMonth} errors={errors} />
            <InputField name={"year"} setFunc={setYear} errors={errors} />
          </form>
        </div>
        <div className="mt-8 flex items-center">
          <hr className="h-1 w-[40%] bg-zinc-500 opacity-20 md:order-1" />
          <button
            type="submit"
            onClick={handleSubmit}
            className="line-clamp-1 rounded-[50%] md:order-3 outline-violet-500"
          >
            <div className="w-[40px] h-[40px] bg-violet-500 flex justify-center items-center hover:bg-black  md:w-[60px] md:h-[60px]">
              <img
                src={arrowIcon}
                alt="arrow icon"
                className="h-[70%] w-[70%] "
              />
            </div>
          </button>
          <hr className="h-1 w-[40%] bg-zinc-500 opacity-20 md:order-2" />
        </div>
        <div className="mt-8 ">
          <h2 className="flex items-center ">
            <span className="font-poppins font-black text-violet-500 text-5xl tracking-widest italic md:text-6xl">
              {errors.dayError === false &&
              errors.monthError === false &&
              errors.yearError === false &&
              ageDay !== null &&
              ageMonth !== null &&
              ageYear !== null ? (
                ageYear
              ) : (
                <span>--</span>
              )}
            </span>
            <span className="font-poppins font-black  text-5xl italic md:text-6xl">
              years
            </span>
          </h2>
          <h2 className="flex items-center ">
            <span className="font-poppins font-black text-violet-500 text-5xl tracking-widest italic md:text-6xl">
              {errors.dayError === false &&
              errors.monthError === false &&
              errors.yearError === false &&
              ageDay !== null &&
              ageMonth !== null &&
              ageYear !== null ? (
                ageMonth
              ) : (
                <span>--</span>
              )}
            </span>
            <span className="font-poppins font-black  text-5xl italic md:text-6xl">
              months
            </span>
          </h2>
          <h2 className="flex items-center ">
            <span className="font-poppins font-black text-violet-500 text-5xl tracking-widest italic md:text-6xl">
              {errors.dayError === false &&
              errors.monthError === false &&
              errors.yearError === false &&
              ageDay !== null &&
              ageMonth !== null &&
              ageYear !== null ? (
                ageDay
              ) : (
                <span>--</span>
              )}
            </span>
            <span className="font-poppins font-black  text-5xl italic md:text-6xl">
              days
            </span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default App
