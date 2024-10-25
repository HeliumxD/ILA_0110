document.addEventListener("DOMContentLoaded", function () {
    // Lade die JSON-Daten
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Über mich Abschnitt
            const aboutSection = document.querySelector('#about .content-block');
            aboutSection.innerHTML = `
                <h2>Über mich</h2>
                <p>${data.about.intro}</p>
                <p>${data.about.informatik}</p>
                <p>${data.about.interessen}</p>
            `;

            // Lebenslauf Abschnitt
            const schoolingTable = document.querySelector('#lebenslauf table:nth-of-type(1)');
            const hobbiesTable = document.querySelector('#lebenslauf table:nth-of-type(2)');
            const languagesTable = document.querySelector('#lebenslauf table:nth-of-type(3)');

            // Schulgang
            data.lebenslauf.schulgang.forEach(item => {
                schoolingTable.innerHTML += `<tr><td>${item.jahr}</td><td>&nbsp;&nbsp;${item.schule}</td></tr>`;
            });

            // Hobbys
            data.lebenslauf.hobbys.forEach(item => {
                hobbiesTable.innerHTML += `<tr><td>${item.jahr}</td><td>&nbsp;&nbsp;${item.hobby}</td></tr>`;
            });

            // Sprachen
            data.lebenslauf.sprachen.forEach(item => {
                languagesTable.innerHTML += `<tr><td>${item.sprache}</td><td>&nbsp;&nbsp;${item.level}</td></tr>`;
            });

            // Projekte Abschnitt
            const gallery = document.querySelector('.gallery');

            data.projekte.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';

                const link = document.createElement('a');
                link.href = project.link || '#'; // Verwendet den Link aus dem JSON oder setzt auf '#', falls nicht vorhanden
                link.target = '_blank'; // Öffne den Link in einem neuen Tab

                const img = document.createElement('img');
                img.src = project.img;
                img.alt = project.alt;

                const title = document.createElement('h4');
                title.textContent = project.titel;

                const description = document.createElement('p');
                description.textContent = project.beschreibung;

                link.appendChild(img); // Bild in den Link einbetten
                card.appendChild(link); // Link in die Karte einbetten
                card.appendChild(title);
                card.appendChild(description);

                gallery.appendChild(card);
            });

            // Kontakt Abschnitt
            const contactSection = document.querySelector('#contact .content-block');
            contactSection.innerHTML = `
                <h2>Kontakt</h2>
                <p>Email: <a href="mailto:${data.kontakt.email}">${data.kontakt.email}</a></p>
                <p>Telefon: ${data.kontakt.tel}</p>
            `;

            // Navigation
            const navLinks = document.querySelectorAll('nav ul li a');
            const pages = document.querySelectorAll('.page');

            navLinks.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);

                    // Setze alle Seiten auf inaktiv
                    pages.forEach(page => page.classList.remove('active'));

                    // Zeige die aktive Seite
                    document.getElementById(targetId).classList.add('active');
                });
            });

            // Zeige die Startseite (Über mich) beim ersten Laden an
            document.querySelector('#about').classList.add('active');
        })
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
});
