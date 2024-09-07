

// Populate the datalist with country names
const countryList = document.getElementById('countryList');
data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.country;
    countryList.appendChild(option);
});

function fetchEmergencyData() {
    const countryInput = document.getElementById('countryInput').value.trim().toLowerCase();
    const countryData = data.find(item => item.country.toLowerCase() === countryInput);
    
    if (countryData) {
        document.getElementById('countryName').textContent = `${countryData.flag} ${countryData.country}`;
        const emergencyPhoneLink = `tel:${countryData.emergencyNumber.replace(/\D+/g, '')}`;
        document.getElementById('emergencyNumber').innerHTML = `<a href="${emergencyPhoneLink}" class="phone-link">${countryData.emergencyNumber}</a>`;
        document.getElementById('emergencyNotes').textContent = `${countryData.emergencyNotes}`;
        const ambulancePhoneLink = `tel:${countryData.ambulanceNumber.replace(/\D+/g, '')}`;
        document.getElementById('ambulanceNumber').innerHTML = `<a href="${ambulancePhoneLink}" class="phone-link">${countryData.ambulanceNumber}</a>`;
        document.getElementById('ambulanceNotes').textContent = countryData.ambulanceNotes;

        document.getElementById('ambulanceNotes').textContent = `${countryData.ambulanceNotes}`;
        const policePhoneLink = `tel:${countryData.policeNumber.replace(/\D+/g, '')}`;
        document.getElementById('policeNumber').innerHTML = `<a href="${policePhoneLink}" class="phone-link">${countryData.policeNumber}</a>`;
        document.getElementById('policeNotes').textContent = countryData.policeNotes;

        document.getElementById('policeNotes').textContent = `${countryData.policeNotes}`;
        const firefighterPhoneLink = `tel:${countryData.firefighterNumber.replace(/\D+/g, '')}`;
        document.getElementById('firefighterNumber').innerHTML = `<a href="${firefighterPhoneLink}" class="phone-link">${countryData.firefighterNumber}</a>`;
        document.getElementById('firefighterNotes').textContent = countryData.firefighterNotes;

        document.getElementById('firefighterNotes').textContent = `${countryData.firefighterNotes}`;
        document.getElementById('infoCard').style.display = 'block';

        // Clear previous helplines
        const helplinesSection = document.getElementById('helplines');
        helplinesSection.innerHTML = '';

        // Add helplines dynamically
        if (countryData.helplines && countryData.helplines.length > 0) {
            countryData.helplines.sort((a, b) => a.name.localeCompare(b.name));
            countryData.helplines.forEach(helpline => {

                const helplineDiv = document.createElement('div');
                helplineDiv.classList.add('helpline');

                let helplineContent = `<h4>📞 ${helpline.name}</h4>`;
                
                if (helpline.phone) {
                    const phoneLink = `tel:${helpline.phone.replace(/\s+/g, '')}`; // Remove spaces for the tel link
                    helplineContent += `<p class="emergency-number"><a href="${phoneLink}" class="phone-link">${helpline.phone}</a></p>`;
                }
                if (helpline.text) {
                    helplineContent += `<p><strong>Text:</strong> ${helpline.text}</p>`;
                }
                if (helpline.notes) {
                    helplineContent += `<p><em>${helpline.notes}</em></p>`;
                }

                helplineDiv.innerHTML = helplineContent;
                helplinesSection.appendChild(helplineDiv);
            });
        }

        document.getElementById('infoCard').style.display = 'block';

        // Save to localStorage
        localStorage.setItem('lastCountry', countryInput);
    } else {
        alert('Country not found. Please try again.');
    }
}

// Retrieve and display the last country on page load
window.onload = function() {
    const lastCountry = localStorage.getItem('lastCountry');

    if (lastCountry) {
        document.getElementById('countryInput').value = lastCountry;
        fetchEmergencyData();
    }
};

// Add event listener to the input field to listen for the Enter key
document.getElementById('countryInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchEmergencyData();
    }
});
