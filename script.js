let dataContacts = [
    {
        id: 1,
        fullName: "Debsa Taludin",
        phone: 6282149674730,
        email: "debsagineral398@gmail.com",
        location: "Sambas",
    },
    {
        id: 2,
        fullName: "Mochamad Irvan",
        phone: 62881080070700,
        email: "mchmdirvan@example.com",
        location: "Jakarta",
    },
    {
        id: 3,
        fullName: "Adhitya Sofyan",
        phone: 62881080080800,
        email: "adhitya@example.com",
        location: "Bandung",
    },
];

// --- DOM ---
const contactList = document.getElementById("contact-list");

const contactFormElement = document.getElementById("formContact");

contactFormElement.addEventListener("submit", addContact);

window.deleteContact = deleteContact;

const fullNameInputElement = document.getElementById("fullName");
const phoneInputElement = document.getElementById("phone");
const emailInputElement = document.getElementById("email");
const locationInputElement = document.getElementById("location");

// --- FUNCTION ---

function displayContacts() {
    loadContacts = loadFormLocalStorage();
    loadContacts === null ? saveToLocalStorage() : null;

    const contactListElement = loadContacts.map((contact) => {
        return `
        <li class="border w-lg my-2 rounded-md">
        <h1>${contact.fullName}</h1>
        <p>${contact.phone}</p>
        <p>${contact.email}</p>
        <p>${contact.location}</p>

        <button
        onclick="deleteContact(${contact.id})"
        class="border text-white bg-red-400 rounded-lg px-2 py-1"
        >
        Delete
        </button>
        <a
        href="/?id=${contact.id}"
        class="border text-white bg-black rounded-lg px-2 py-1"
        >
        Edit
        </a>
        </li>
        `;
    });

    contactList.innerHTML = contactListElement.join("");
}

function createNewId() {
    // to create new id, we need to know last id in dataContacts.
    // so we access the array of object using Square Brackets to access array [] and dot notaion to accsess object (.)
    // access the last element with dataContacts[dataContacts.length -1] and get its id property.
    // after we know the last id, Add 1 to the last id to generate a new unique id.
    const newId = dataContacts[dataContacts.length -1].id + 1;
    return newId;
}
function addContact(event) {
    event.preventDefault();

    const contacts = loadFormLocalStorage();

    const contactFormData = new FormData(contactFormElement);

    const newContact = {
        id: createNewId(),
        fullName: contactFormData.get("fullName"),
        phone: contactFormData.get("phone"),
        email: contactFormData.get("email"),
        location: contactFormData.get("location"),
    };

    const updateContacts = [...contacts, newContact];

    saveToLocalStorage(updateContacts);
    displayContacts();
}

function searchContacts(keyword) {
    const filteredContacts = dataContacts.filter(
        (filteredContact) => filteredContact.fullName == keyword
    );

    for (const contact of filteredContacts) {
        console.log(`
            🆔 : ${contact.id}
            🧑🏻 : ${contact.fullName}
            📱 : ${contact.phone}
            📍 : ${contact.location}
            ✉️ : ${contact.email}
            `);
    }
}

function deleteContact(id) {
    const contacts = loadFormLocalStorage();
    const updateContacts = contacts.filter((contact) => contact.id !== id);

    saveToLocalStorage(updateContacts);
    displayContacts();
}

function getId() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    return id;
}

const contacts = loadFormLocalStorage();
const id = getId();

contacts.find((contact) => {
    if (id == contact.id) {
        fullNameInputElement.value = contact.fullName;
        phoneInputElement.value = contact.phone;
        emailInputElement.value = contact.email;
        locationInputElement.value = contact.location;
    }
});

// T0D0: MOVE THIS INTO PAGE EDIT
function updateContact(event) {
    event.preventDefault();

    const contactFormData = new FormData(contactFormElement);

    const newContact = {
        id: Number(id),
        fullName: contactFormData.get("fullName"),
        phone: contactFormData.get("phone"),
        email: contactFormData.get("email"),
        location: contactFormData.get("location"),
    };

    const updateContacts = contacts.map((contact) => {
        if (contact.id == id) {
            return {
                ...contact,
                ...newContact,
            };
        } else {
            return contact;
        }
    });

    saveToLocalStorage(updateContacts);
    window.location.href = "/";
    displayContacts();
}

function saveToLocalStorage(contact) {
    localStorage.setItem("contacts", JSON.stringify(contact));
}

function loadFormLocalStorage() {
    const contactsFormSrorage = localStorage.getItem("contacts");
    return JSON.parse(contactsFormSrorage);
}

// RUN PROGRAM
displayContacts();
