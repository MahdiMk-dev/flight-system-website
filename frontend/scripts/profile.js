const nameSpan = document.getElementById('name');
const emailSpan = document.getElementById('email');
const passwordSpan = document.getElementById('password');
const dobSpan = document.getElementById('dob');
const nationalitySpan = document.getElementById('nationality');
const passportSpan = document.getElementById('passport');
const phoneSpan = document.getElementById('phone');

const nameECSpan= document.getElementById('name-EC');
const emailECSpan = document.getElementById('email-EC');
const phoneECSpan = document.getElementById('phone-EC');
const relationECSpan = document.getElementById('relation-EC');

const bookingID1 = document.getElementById('booking-ID');
const bookingDate1 = document.getElementById('booking-Date');
const bookingStatus1 = document.getElementById('booking-Status');

const flightID = document.getElementById('flight-ID');
const flightStatus = document.getElementById('flight-Status');

const editPassBtn = document.getElementById('edit-P-btn');
const editECBtn = document.getElementById('edit-EC-btn');
const cancelButton = document.getElementById('cancel-btn');
////////////////////////////////////////////////////////////////////////


const editUserDetails= () => {

    const name = nameSpan.textContent;
    const email = emailSpan.textContent;
    const password = passwordSpan.textContent;
    const dob = dobSpan.textContent;
    let nationality = nationalitySpan.textContent;
    const passport = passportSpan.textContent;
    const phone = phoneSpan.textContent;

    nameSpan.innerHTML = `<input type="text" id="editName" value="${name}">`;
    emailSpan.innerHTML = `<input type="email" id="editEmail" value="${email}">`;
    passwordSpan.innerHTML = `<input type="password" id="editPassword" value="${password}">`;
    dobSpan.innerHTML = `<input type="date" id="editDob" value="${dob}">`;
    nationalitySpan.innerHTML = `
                                <select id="editNationality">
                                <option value="American">American</option>
                                <option value="British">British</option>
                                <option value="Canadian">Canadian</option>
                                </select>
                                `;
    passportSpan.innerHTML = `<input type="text" id="editPassport" value="${passport}">`;
    phoneSpan.innerHTML = `<input type="tel" id="editPhone" value="${phone}">`;

    nationality = document.getElementById('editNationality').value

}

editPassBtn.addEventListener("click", ()=> {
    editUserDetails()
    editPassBtn.textContent = 'Save';
})


const editECDetails= () => {

    const nameEC = nameECSpan.textContent;
    const emailEC = emailECSpan.textContent;
    const phoneEC = phoneECSpan.textContent;
    const relationEC = relationECSpan.textContent;


    nameECSpan.innerHTML = `<input type="text" id="editECName" value="${nameEC}">`;
    emailECSpan.innerHTML = `<input type="email" id="editECEmail" value="${emailEC}">`;
    phoneECSpan.innerHTML = `<input type="tel" id="editECPhone" value="${phoneEC}">`;
    relationECSpan.innerHTML = `<input type="text" id="editrelationEC" value="${relationEC}">`;

}

editECBtn.addEventListener("click", ()=> {
    editECDetails()
    editECBtn.textContent = 'Save';
})