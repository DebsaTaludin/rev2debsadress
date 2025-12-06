const dataContacts = [
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

function displayContacts() {
    for (const contact of dataContacts) {
        console.log(`
            🆔 : ${contact.id}
            🧑🏻 : ${contact.fullName}
            📱 : ${contact.phone}
            📍 : ${contact.location}
            ✉️ : ${contact.email}
            `);
    }
}

function getLastId() {
    function getId(dataContacts) {
        // STEP 1: Cek apakah dataContacts kosong?
        if (dataContacts.length === 0) {
            return 1; // Jika kosong, kembalikan ID 1 sebagai ID pertama
        }

        // STEP 2: Cari index (urutan) barang paling terakhir
        const indexTerakhir = dataContacts.length - 1;

        // STEP 3: Ambil objeck kontak yang paling terakhir
        const kontakTerakhir = dataContacts[indexTerakhir];

        // STEP 4: Ambil ID-nya, lalu tambah 1
        const idBaru = kontakTerakhir.id + 1;

        return idBaru;
    }
}

function addContact(fullName, phone, email, location) {
    dataContacts.push({
        id: getLastId(),
        fullName: fullName,
        phone: phone,
        email: email,
        location: location,
        });
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
    // console.log(filteredContacts);
}

function deleteContact() {
    // T0D0
}

function updateContact() {
    // T0D0
}

addContact("Rano Agustino", 6281234567890, "rano@example.com", "Jakarta");
addContact("Rano Agustini", 6281234567890, "rano@example.com", "Jakarta");
// displayContacts();
