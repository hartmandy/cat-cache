async function getVisits(page = 1, perPage = 10, query = "") {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/current_visits?page=${page}&per_page=${perPage}&query=${query}`
    );
    const visits = await response.json();
    return visits;
  } catch (err) {
    console.error(err);
  }
}

export { getVisits };
