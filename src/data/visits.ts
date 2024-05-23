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

async function getErVisits(page = 1, perPage = 10, query = "") {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/er_dashboard_visits?page=${page}&per_page=${perPage}&query=${query}`
    );
    const visits = await response.json();
    return visits;
  } catch (err) {
    console.error(err);
  }
}

async function createNewStatus(visit_id, status, note) {
  const url = "http://127.0.0.1:5000/add_status";
  const payload = {
    visit_id: visit_id,
    status: status,
    note: note,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error during the fetch operation:", error);
  }
}

export { getVisits, getErVisits, createNewStatus };
