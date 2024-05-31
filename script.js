document.getElementById('createIconButton').addEventListener('click', function() {
    const sessionId = document.getElementById('sessionId').value;
    const numberOfRuns = document.getElementById('numberOfRuns').value;
    const dogId = document.getElementById('dogId').value;
    const dateTime = new Date().toLocaleString();
    
    const iconSection = document.getElementById('iconSection');

    if (dogId) {
        fetchDogInfo(dogId).then(dogInfo => {
            const icon = createIcon(dogId, dogInfo);
            iconSection.appendChild(icon);
        });
    } else {
        alert('Please enter a Dog ID');
    }
});

function createIcon(dogId, dogInfo) {
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.textContent = `Dog ID: ${dogId}`;
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
        <p><strong>Dog ID:</strong> ${dogId}</p>
        <p><strong>Name:</strong> ${dogInfo.name}</p>
        <p><strong>Breed:</strong> ${dogInfo.breed}</p>
        <p><strong>Age:</strong> ${dogInfo.age}</p>
    `;
    icon.appendChild(infoDiv);

    return icon;
}

async function fetchDogInfo(dogId) {
    try {
        const response = await fetch(`http://localhost:3000/dogs/${dogId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dog info:', error);
        return { name: 'Unknown', breed: 'Unknown', age: 'Unknown' };
    }
}
