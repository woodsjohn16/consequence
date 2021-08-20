const apiBase: string =
  'https://api.dashboard.consequence.world'

export const getUserAccounts = () => {
  return fetch(`${apiBase}/truelayer/accounts/`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .catch((err) => err)
}

export const getUserAccountInfo = (accountID: string) => {
  return fetch(`${apiBase}/truelayer/accounts/${accountID}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .catch((err) => err)
}
