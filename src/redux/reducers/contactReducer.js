const initialState = [
  {
    id: 0,
    firstName: "React",
    lastName: "Js",
    contactNumber: "1234567890",
  },
  {
    id: 1,
    firstName: "Ruby",
    lastName: "On rail",
    contactNumber: "3987654321",
  },
];

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateContact = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateContact;
      return state;
    case "DELETE_CONTACT":
      const filterContacts = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = filterContacts;
      return state;
    default:
      return state;
  }
};

export default contactReducers;
