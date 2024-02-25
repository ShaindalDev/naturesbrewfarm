export const formSubmit = (
  id,
  values,
  submitProps,
  alertContent,
  alert,
  navigating,
  setFormValues
) => {
  console.log("Form data", values);

  // eslint-disable-next-line
  const {
    name,
    description,
    media,
    price,
    maxGuests,
    wifi,
    parking,
    breakfast,
    pets,
    address,
    city,
    zip,
    country,
    continent,
    lat,
    lng,
  } = values;

  if (!media) {
    return null;
  }

  const body = {
    name: name,
    description: description,
    media: [...media],
    price: price,
    maxGuests: maxGuests,
    rating: 0,
    meta: {
      wifi: wifi,
      parking: parking,
      breakfast: breakfast,
      pets: pets,
    },
    location: {
      address: address,
      city: city,
      zip: zip,
      country: country,
      continent: continent,
      lat: lat,
      lng: lng,
    },
  };

  const Url = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;
  const token = localStorage.getItem("ApiToken");
  fetch(Url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    })
    .then((data) => {
      // Handle successful response from API
      console.log(data);
      alertContent("Venue created");
      alert(true);
      setTimeout(() => {
        navigating(`/venue/${data.id}`);
      }, 2000);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });

  console.log(body);

  setFormValues(values);
};
