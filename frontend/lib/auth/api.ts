const BASE_URL = "http://localhost:3000";

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log(email, password);
    const url = `${BASE_URL}/api/auth/login`;
    console.log("url", url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    console.log("res from api:", res);
    const data = await res.json();
    console.log("error--------------",data.message);

    if (!res.ok) {
      throw new Error(data.message);
    }
    // console.log("res from api:", data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log("error inside api in frontend:", error);
    throw error;
  }
}

export async function logoutUser() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  });
  return res.json();
}
