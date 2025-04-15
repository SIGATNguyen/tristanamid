// Script pour le guide Tristana Mid

document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight current section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Matchup details toggle
    const matchupHeaders = document.querySelectorAll('.matchup-detailed h4');
    
    matchupHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('expanded');
        });
    });
    
    // Tips hover effect
    const tipItems = document.querySelectorAll('.tip li');
    
    tipItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('highlight');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });
    
    // Tooltips for items
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const img = item.querySelector('img');
        const text = item.querySelector('span').textContent;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        
        item.appendChild(tooltip);
        
        item.addEventListener('mouseenter', function() {
            tooltip.style.display = 'block';
        });
        
        item.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
    
    // Add CSS for active nav and tooltips
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: var(--secondary-light);
            border-bottom: 2px solid var(--secondary);
        }
        
        .tip li.highlight {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 2px 5px;
            border-radius: 3px;
        }
        
        .tooltip {
            display: none;
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;
            z-index: 100;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
        }
        
        .item {
            position: relative;
        }
        
        .matchup-detailed {
            cursor: pointer;
        }
        
        .matchup-detailed ul {
            transition: max-height 0.3s ease-out;
            max-height: 1000px;
        }
        
        .matchup-detailed.expanded ul {
            max-height: 0;
            overflow: hidden;
        }
        
        .matchup-detailed h4::after {
            content: '▼';
            margin-left: 5px;
            font-size: 0.8em;
            transition: transform 0.3s;
        }
        
        .matchup-detailed.expanded h4::after {
            transform: rotate(180deg);
        }
    `;
    
    document.head.appendChild(style);
    
    // Ajouter une classe 'active' au premier lien de navigation par défaut
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Animation de fade-in pour les sections au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('fade-in');
    });
    
    // Ajout de CSS pour l'animation de fade-in
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(fadeStyle);
});

// Ajouter une fonction pour copier les builds dans le presse-papier
function copyBuild(buildName) {
    let buildText = '';
    
    if (buildName === 'standard') {
        buildText = 'Build standard Tristana Mid:\n';
        buildText += '- Starter: Doran\'s Blade + Potion\n';
        buildText += '- Core: Youmuu\'s Ghostblade > Kraken Slayer > Phantom Dancer\n';
        buildText += '- Situational: Infinity Edge, Bloodthirster, Lord Dominik\'s\n';
        buildText += '- Boots: Berserker\'s Greaves';
    } else if (buildName === 'burst') {
        buildText = 'Build Burst Tristana Mid:\n';
        buildText += '- Starter: Doran\'s Blade + Potion\n';
        buildText += '- Core: Youmuu\'s Ghostblade > Galeforce > Rapid Firecannon\n';
        buildText += '- Situational: Infinity Edge, Edge of Night, The Collector\n';
        buildText += '- Boots: Berserker\'s Greaves ou Ionian Boots';
    }
    
    // Créer un élément textarea temporaire pour copier le texte
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = buildText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    // Afficher une notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Build copié dans le presse-papier!';
    document.body.appendChild(notification);
    
    // Ajouter du style pour la notification
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        .copy-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary);
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeInOut 3s forwards;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            15% { opacity: 1; transform: translate(-50%, 0); }
            85% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    
    document.head.appendChild(notifStyle);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Ajouter des événements pour les boutons de copie (à ajouter au HTML si nécessaire)
document.addEventListener('DOMContentLoaded', function() {
    // Si des boutons de copie sont ajoutés au HTML
    const copyButtons = document.querySelectorAll('.copy-build-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buildType = this.getAttribute('data-build');
            copyBuild(buildType);
        });
    });
    
    // Rendre les items cliquables pour voir plus de détails
    const itemElements = document.querySelectorAll('.item');
    
    itemElements.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('span').textContent;
            showItemDetails(itemName);
        });
    });
    
    // Ajouter une fonctionnalité pour marquer les matchups comme "maîtrisés"
    const matchupElements = document.querySelectorAll('.matchup');
    
    matchupElements.forEach(matchup => {
        matchup.addEventListener('click', function() {
            this.classList.toggle('mastered');
            
            // Sauvegarder l'état dans localStorage
            const championName = this.querySelector('span').textContent;
            const mastered = this.classList.contains('mastered');
            
            // Récupérer les données existantes
            let masteredMatchups = JSON.parse(localStorage.getItem('masteredMatchups')) || {};
            
            // Mettre à jour les données
            masteredMatchups[championName] = mastered;
            
            // Sauvegarder les données
            localStorage.setItem('masteredMatchups', JSON.stringify(masteredMatchups));
        });
        
        // Charger l'état depuis localStorage
        const championName = matchup.querySelector('span').textContent;
        const masteredMatchups = JSON.parse(localStorage.getItem('masteredMatchups')) || {};
        
        if (masteredMatchups[championName]) {
            matchup.classList.add('mastered');
        }
    });
    
    // Ajouter du style pour les matchups maîtrisés
    const masteredStyle = document.createElement('style');
    masteredStyle.textContent = `
        .matchup.mastered {
            position: relative;
        }
        
        .matchup.mastered::after {
            content: '✓';
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: var(--easy);
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }
        
        .matchup.mastered img {
            border: 2px solid var(--easy);
        }
    `;
    
    document.head.appendChild(masteredStyle);
});

// Fonction pour afficher les détails d'un item
function showItemDetails(itemName) {
    // Définir les détails des items
    const itemDetails = {
        "Youmuu (1er)": {
            desc: "Fournit de la létalité et un boost de mouvement actif, crucial pour maximiser ton burst early/mid game.",
            stats: "Dégâts d'attaque, Létalité, CDR",
            cost: "2900 gold",
            when: "Comme premier item pour dominer la lane et roam efficacement"
        },
        "Kraken Slayer": {
            desc: "Fournit des dégâts réels sur chaque troisième attaque, excellent contre les tanks.",
            stats: "Dégâts d'attaque, Vitesse d'attaque, Critique",
            cost: "3400 gold",
            when: "Comme item mythique principal dans ton build crit standard"
        },
        "Galeforce": {
            desc: "Offre un dash supplémentaire et des dégâts d'exécution, maximisant ta mobilité.",
            stats: "Dégâts d'attaque, Vitesse d'attaque, Critique",
            cost: "3400 gold",
            when: "Contre des équipes avec beaucoup de skillshots ou pour plus de mobilité"
        },
        "Infinity Edge": {
            desc: "Amplifie considérablement tes dégâts critiques après avoir atteint 60% de chance de critique.",
            stats: "Dégâts d'attaque, Critique",
            cost: "3400 gold",
            when: "Comme 3ème ou 4ème item après avoir atteint 60% de crit chance"
        },
        "Phantom Dancer": {
            desc: "Offre une excellente vitesse d'attaque et mobilité, parfait pour stacker ton E rapidement.",
            stats: "Vitesse d'attaque, Critique, Mouvement",
            cost: "2600 gold",
            when: "Comme 2ème ou 3ème item pour maximiser ton DPS"
        },
        "Rapid Firecannon": {
            desc: "Augmente ta portée d'auto-attaque pour ton premier tir, idéal pour initier avec E à distance.",
            stats: "Vitesse d'attaque, Critique, Portée",
            cost: "2500 gold",
            when: "Excellent pour les builds burst ou contre des champions à courte portée"
        },
        "The Collector": {
            desc: "Exécute les ennemis sous 5% de vie et fournit de la létalité et des crits.",
            stats: "Dégâts d'attaque, Critique, Létalité",
            cost: "3000 gold",
            when: "Pour maximiser ton one-shot potential, surtout contre des cibles squishies"
        },
        "Lord Dominik's": {
            desc: "Offre une pénétration d'armure massive, essentielle contre les tanks.",
            stats: "Dégâts d'attaque, Critique, Pénétration d'armure",
            cost: "3000 gold",
            when: "Contre des équipes avec 2+ tanks ou champions construisant beaucoup d'armure"
        },
        "Bloodthirster": {
            desc: "Fournit du vol de vie et un bouclier pour la survie, crucial en late game.",
            stats: "Dégâts d'attaque, Critique, Vol de vie",
            cost: "3400 gold",
            when: "Pour la sustain en late game ou contre des équipes avec beaucoup de poke"
        },
        "Edge of Night": {
            desc: "Donne un bouclier anti-sort et de la létalité, excellent contre les mages.",
            stats: "Dégâts d'attaque, Vie, Létalité",
            cost: "2900 gold",
            when: "Contre des champions avec des CC cruciaux comme Malzahar, Lux, etc."
        }
    };
    
    // Vérifier si l'item existe dans notre base de données
    if (!itemDetails[itemName]) {
        console.log("Détails de l'item non disponibles pour: " + itemName);
        return;
    }
    
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'item-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'item-modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    const details = itemDetails[itemName];
    
    modalContent.innerHTML = `
        <h3>${itemName}</h3>
        <p><strong>Description:</strong> ${details.desc}</p>
        <p><strong>Stats:</strong> ${details.stats}</p>
        <p><strong>Coût:</strong> ${details.cost}</p>
        <p><strong>Quand l'acheter:</strong> ${details.when}</p>
    `;
    
    modalContent.prepend(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Ajouter du style pour la modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .item-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .item-modal-content {
            background-color: var(--card-bg);
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            width: 80%;
            position: relative;
            border: 2px solid var(--secondary);
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--secondary-light);
        }
        
        .close-modal:hover {
            color: var(--secondary);
        }
    `;
    
    document.head.appendChild(modalStyle);
    
    // Fermer la modal en cliquant en dehors du contenu
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
}