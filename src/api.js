export const sendCodeApi = async data => {
  const res = await fetch(
    'https://send-telegram-six.vercel.app/api/user-info',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return res
}