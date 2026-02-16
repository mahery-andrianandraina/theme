// ============================================
// 📊 GOOGLE SHEETS API INTEGRATION
// ============================================
// À ajouter AVANT la ligne "console.log('🚀 Améliorations"
// dans votre fichier HTML

// 🔧 CONFIGURATION - MODIFIEZ CES VALEURS APRÈS AVOIR SUIVI LE GUIDE
const GOOGLE_SHEETS_CONFIG = {
    apiKey: 'AIzaSyBITbhLW7s0UoFQtyJkUniObXmre62UCYw',              // ← Collez votre clé API Google
    spreadsheetId: '1BDcTW-OE7Ya-qDEnoZf4sY4dfYEI6PCRzwOpMP4lKsI',      // ← Collez votre Sheet ID
    sheetName: 'Feuille 1',                       // Nom de l'onglet
    enabled: true                            // ← Changez à true après configuration
};

// Cache local
let cachedLeaderboard = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 secondes

// ============================================
// FONCTIONS GOOGLE SHEETS
// ============================================

async function initGoogleSheets() {
    if (!GOOGLE_SHEETS_CONFIG.enabled) {
        console.log('💾 Mode Local - Google Sheets désactivé');
        return false;
    }

    if (GOOGLE_SHEETS_CONFIG.apiKey === 'AIzaSyBITbhLW7s0UoFQtyJkUniObXmre62UCYw') {
        console.warn('⚠️ Configuration Google Sheets manquante!');
        console.log('📖 Lisez GUIDE_GOOGLE_SHEETS.md pour configurer');
        return false;
    }

    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A1?key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
        const response = await fetch(url);
        
        if (response.ok) {
            console.log('✅ Connected to Google Sheets!');
            return true;
        } else {
            console.error('❌ Failed to connect:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return false;
    }
}

async function fetchLeaderboardFromSheets() {
    const now = Date.now();
    if (cachedLeaderboard.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedLeaderboard;
    }

    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:F?key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(response.status);
        
        const data = await response.json();
        const rows = data.values || [];
        
        const scores = rows.slice(1).map(row => ({
            name: row[1] || 'Anonyme',
            time: parseInt(row[2]) || 0,
            moves: parseInt(row[3]) || 0,
            score: parseInt(row[4]) || 0
        }));

        scores.sort((a, b) => a.time !== b.time ? a.time - b.time : a.moves - b.moves);

        const uniqueScores = [];
        const seenPlayers = new Set();
        
        for (const score of scores) {
            if (!seenPlayers.has(score.name.toLowerCase())) {
                uniqueScores.push(score);
                seenPlayers.add(score.name.toLowerCase());
            }
        }

        cachedLeaderboard = uniqueScores.slice(0, 10);
        lastFetchTime = now;
        console.log(`📊 Leaderboard loaded: ${cachedLeaderboard.length} scores`);
        return cachedLeaderboard;

    } catch (error) {
        console.error('❌ Error fetching:', error);
        return cachedLeaderboard;
    }
}

async function addScoreToSheets(name, time, moves) {
    try {
        const score = Math.max(0, 1000 - time * 2 - moves * 5);
        const timestamp = new Date().toISOString();
        const dateStr = new Date().toLocaleDateString('fr-FR');

        const values = [[timestamp, name, time, moves, score, dateStr]];

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:F:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ values })
        });

        if (!response.ok) throw new Error(response.status);

        console.log('✅ Score added to Google Sheets!');
        lastFetchTime = 0; // Invalider le cache
        return true;

    } catch (error) {
        console.error('❌ Error adding score:', error);
        return false;
    }
}

async function getPlayerRank(playerName, playerTime, playerMoves) {
    const leaderboard = await fetchLeaderboardFromSheets();
    const tempLeaderboard = [...leaderboard, {
        name: playerName,
        time: playerTime,
        moves: playerMoves
    }];

    tempLeaderboard.sort((a, b) => a.time !== b.time ? a.time - b.time : a.moves - b.moves);

    for (let i = 0; i < tempLeaderboard.length; i++) {
        const score = tempLeaderboard[i];
        if (score.name === playerName && score.time === playerTime && score.moves === playerMoves) {
            return i + 1;
        }
    }
    return tempLeaderboard.length;
}

async function isNewRecord(time, moves) {
    const leaderboard = await fetchLeaderboardFromSheets();
    if (leaderboard.length === 0) return true;
    const bestScore = leaderboard[0];
    return time < bestScore.time || (time === bestScore.time && moves < bestScore.moves);
}

// ============================================
// MODIFICATION DE submitName
// ============================================

// Sauvegarder la fonction originale
const originalSubmitName = typeof submitName !== 'undefined' ? submitName : null;

// Nouvelle fonction qui utilise Google Sheets si activé
submitName = async function(time, moves) {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim() || 'Anonyme';
    
    document.querySelector('.name-input-modal')?.remove();
    
    // Vérifier si Google Sheets est activé
    if (GOOGLE_SHEETS_CONFIG.enabled) {
        // Mode Google Sheets
        showLoader('💾 Sauvegarde en cours...');
        
        try {
            await addScoreToSheets(name, time, moves);
            const leaderboard = await fetchLeaderboardFromSheets();
            const rank = await getPlayerRank(name, time, moves);
            const isRecord = await isNewRecord(time, moves);
            
            // Sauvegarder aussi en local comme backup
            leaderboardData.analytics.totalSolves++;
            localStorage.setItem('puzzleAnalytics', JSON.stringify(leaderboardData.analytics));
            
            const stats = { time, moves, rank, totalSolves: leaderboardData.analytics.totalSolves };
            const newBadges = checkBadges(time, moves, rank);
            
            hideLoader();
            showLeaderboardWithSheets(leaderboard, rank, isRecord, newBadges, stats);
            
        } catch (error) {
            console.error('Error:', error);
            hideLoader();
            alert('❌ Erreur de connexion. Mode local activé.');
            
            // Fallback vers le mode local
            if (originalSubmitName) {
                originalSubmitName(time, moves);
            }
        }
    } else {
        // Mode local uniquement
        if (originalSubmitName) {
            originalSubmitName(time, moves);
        }
    }
};

function showLeaderboardWithSheets(leaderboard, currentRank, isRecord, newBadges, stats) {
    const modal = document.createElement('div');
    modal.className = 'leaderboard-modal active';
    
    let html = leaderboard.map((score, index) => {
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
        const isCurrent = rank === currentRank;
        
        return `
            <li class="leaderboard-item ${isCurrent ? 'current-player' : ''}">
                ${isCurrent && isRecord ? '<div class="new-record-badge">🎉 RECORD!</div>' : ''}
                <div class="leaderboard-rank rank-${rank}">${medal}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${score.name}</div>
                    <div class="leaderboard-stats">
                        ⏱️ ${Math.floor(score.time/60)}:${(score.time%60).toString().padStart(2,'0')} 
                        | 🔄 ${score.moves} mouvements
                    </div>
                </div>
                <div class="leaderboard-score">${score.score} pts</div>
            </li>
        `;
    }).join('');
    
    let badgesHtml = Object.values(BADGES).map(b => `
        <div class="badge ${leaderboardData.badges.includes(b.id) ? 'unlocked' : 'locked'}" title="${b.name}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
        </div>
    `).join('');
    
    const efficiency = Math.min(100, Math.max(0, 100 - stats.time/3 - stats.moves/2));
    const speed = stats.time < 60 ? '🔥 Incroyable' : stats.time < 120 ? '⚡ Rapide' : stats.time < 180 ? '✅ Bon' : '🐢 Moyen';
    
    modal.innerHTML = `
        <div class="leaderboard-content">
            <div class="leaderboard-header">
                <h2 class="leaderboard-title">🏆 Classement Global</h2>
                <p class="leaderboard-subtitle">🌐 Partagé avec toute l'équipe</p>
            </div>
            <ul class="leaderboard-list">${html}</ul>
            <div class="badges-container">
                <h3 class="badges-title">🏅 Tes Badges (${leaderboardData.badges.length}/${Object.keys(BADGES).length})</h3>
                <div class="badges-grid">${badgesHtml}</div>
            </div>
            <div class="analytics-panel">
                <h3 class="analytics-title">📊 Tes Stats</h3>
                <div class="analytics-grid">
                    <div class="analytics-item">
                        <div class="analytics-label">Efficacité</div>
                        <div class="analytics-value">${Math.round(efficiency)}%</div>
                        <div class="analytics-bar"><div class="analytics-bar-fill" style="width: ${efficiency}%"></div></div>
                    </div>
                    <div class="analytics-item">
                        <div class="analytics-label">Vitesse</div>
                        <div class="analytics-value">${speed}</div>
                    </div>
                    <div class="analytics-item">
                        <div class="analytics-label">Stratégie</div>
                        <div class="analytics-value">${stats.moves < 40 ? '🧠 Stratège' : stats.moves < 60 ? '🎯 Méthodique' : '🔄 Explorateur'}</div>
                    </div>
                    <div class="analytics-item">
                        <div class="analytics-label">Ton Rang</div>
                        <div class="analytics-value">#${currentRank}</div>
                    </div>
                </div>
            </div>
            <div class="share-card">
                <h3 class="share-title">📢 Partage ton score !</h3>
                <div class="share-buttons">
                    <button class="share-btn share-btn-copy" onclick="copyScore(${stats.time}, ${stats.moves}, ${currentRank})">📋 Copier</button>
                </div>
            </div>
            <button class="btn btn-primary" onclick="closeLeaderboard()" style="width: 100%; margin-top: 1rem;">✨ Fermer</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    if (isRecord) createConfetti();
}

function showLoader(message) {
    const loader = document.createElement('div');
    loader.id = 'api-loader';
    loader.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10002;">
            <div style="background: linear-gradient(135deg, #0A0E27, #1a1f3a); padding: 2rem; border-radius: 20px; border: 2px solid var(--secondary); text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem; animation: spin 1s linear infinite;">⏳</div>
                <div style="color: white; font-size: 1.2rem;">${message}</div>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoader() {
    document.getElementById('api-loader')?.remove();
}

// Auto-init
window.addEventListener('DOMContentLoaded', async () => {
    const isConnected = await initGoogleSheets();
    if (isConnected) {
        console.log('🌐 Mode: Google Sheets (Classement partagé)');
        await fetchLeaderboardFromSheets();
    } else {
        console.log('💾 Mode: Local Storage (Classement personnel)');
    }
});

console.log('📊 Google Sheets integration ready!');
