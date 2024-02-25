import { useState } from "react";

function UpdateAvatar({ name }) {
  const token = localStorage.getItem("ApiToken");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const avatarValue = formData.get("avatar");

    // URL and Endpoint to API request
    const Url = "https://api.noroff.dev/api/v1/holidaze/profiles";
    const endPoint = `/${name}/media`;
    const body = { avatar: avatarValue };

    fetch(Url + endPoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was an error with the request");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setErrorMessage("");
      });
  };

  return (
    <div className='ml-1 px-4 border-l border-gray-300'>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Update Avatar
      </h2>
      {errorMessage && <div>{errorMessage}</div>}
      {error instanceof Error && <div>{error.toString()}</div>}
      <form onSubmit={handleSubmit}>
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          Avatar URL:
          <input
            name='avatar'
            type='url'
            className='bg-gray-300 rounded-md ml-1'
          />
        </label>
        <button
          type='submit'
          className='mt-3 rounded-md bg-accent/80 px-2.5 py-1.5 text-sm font-semibold text-black tracking-wide'
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateAvatar;
