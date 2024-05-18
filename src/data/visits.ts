async function getVisits() {
  try {
    const response = await fetch("http://127.0.0.1:5000/current_visits");
    const visits = await response.json();
    return visits;
  } catch (err) {
    console.error(err);
  }
}

export { getVisits };
