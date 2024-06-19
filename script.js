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

    // BEGIN:VCARD
    // VERSION:3.0
    // N:last;first
    // FN:first last
    // ORG:
    // TITLE:
    // ADR:;;Lalitpur;Bhanu;;;Nepal
    // TEL;type=CELL:1234567890
    // TEL;type=WORK:
    // EMAIL;type=WORK:ach@gmail.com
    // URL:
    // END:VCARD

    const qr = qrcode(0, 'L');
    qr.addData(vCard);
    qr.make();
    const canvas = document.createElement('canvas');
    const size = 380;
    const borderSize = 10;
    canvas.width = size + borderSize * 2;
    canvas.height = size + borderSize * 2;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const tileSize = size / qr.getModuleCount();
    ctx.fillStyle = '#000000';
    for (let row = 0; row < qr.getModuleCount(); row++) {
        for (let col = 0; col < qr.getModuleCount(); col++) {
            ctx.fillStyle = qr.isDark(row, col) ? '#000000' : '#FFFFFF';
            ctx.fillRect(
                col * tileSize + borderSize,
                row * tileSize + borderSize,
                tileSize,
                tileSize
            );
        }
    }

// anything below this is for managing qr
    const qrCodeDiv = document.getElementById('qrcode');
    qrCodeDiv.innerHTML = '';
    qrCodeDiv.appendChild(canvas);
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.style.display = 'block';
    downloadBtn.onclick = function() {
        const fileName = prompt('Enter the file name for the QR code:');
        if (fileName) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${fileName}.png`;
            link.click();
        }
    };
});
