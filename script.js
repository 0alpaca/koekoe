document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const randomButton = document.getElementById('randomButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            randomButton.disabled = !Array.from(checkboxes).some(cb => cb.checked);
        });
    });

    randomButton.addEventListener('click', async () => {
        const selectedValues = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        while (true) {
            const randomId = Math.floor(Math.random() * 617414) + 1;
            const response = await fetch(`https://koe-koe.com/detail.php?n=${randomId}`);
            if (response.status === 404) continue;

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const imgSrc = doc.querySelector("#text > div.icon.addition > img")?.src;
            
            if (selectedValues.includes(imgSrc)) {
                const audioSrc = doc.querySelector("#voice-inner > p > audio > source")?.src;
                if (audioSrc) {
                    audioSource.src = `https:${audioSrc}`;
                    audioPlayer.load();
                    audioPlayer.play();
                    break;
                }
            }
        }
    });
});