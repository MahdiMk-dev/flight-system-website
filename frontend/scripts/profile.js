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

const bookingID = document.getElementById('booking-ID');
const bookingDate = document.getElementById('booking-Date');
const bookingStatus = document.getElementById('booking-Status');

const flightID = document.getElementById('flight-ID');
const flightStatus = document.getElementById('flight-Status');

const editUserBtn = document.getElementById('edit-User-btn');
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

editUserBtn.addEventListener("click", ()=> {
    editUserDetails()
    editUserBtn.textContent = 'Save';
    editUserBtn.onclick = saveUserDetails;
})



function saveUserDetails() {

    const newName = document.getElementById('editName').value;
    const newEmail = document.getElementById('editEmail').value;
    const newPassword = document.getElementById('editPassword').value;
    const newDob = document.getElementById('editDob').value;
    const newNationality = document.getElementById('editNationality').value;
    const newPassport = document.getElementById('editPassport').value;
    const newPhone = document.getElementById('editPhone').value;
    
    
    document.getElementById('name').textContent = newName;
    document.getElementById('email').textContent = newEmail;
    document.getElementById('password').textContent = newPassword;
    document.getElementById('dob').textContent = newDob;
    document.getElementById('nationality').textContent = newNationality;
    document.getElementById('passport').textContent = newPassport;
    document.getElementById('phone').textContent = newPhone;
    

    editECBtn.addEventListener("click", ()=> {
        editECDetails()
        editECBtn.textContent = 'Edit';
    })

}


const editECDetails= () => {

    const nameEC = nameECSpan.textContent;
    const emailEC = emailECSpan.textContent;
    const phoneEC = phoneECSpan.textContent;
    const relationEC = relationECSpan.textContent;

    nameECSpan.innerHTML = `<input type="text" id="editECName" value="${nameEC}">`;
    emailECSpan.innerHTML = `<input type="email" id="editECEmail" value="${emailEC}">`;
    phoneECSpan.innerHTML = `<input type="tel" id="editECPhone" value="${phoneEC}">`;
    relationECSpan.innerHTML = `<input type="text" id="editECRelation" value="${relationEC}">`;

}

editECBtn.addEventListener("click", ()=> {
    editECDetails()
    editECBtn.textContent = 'Save';
    editECBtn.onclick = saveECDetails;
})

function saveECDetails() {

    const newECName = document.getElementById('editECName').value;
    const newECEmail = document.getElementById('editECEmail').value;
    const newECPhone = document.getElementById('editECPhone').value;
    const newECRelation = document.getElementById('editECRelation').value;

    
    document.getElementById('name-EC').textContent = newECName;
    document.getElementById('email-EC').textContent = newECEmail;
    document.getElementById('phone-EC').textContent = newECPhone;
    document.getElementById('relation-EC').textContent = newECRelation;

    editECBtn.addEventListener("click", ()=> {
        editECDetails()
        editECBtn.textContent = 'Edit';
    })
}
