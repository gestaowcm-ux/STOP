/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/users.js - Gestão de Perfis de Usuários e Permissões Operacionais
 */

const UsersManager = {
  STORAGE_KEY: 'stop_users_data',
  CURRENT_USER_KEY: 'stop_current_user_id',

  defaultUsers: [
    {
      id: 'USR-01',
      name: 'Juliana Santos',
      email: 'juliana.santos@stop-industria.com',
      role: 'gerente',
      roleTitle: 'Gerente Geral de Parada',
      initials: 'JS',
      crea: 'CREA/RJ 201812903',
      canApproveGates: true,
      canEditScope: true,
      canPostTurns: true
    },
    {
      id: 'USR-02',
      name: 'Carlos Alberto Silva',
      email: 'carlos.silva@stop-industria.com',
      role: 'admin',
      roleTitle: 'Administrador do Sistema / Diretor',
      initials: 'CS',
      crea: 'CREA/SP 199834120',
      canApproveGates: true,
      canEditScope: true,
      canPostTurns: true
    },
    {
      id: 'USR-03',
      name: 'Renata Lima',
      email: 'renata.lima@stop-industria.com',
      role: 'planejador',
      roleTitle: 'Coordenadora de Planejamento (PCM)',
      initials: 'RL',
      crea: 'CREA/MG 202058491',
      canApproveGates: false,
      canEditScope: true,
      canPostTurns: true
    },
    {
      id: 'USR-04',
      name: 'Marcos Souza',
      email: 'marcos.souza@stop-industria.com',
      role: 'supervisor',
      roleTitle: 'Supervisor de Campo / Execução',
      initials: 'MS',
      crea: 'CFT/RJ 201509382',
      canApproveGates: false,
      canEditScope: false,
      canPostTurns: true
    }
  ],

  getUsers() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Erro ao ler usuários do storage:', e);
    }
    this.saveUsers(this.defaultUsers);
    return this.defaultUsers;
  },

  saveUsers(users) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Erro ao salvar usuários:', e);
    }
  },

  getCurrentUser() {
    const users = this.getUsers();
    const currentId = localStorage.getItem(this.CURRENT_USER_KEY) || 'USR-01';
    const found = users.find(u => u.id === currentId);
    return found || users[0];
  },

  setCurrentUser(userId) {
    localStorage.setItem(this.CURRENT_USER_KEY, userId);
    if (window.App) {
      window.App.updateHeaderInfo();
      window.App.renderCurrentView();
      window.App.showToast(`Usuário ativo alterado para ${this.getCurrentUser().name} (${this.getCurrentUser().roleTitle})`, 'info');
    }
  },

  canCurrentApproveGate() {
    const user = this.getCurrentUser();
    return user && (user.role === 'admin' || user.role === 'gerente');
  }
};

window.UsersManager = UsersManager;
