import React, { useState, useEffect } from "react";
import Modal from "./modal.tsx";
import { onboardPet, searchOwner } from "../../../data/pet.ts";

interface OnboardModalProps {
  show: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  petName: string;
  age: number;
  unit: string;
  type: string;
  breed: string;
  reason: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  petName: "",
  age: 0,
  unit: "wks",
  type: "Dog",
  breed: "Pomeranian",
  reason: "",
};

const OnboardModal: React.FC<OnboardModalProps> = ({ show, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [owners, setOwners] = useState<string[]>([]);
  const [ownerSearch, setOwnerSearch] = useState<string>("");
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [isReturningOwner, setIsReturningOwner] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (ownerSearch) {
        searchOwner(ownerSearch).then((results) => setOwners(results));
      }
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [ownerSearch]);

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

  const handleOwnerSelect = (owner: string) => {
    setSelectedOwner(owner);
    setOwnerSearch("");
    setStep(3);
  };

  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
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

  const renderOwnerCheckStep = () => (
    <div>
      <h3 className="mb-2">Is the owner already in the system?</h3>
      <div className="flex gap-4">
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsReturningOwner(true);
            setStep(2);
          }}
        >
          Yes
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsReturningOwner(false);
            setStep(2);
          }}
        >
          No
        </button>
      </div>
    </div>
  );

  const renderOwnerStep = () => (
    <div>
      {isReturningOwner ? (
        <div>
          <h3 className="mb-2">Owner Information</h3>
          <input
            type="text"
            placeholder="Search Owner"
            value={ownerSearch}
            onChange={(e) => setOwnerSearch(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ul className="mt-2">
            {owners.map((owner) => (
              <li
                key={owner}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleOwnerSelect(owner)}
              >
                {owner}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="mb-2">New Owner Information</h3>
          <div className="mb-4 flex gap-3">
            <div className="w-1/2">
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
                <p className="text-red-500 text-xs italic">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="w-1/2">
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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
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
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setStep(1)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400"
          disabled={
            (isReturningOwner && !Boolean(ownerSearch)) ||
            (!isReturningOwner &&
              !Boolean(
                formData.firstName &&
                  formData.lastName &&
                  formData.email &&
                  formData.phone
              ))
          }
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderPetStep = () => (
    <div>
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
              {Array.from({ length: 101 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <select
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              {["wks", "mo", "yrs"].map((unit) => (
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
            {["Dog", "Cat", "Bird", "Small Mammal", "Exotic"].map((type) => (
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
            {["Pomeranian", "Macaw", "Calico", "Bulldog"].map((breed) => (
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
          htmlFor="reason"
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
          onClick={() => setStep(2)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );

  const handleClose = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({});
    setOwners([]);
    setOwnerSearch("");
    setSelectedOwner(null);
    setIsReturningOwner(null);
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <h2 className="text-2xl font-bold mb-4">Onboard New Patient</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && renderOwnerCheckStep()}
        {step === 2 && renderOwnerStep()}
        {step === 3 && renderPetStep()}
      </form>
    </Modal>
  );
};

export default OnboardModal;
