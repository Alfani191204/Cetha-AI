const BASE_URL = "https://deceased-degraded-carnival.ngrok-free.dev"

export const api = {
  login: (email: string, password: string) =>
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    }).then(r => r.json()),

  register: (data: object) =>
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  getDashboard: (userId: number) =>
    fetch(`${BASE_URL}/api/dashboard/${userId}`)
    .then(r => r.json()),

  getTransactions: (userId: number) =>
    fetch(`${BASE_URL}/api/transactions/${userId}`)
    .then(r => r.json()),

  saveTransaction: (data: object) =>
    fetch(`${BASE_URL}/api/save-transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  scanNota: (imageFile: File, userId: number) => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("user_id", String(userId))
    return fetch(`${BASE_URL}/api/scan-nota`, {
      method: "POST",
      body: formData
    }).then(r => r.json())
  },

  getInsights: (userId: number) =>
    fetch(`${BASE_URL}/api/insights/${userId}`)
    .then(r => r.json()),

  getStockRecommendation: (userId: number) =>
    fetch(`${BASE_URL}/api/stock-recommendation/${userId}`)
    .then(r => r.json()),
}
