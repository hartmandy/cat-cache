import { Patient } from "../types";

interface PetFormData {
  firstName: string;
  lastName: string;
  phone: string;
  petName: string;
  age: number;
  type: string;
  breed: string;
  reason: string;
  email: string;
}

async function onboardOwnerAndPet(formData: PetFormData) {
  const url = "http://127.0.0.1:5000/pets"; // Adjust the URL as needed
  const payload = {
    owner: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
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

async function onboardPetForExistingOwner(
  formData: PetFormData,
  ownerId: number
) {
  const url = "http://127.0.0.1:5000/pets"; // Adjust the URL as needed
  const payload = {
    owner_id: ownerId,
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

interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

async function searchOwner(query: string): Promise<Owner[]> {
  try {
    const response = await fetch(`http://127.0.0.1:5000/owners?query=${query}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function getPatients(page = 1, perPage = 10, query = "") {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/pets?page=${page}&per_page=${perPage}&query=${query}`
    );
    const patients = await response.json();
    return patients;
  } catch (err) {
    console.error(err);
  }
}

async function getPetById(id: number): Promise<Patient | null> {
  try {
    const response = await fetch(`http://127.0.0.1:5000/pets/${id}`);
    if (response.ok) {
      const animal: Patient = await response.json();
      return animal;
    } else {
      console.error(
        `Failed to fetch animal with ID ${id}: ${response.statusText}`
      );
      return null;
    }
  } catch (err) {
    console.error(`Error fetching animal with ID ${id}:`, err);
    return null;
  }
}

export {
  onboardOwnerAndPet,
  searchOwner,
  onboardPetForExistingOwner,
  getPatients,
  getPetById,
};
