/* ==========================================================================
   1. GESTÃO DE ESTADO (STATE MANAGEMENT)
   Centraliza todas as variáveis de controle da aplicação.
   ========================================================================== */

const state = {
    currentPage: 'home',
    user: null,
    isMenuOpen: false,
    isLoginModalOpen: false,
    isRegisterMode: false
};

/* ==========================================================================
   2. INICIALIZAÇÃO DA APLICAÇÃO
   Configura o ponto de entrada assim que o DOM estiver pronto.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    setupEventListeners();
    navigateToPage('home');
});

/* ==========================================================================
   3. SERVIÇOS DE DADOS E PERSISTÊNCIA
   Lógica para lidar com armazenamento local (localStorage) e Sessão.
   ========================================================================== */

// Load user from localStorage
function loadUser() {
    const savedUser = localStorage.getItem('gameAchievementsUser');
    if (savedUser) {
        state.user = JSON.parse(savedUser);
        updateUserUI();
    }
}

/* ==========================================================================
   4. CONTROLADORES DE EVENTOS (EVENT LISTENERS)
   Mapeamento de todas as interações do usuário (Cliques, Submits).
   ========================================================================== */

function setupEventListeners() {
    // Menu toggle
    document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
    document.getElementById('menu-close').addEventListener('click', toggleMenu);
    document.getElementById('overlay').addEventListener('click', closeAll);
    
    // Login/Logout
    document.getElementById('login-btn').addEventListener('click', openLoginModal);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('modal-close').addEventListener('click', closeLoginModal);
    document.getElementById('toggle-auth').addEventListener('click', toggleAuthMode);
    document.getElementById('login-form').addEventListener('submit', handleAuth);
    
    // Navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            navigateToPage(page);
            closeMenu();
        });
    });
}

/* ==========================================================================
   5. LÓGICA DE INTERFACE (UI ACTIONS)
   Funções que manipulam classes CSS e visibilidade de elementos.
   ========================================================================== */

// --- Menu Functions ---
function toggleMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    document.getElementById('side-menu').classList.toggle('open', state.isMenuOpen);
    document.getElementById('overlay').classList.toggle('active', state.isMenuOpen);
}

function closeMenu() {
    state.isMenuOpen = false;
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

function closeAll() {
    closeMenu();
    closeLoginModal();
}

// --- Login Modal Functions ---
function openLoginModal() {
    state.isLoginModalOpen = true;
    document.getElementById('login-modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeLoginModal() {
    state.isLoginModalOpen = false;
    document.getElementById('login-modal').classList.remove('active');
    if (!state.isMenuOpen) {
        document.getElementById('overlay').classList.remove('active');
    }
}

function toggleAuthMode() {
    state.isRegisterMode = !state.isRegisterMode;
    const nameField = document.getElementById('name-field');
    const modalTitle = document.getElementById('modal-title');
    const submitText = document.getElementById('submit-text');
    const toggleBtn = document.getElementById('toggle-auth');
    
    if (state.isRegisterMode) {
        nameField.style.display = 'block';
        modalTitle.textContent = 'Criar Conta';
        submitText.textContent = 'Criar Conta';
        toggleBtn.textContent = 'Já tem uma conta? Faça login';
    } else {
        nameField.style.display = 'none';
        modalTitle.textContent = 'Login';
        submitText.textContent = 'Entrar';
        toggleBtn.textContent = 'Não tem conta? Cadastre-se';
    }
}

/* ==========================================================================
   6. SISTEMA DE AUTENTICAÇÃO
   Processamento de Login, Criação de Usuário e Logout.
   ========================================================================== */

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const name = document.getElementById('name-input').value || email.split('@')[0];
    
    // Create user
    state.user = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        achievements: []
    };
    
    // Save to localStorage
    localStorage.setItem('gameAchievementsUser', JSON.stringify(state.user));
    
    // Update UI
    updateUserUI();
    closeLoginModal();
    
    // Reset form
    document.getElementById('login-form').reset();
}

function logout() {
    state.user = null;
    localStorage.removeItem('gameAchievementsUser');
    updateUserUI();
}

function updateUserUI() {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    
    if (state.user) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = state.user.name;
    } else {
        loginBtn.style.display = 'inline-flex';
        userInfo.style.display = 'none';
    }
}

/* ==========================================================================
   7. MOTOR DE NAVEGAÇÃO (ROUTING)
   Gerencia a troca de páginas e redirecionamentos externos.
   ========================================================================== */

function navigateToPage(page) {
    state.currentPage = page;
    
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    
    // Render page
    const mainContent = document.getElementById('main-content');
    
    switch(page) {
        case 'home':
            renderHomePage(mainContent);
            break;
        case 'missions':
            renderMissionsPage(mainContent);
            break;
        case 'achievements':
            renderAchievementsPage(mainContent);
            break;
        case 'resident-evil':
            window.location.href = "./RE4/index.html";
            break;
        case 'god-of-war':
            window.location.href = "./GOW/IndexGOW.html";
            break;
        case 'cyberpunk-2077':
            window.location.href = "./CYBERPUNK/indexCP.html";
            break;
        default:
            renderHomePage(mainContent);
    }
}

/* ==========================================================================
   8. COMPONENTES DE RENDERIZAÇÃO (VIEWS)
   Funções que injetam o HTML dinâmico nas páginas.
   ========================================================================== */

// --- Home Page Component ---
function renderHomePage(container) {
    container.innerHTML = `
        <section class="hero-section">
            <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1695074185991-136f993ad998?w=1920&q=80');"></div>
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1 class="hero-title">Desbloqueie Seu Potencial</h1>
                <p class="hero-subtitle">Acompanhe conquistas, complete missões e domine seus jogos favoritos</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary btn-large" onclick="navigateToPage('missions')">
                        Explorar Missões
                    </button>
                    <button class="btn btn-outline btn-large" onclick="navigateToPage('achievements')">
                        Ver Conquistas
                    </button>
                </div>
            </div>
        </section>


        <section class="features-section">
            <div class="section-header">
                <h2 class="section-title">Como Funciona</h2>
                <p class="section-subtitle">Descubra todas as funcionalidades da plataforma</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon trophy"><i class="fas fa-trophy"></i></div>
                    <h3 class="feature-title">Conquistas</h3>
                    <p class="feature-description">Acompanhe todas as conquistas desbloqueadas em seus jogos favoritos</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon target"><i class="fas fa-crosshairs"></i></div>
                    <h3 class="feature-title">Missões</h3>
                    <p class="feature-description">Complete missões desafiadoras e ganhe recompensas exclusivas</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon users"><i class="fas fa-users"></i></div>
                    <h3 class="feature-title">Comunidade</h3>
                    <p class="feature-description">Compare seu progresso com outros jogadores ao redor do mundo</p>
                </div>
            </div>
        </section>

        <section class="games-section">
            <div class="section-header">
                <h2 class="section-title">Jogos Disponíveis</h2>
                <p class="section-subtitle">Explore conquistas e missões dos melhores jogos</p>
            </div>
            <div class="games-grid">
                <div class="game-card" onclick="navigateToPage('resident-evil')">
                    <div class="game-card-bg" style="background-image: url('./RE4/IMG/tema do site.jpg');"></div>
                    <div class="game-card-overlay red"></div>
                    <div class="game-card-content">
                        <span class="game-genre">Survival Horror</span>
                        <h3 class="game-title">Resident Evil</h3>
                        <button class="game-btn">Explorar</button>
                    </div>
                </div>
                <div class="game-card" onclick="navigateToPage('god-of-war')">
                    <div class="game-card-bg" style="background-image: url('./RE4/IMG/god.jpg');"></div>
                    <div class="game-card-overlay blue"></div>
                    <div class="game-card-content">
                        <span class="game-genre">Action Adventure</span>
                        <h3 class="game-title">God of War</h3>
                        <button class="game-btn">Explorar</button>
                    </div>
                </div>
                <div class="game-card" onclick="navigateToPage('cyberpunk-2077')">
                    <div class="game-card-bg" style="background-image: url('./RE4/IMG/2077.jpg');"></div>
                    <div class="game-card-overlay cyber"></div>
                    <div class="game-card-content">
                        <span class="game-genre">RPG Open World</span>
                        <h3 class="game-title">Cyberpunk 2077</h3>
                        <button class="game-btn">Explorar</button>
                    </div>
                </div>
            </div>
        </section>


        
${ '' /* ==========================================================================
   SEÇÃO CARDS PROMOÇÃO E LINKS LOJAS CARDS E JOGOS
   ========================================================================== */ }

        <section class="deals-section" style="padding: 40px 20px; max-width: 1400px; margin: 0 auto;">
            <div class="section-header">
                <h2 class="section-title" style="color: #10b981;"><i class="fas fa-percentage"></i> Ofertas Nuuvem</h2>
                <p class="section-subtitle">Os melhores preços com links de afiliado</p>
            </div>
            <div class="games-grid">
                
                <div class="game-card affiliate-card">
                    <div class="discount-badge">-15%</div>
                    <img src="https://evilhazard.com.br/wp-content/uploads/2025/12/Resident_Evil_Requiem_-_Key_Art_Horizontaljpeg.jpg" alt="RE4 Gold">
                    <div class="deal-content">
                        <h3 class="deal-name">Resident Evil 9 Requiem</h3>
                        <div class="price-container">
                            <span class="price-old">R$ 230,00</span>
                            <span class="price-current">R$ 195,50</span>
                        </div>
                        <a href="https://www.nuuvem.com/br-pt/item/resident-evil-4-gold-edition" target="_blank" class="btn-buy">
                            Comprar na Nuuvem <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>

                <div class="game-card affiliate-card">
                    <div class="discount-badge" style="background: #3b82f6;">-5%</div>
                    <img src="https://cdn.dlcompare.com/game_tetiere/upload/gamecardimage/file/playstation-network-card-50-euros-file-1489dbec.jpg.webp" alt="PSN Card">
                    <div class="deal-content">
                        <h3 class="deal-name">PlayStation Store R$ 100</h3>
                        <div class="price-container">
                            <span class="price-old">R$ 100,00</span>
                            <span class="price-current">R$ 95,00</span>
                        </div>
                        <a href="https://www.nuuvem.com/br-pt/item/playstation-store-card-100" target="_blank" class="btn-buy" style="background: #3b82f6;">
                            Comprar na Nuuvem <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>

                <div class="game-card affiliate-card">
                    <div class="discount-badge" style="background: #107c10;">OFF</div>
                    <img src="https://criticalhits.com.br/wp-content/uploads/2022/08/cfd88aaf-0093-49db-8a6f-a110fe92b768.jpg" alt="Xbox Card">
                    <div class="deal-content">
                        <h3 class="deal-name">Xbox R$ 50 Gift Card</h3>
                        <div class="price-container">
                            <span class="price-old">R$ 50,00</span>
                            <span class="price-current">R$ 47,50</span>
                        </div>
                        <a href="https://www.nuuvem.com/br-pt/item/xbox-gift-card-50" target="_blank" class="btn-buy" style="background: #107c10;">
                            Comprar na Nuuvem <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>

            </div>
        </section>

${ '' /* ==========================================================================
   SEÇÃO DE DADOS GERAIS DE NOSSOS USUARIOS, CONQUISTAS,JOGOS DISPONIVEIS, MISSÕES
   ========================================================================== */ }

        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-gamepad"></i></div>
                    <div class="stat-value">3</div>
                    <div class="stat-label">Jogos Disponíveis</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-trophy"></i></div>
                    <div class="stat-value">150+</div>
                    <div class="stat-label">Conquistas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="stat-value">50K+</div>
                    <div class="stat-label">Jogadores Ativos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-award"></i></div>
                    <div class="stat-value">500+</div>
                    <div class="stat-label">Missões</div>
                </div>
            </div>
        </section>
    `;
}

// --- Missions Page Component ---
function renderMissionsPage(container) {
    const missionsData = [
        {
            game: 'Resident Evil',
            color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            missions: [
                { title: 'Sobrevivente Iniciante', desc: 'Complete o jogo no modo Easy', progress: 75 },
                { title: 'Caçador de Zumbis', desc: 'Elimine 100 zumbis', progress: 45 },
                { title: 'Mestre da Sobrevivência', desc: 'Complete o jogo sem usar kits médicos', progress: 0 }
            ]
        },
        {
            game: 'God of War',
            color: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            missions: [
                { title: 'Guerreiro Nórdico', desc: 'Derrote 50 inimigos', progress: 100 },
                { title: 'Coletor de Runas', desc: 'Colete todas as runas em Midgard', progress: 60 },
                { title: 'Deus da Guerra', desc: 'Complete o jogo no modo God of War', progress: 20 }
            ]
        },
        {
            game: 'Cyberpunk 2077',
            color: 'linear-gradient(135deg, #eab308 0%, #ec4899 100%)',
            missions: [
                { title: 'Explorador de Night City', desc: 'Visite todos os distritos', progress: 85 },
                { title: 'Netrunner', desc: 'Hackeie 50 sistemas', progress: 30 },
                { title: 'Lenda de Night City', desc: 'Alcance Street Cred máximo', progress: 10 }
            ]
        }
    ];

    let html = `
        <div class="page-container">
            <div class="page-header">
                <div class="page-icon missions">
                    <i class="fas fa-crosshairs"></i>
                </div>
                <div>
                    <h1 class="page-title">Missões</h1>
                    <p class="page-subtitle">Complete desafios e ganhe recompensas</p>
                </div>
            </div>
    `;

    if (!state.user) {
        html += `
            <div style="padding: 24px; background: linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%); border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 12px; text-align: center; margin-bottom: 32px;">
                <p style="color: white;">Faça login para acompanhar seu progresso nas missões</p>
            </div>
        `;
    }

    missionsData.forEach(gameData => {
        html += `
            <div style="margin-bottom: 48px;">
                <h2 style="font-size: 1.75rem; margin-bottom: 24px;">${gameData.game}</h2>
                <div class="cards-grid">
        `;
        
        gameData.missions.forEach(mission => {
            html += `
                <div class="mission-card">
                    <div class="card-icon-wrapper" style="background: ${gameData.color};">
                        <i class="fas fa-crosshairs"></i>
                    </div>
                    <h3 class="card-title">${mission.title}</h3>
                    <p class="card-description">${mission.desc}</p>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.875rem;">
                            <span style="color: #9ca3af;">Progresso</span>
                            <span>${mission.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${mission.progress}%; background: ${gameData.color};"></div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div style="display: flex; align-items: center; gap: 8px; color: #eab308;">
                            <i class="fas fa-trophy"></i>
                            <span style="font-size: 0.875rem;">${mission.progress === 100 ? '100' : '50'} XP</span>
                        </div>
                        <button class="btn ${mission.progress === 100 ? 'btn-primary' : 'btn-outline'}" style="padding: 8px 16px; font-size: 0.875rem;">
                            ${mission.progress === 100 ? 'Completa' : 'Iniciar'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// --- Achievements Page Component ---
function renderAchievementsPage(container) {
    const achievementsData = [
        {
            game: 'Resident Evil',
            color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            achievements: [
                { title: 'Primeira Morte', desc: 'Elimine seu primeiro zumbi', unlocked: true, rarity: 'Comum' },
                { title: 'Sobrevivente', desc: 'Complete o jogo pela primeira vez', unlocked: true, rarity: 'Raro' },
                { title: 'Exterminador', desc: 'Elimine todos os chefes sem tomar dano', unlocked: false, rarity: 'Épico' }
            ]
        },
        {
            game: 'God of War',
            color: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            achievements: [
                { title: 'Pai e Filho', desc: 'Complete a primeira missão', unlocked: true, rarity: 'Comum' },
                { title: 'Caçador de Valquírias', desc: 'Derrote todas as Valquírias', unlocked: true, rarity: 'Épico' },
                { title: 'Verdadeiro Deus', desc: 'Derrote Sigrun no modo mais difícil', unlocked: false, rarity: 'Lendário' }
            ]
        },
        {
            game: 'Cyberpunk 2077',
            color: 'linear-gradient(135deg, #eab308 0%, #ec4899 100%)',
            achievements: [
                { title: 'Bem-vindo a Night City', desc: 'Complete o prólogo', unlocked: true, rarity: 'Comum' },
                { title: 'Street Cred 50', desc: 'Alcance Street Cred nível 50', unlocked: true, rarity: 'Raro' },
                { title: 'Lenda Viva', desc: 'Obtenha todos os finais possíveis', unlocked: false, rarity: 'Lendário' }
            ]
        }
    ];

    const totalAchievements = achievementsData.reduce((acc, game) => acc + game.achievements.length, 0);
    const unlockedAchievements = achievementsData.reduce((acc, game) => 
        acc + game.achievements.filter(a => a.unlocked).length, 0
    );
    const percentage = Math.round((unlockedAchievements / totalAchievements) * 100);

    let html = `
        <div class="page-container">
            <div class="page-header">
                <div class="page-icon achievements">
                    <i class="fas fa-trophy"></i>
                </div>
                <div>
                    <h1 class="page-title">Conquistas</h1>
                    <p class="page-subtitle">Suas conquistas desbloqueadas</p>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px; margin-bottom: 24px;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">${unlockedAchievements}</div>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Desbloqueadas</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">${totalAchievements}</div>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Total</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 8px;">${percentage}%</div>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Progresso</div>
                    </div>
                    <div style="text-align: center;">
                        <i class="fas fa-award" style="font-size: 2rem; color: #eab308; margin-bottom: 8px;"></i>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Nível ${Math.floor(percentage / 10)}</div>
                    </div>
                </div>
                <div class="progress-bar" style="height: 12px;">
                    <div class="progress-fill" style="width: ${percentage}%; background: linear-gradient(135deg, #eab308 0%, #f97316 100%);"></div>
                </div>
            </div>
    `;

    if (!state.user) {
        html += `
            <div style="padding: 24px; background: linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%); border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 12px; text-align: center; margin-bottom: 32px;">
                <p style="color: white;">Faça login para salvar suas conquistas</p>
            </div>
        `;
    }

    achievementsData.forEach(gameData => {
        html += `
            <div style="margin-bottom: 48px;">
                <h2 style="font-size: 1.75rem; margin-bottom: 24px;">${gameData.game}</h2>
                <div class="cards-grid">
        `;
        
        gameData.achievements.forEach(achievement => {
            const opacity = achievement.unlocked ? '1' : '0.6';
            html += `
                <div class="achievement-card" style="opacity: ${opacity};">
                    ${!achievement.unlocked ? '<div style="position: absolute; top: 16px; right: 16px;"><i class="fas fa-lock" style="color: #6b7280;"></i></div>' : ''}
                    <div class="card-icon-wrapper" style="background: ${achievement.unlocked ? gameData.color : 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'}; border: 2px solid ${achievement.unlocked ? 'rgba(255, 255, 255, 0.2)' : 'rgba(107, 114, 128, 0.5)'};">
                        ${achievement.unlocked ? '<i class="fas fa-trophy"></i>' : '<i class="fas fa-lock"></i>'}
                    </div>
                    <h3 class="card-title">${achievement.title}</h3>
                    <p class="card-description">${achievement.desc}</p>
                    <div class="card-footer">
                        <span style="font-size: 0.875rem; ${achievement.unlocked ? 'color: #3b82f6;' : 'color: #6b7280;'}">${achievement.rarity}</span>
                        <span style="font-size: 0.875rem; color: #9ca3af;">${achievement.unlocked ? '50' : '??'} pts</span>
                    </div>
                    ${achievement.unlocked ? `
                        <div style="position: absolute; top: -8px; right: -8px; width: 40px; height: 40px; border-radius: 50%; background: ${gameData.color}; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                            <i class="fas fa-trophy" style="font-size: 16px;"></i>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// --- Specific Game Page Component ---
function renderGamePage(container, gameId) {
    const games = {
        'resident-evil': {
            title: 'RESIDENT EVIL',
            genre: 'Survival Horror • Capcom',
            bg: './RE4/IMG/logo.jpg',
            color: 'red',
            gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            stats: { achievements: '2/6', progress: '33%', points: '60' }
        },
        'god-of-war': {
            title: 'GOD OF WAR',
            genre: 'Action Adventure • Santa Monica Studio',
            bg: 'https://images.unsplash.com/photo-1760954185909-772b3d386550?w=1920&q=80',
            color: 'blue',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            stats: { achievements: '2/6', progress: '33%', points: '160' }
        },
        'cyberpunk-2077': {
            title: 'CYBERPUNK 2077',
            genre: 'Open World RPG • CD Projekt Red',
            bg: 'https://images.unsplash.com/photo-1758404196311-70c62a445e9c?w=1920&q=80',
            color: 'cyber',
            gradient: 'linear-gradient(135deg, #eab308 0%, #ec4899 100%)',
            stats: { achievements: '2/6', progress: '33%', points: '90' }
        }
    };

    const game = games[gameId];

    container.innerHTML = `
        <div style="position: relative; height: 500px; overflow: hidden;">
            <img src="${game.bg}" alt="${game.title}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);"></div>
            <div style="position: relative; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding: 48px 24px;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                    <div style="width: 80px; height: 80px; border-radius: 16px; background: ${game.gradient}; display: flex; align-items: center; justify-content: center; border: 4px solid rgba(255, 255, 255, 0.2);">
                        <i class="fas ${game.color === 'red' ? 'fa-skull' : game.color === 'blue' ? 'fa-hammer' : 'fa-microchip'}" style="font-size: 36px;"></i>
                    </div>
                    <div>
                        <h1 style="font-size: clamp(2rem, 6vw, 3.5rem); margin-bottom: 8px; text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);">${game.title}</h1>
                        <p style="font-size: 1.125rem; color: #d1d5db;">${game.genre}</p>
                    </div>
                </div>
                <p style="max-width: 800px; font-size: 1.125rem; color: #d1d5db;">
                    ${gameId === 'resident-evil' ? 'Enfrente horrores inimagináveis e lute pela sobrevivência em um mundo dominado pelo terror' :
                      gameId === 'god-of-war' ? 'Uma jornada épica pela mitologia nórdica onde pai e filho enfrentam deuses e monstros' :
                      'Mergulhe em Night City, uma metrópole megalomaníaca obcecada por poder, glamour e modificações corporais'}
                </p>
            </div>
        </div>

        <div style="background: ${game.color === 'red' ? 'linear-gradient(90deg, rgba(127, 29, 29, 0.5) 0%, rgba(0, 0, 0, 1) 100%)' : 
                                    game.color === 'blue' ? 'linear-gradient(90deg, rgba(30, 58, 138, 0.5) 0%, rgba(0, 0, 0, 1) 100%)' :
                                    'linear-gradient(90deg, rgba(202, 138, 4, 0.3) 0%, rgba(219, 39, 119, 0.3) 50%, rgba(0, 0, 0, 1) 100%)'}; 
             border-top: 1px solid rgba(255, 255, 255, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding: 24px 0;">
            <div style="max-width: 1400px; margin: 0 auto; padding: 0 16px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; text-align: center;">
                    <div>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
                            <i class="fas fa-trophy" style="color: ${game.color === 'red' ? '#ef4444' : game.color === 'blue' ? '#3b82f6' : '#eab308'};"></i>
                            <span style="font-size: 1.5rem;">${game.stats.achievements}</span>
                        </div>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Conquistas</div>
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
                            <i class="fas fa-crosshairs" style="color: ${game.color === 'red' ? '#ef4444' : game.color === 'blue' ? '#3b82f6' : '#eab308'};"></i>
                            <span style="font-size: 1.5rem;">${game.stats.progress}</span>
                        </div>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Progresso</div>
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
                            <i class="fas fa-star" style="color: ${game.color === 'red' ? '#ef4444' : game.color === 'blue' ? '#3b82f6' : '#eab308'};"></i>
                            <span style="font-size: 1.5rem;">${game.stats.points}</span>
                        </div>
                        <div style="color: #9ca3af; font-size: 0.875rem;">Pontos</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-container">
            <div style="text-align: center; padding: 80px 20px; color: #9ca3af;">
                <i class="fas fa-gamepad" style="font-size: 64px; margin-bottom: 24px; opacity: 0.5;"></i>
                <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: white;">Página do Jogo</h2>
                <p>Conquistas, missões e rankings detalhados em breve!</p>
            </div>
        </div>
    `;
}