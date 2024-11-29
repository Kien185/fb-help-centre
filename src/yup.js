import * as Yup from 'yup'

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

Yup.addMethod(Yup.string, 'emailValidation', function (errorMessage) {
  return this.test(`test-project-name`, errorMessage, function (value) {
    const flatValue = value?.trim()
    if (!flatValue) return true
    return emailRegex.test(flatValue)
  })
})
