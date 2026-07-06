const BASE_URL = "http://localhost:3000";

export async function getAllBooks() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/book/get_all_book`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res:", res);

    const data = await res.json();
    console.log("status:", res.status); // ✅ add this
    console.log("data:", data);
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error;
  }
}

export async function giveBook(book: string, author: string, genre: string) {
  try {
    const token = await localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/book/give_book`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book, author, genre }),
    });

    const data = await res.json();
    console.log("res : ", res);
    console.log(data);
    console.log(data.message);
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error;
  }
}

export async function deleteBook(id: string) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/api/book/delete_book/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function getBook(id: string) {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
    throw new Error("Unauthorized")}
    const res = await fetch(`${BASE_URL}/api/book/get_book/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {

      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateBook(
  id: string,
  book: string,
  author: string,
  genre: string,
) {
  try {
    const token = await localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/book/update_book/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
  
        "Content-Type": "application/json",
      },
      body : JSON.stringify({book , author , genre})
    });
    const data = await res.json()
    if(!res.ok){
      throw new Error(data.message)
    }
  
    return data
  } catch (error) {
    throw error
  }
}      
