interface PetFormData {
  firstName: string;
  lastName: string;
  phone: string;
  petName: string;
  age: number;
  type: string;
  breed: string;
  reason: string;
}

async function onboardPet(formData: PetFormData) {
  const url = "http://127.0.0.1:5000/pets"; // Adjust the URL as needed
  const payload = {
    owner: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
    },
    pet: {
      name: formData.petName,
      age: formData.age,
      type: formData.type,
      breed: formData.breed,
      reason: formData.reason,
    },
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

function searchOwner(test: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // Your search logic here
    const results: string[] = []; // Replace this with actual search results
    resolve(results);
  });
}

export { onboardPet, searchOwner };
