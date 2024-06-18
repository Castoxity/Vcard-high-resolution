document.getElementById('vcard-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fname = document.getElementById('firstname').value;
    const lname = document.getElementById('lastname').value;
    const position = document.getElementById('position').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const company = document.getElementById('company').value;
    const personalphone = document.getElementById('personalphone').value;
    const workphone = document.getElementById('workphone').value;
    const email1 = document.getElementById('email-1').value;
    const email2 = document.getElementById('email-2').value;
    const website = document.getElementById('website').value;
    const vCard = `
BEGIN:VCARD
VERSION:3.0
N:${lname};${fname}
FN:${fname} ${lname}
ORG:${company}
TITLE:${position}
TEL;type=CELL:${personalphone}
ADR:;;${street};${city};;;${state}
TEL;type=WORK:${workphone}
EMAIL;type=WORK:${email2}
EMAIL;type=HOME:${email1}
URL:${website}
END:VCARD
    `.trim();
    const qrCodeDiv = document.getElementById('qrcode');
    qrCodeDiv.innerHTML = '';
    const qr = qrcode(0, 'L');
    qr.addData(vCard);
    qr.make();
    qrCodeDiv.innerHTML = qr.createImgTag();
});
