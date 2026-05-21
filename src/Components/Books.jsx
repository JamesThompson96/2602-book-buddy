const API = import.meta.env.VITE_API;

export async function getBooks() {
  try {
    const response = await fetch(`${API}/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    return result || [];
  } catch (e) {
    console.error("Fetch failed in getBooks:", e);
    return [];
  }
}

export async function getBook(id) {
  try {
    const response = await fetch(`${API}/books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    return result.book || null;
  } catch (e) {
    console.error(`Fetch failed in getBook for ID ${id}:`, e);
    return null;
  }
}

export async function deleteReservation(token, id) {
  if (!token) {
    throw Error("You must be signed in to return reservation.");
  }

  const response = await fetch(API + "/reservations/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
