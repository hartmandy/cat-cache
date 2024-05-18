import React, { useState } from "react";
import Modal from "./modal.tsx";
import { onboardPet } from "../../../data/pet.ts";

interface OnboardModalProps {
  show: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  petName: string;
  age: number;
  unit: string;
  type: string;
  breed: string;
  reason: string;
}

const OnboardModal: React.FC<OnboardModalProps> = ({ show, onClose }) => {
  // Dummy data
  const ages = Array.from({ length: 101 }, (_, i) => i);
  const units = ["wks", "mo", "yrs"];
  const types = ["Dog", "Cat", "Bird", "Small Mammal", "Exotic"];
  const breeds = ["Pomeranian", "Macaw", "Calico", "Bulldog"];

  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    petName: "",
    age: ages[0],
    unit: units[0],
    type: types[0],
    breed: breeds[0],
    reason: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "age" ? parseInt(value) : value,
    }));
  };

  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.petName) newErrors.petName = "Pet name is required";
    if (!formData.reason) newErrors.reason = "Reason for visit is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      await onboardPet(formData);
      onClose();
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Onboard New Patient</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="mb-2">Owner Information</h3>
        <div className="mb-4 flex gap-3">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
        </div>

        <h3 className="mb-2">Pet Information</h3>
        <div className="mb-4 flex gap-3">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="petName"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="petName"
              type="text"
              placeholder="Pet Name"
              value={formData.petName}
              onChange={handleChange}
            />
            {errors.petName && (
              <p className="text-red-500 text-xs italic">{errors.petName}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <div className="flex">
              <select
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                id="age"
                value={formData.age}
                onChange={handleChange}
              >
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              <select
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="breed"
            >
              Breed
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="breed"
              value={formData.breed}
              onChange={handleChange}
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="mb-2">Reason for Visit</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="notes"
          />

          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reason"
            placeholder="Reason for Visit"
            value={formData.reason}
            onChange={handleChange}
          ></textarea>
          {errors.reason && (
            <p className="text-red-500 text-xs italic">{errors.reason}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OnboardModal;
