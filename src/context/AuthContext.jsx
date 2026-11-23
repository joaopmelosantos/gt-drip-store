import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'drip_store_users';
const CURRENT_USER_KEY = 'drip_store_current_user';
const ORDERS_KEY = 'drip_store_orders';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignora caso localStorage esteja bloqueado
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(CURRENT_USER_KEY, null));
  const [orders, setOrders] = useState(() => readJson(ORDERS_KEY, []));
  const [lastOrder, setLastOrder] = useState(null);

  function registerUser(userData) {
    const users = readJson(USERS_KEY, []);
    const emailLower = String(userData.email || '').trim().toLowerCase();

    const exists = users.some(
      (item) => item.email.toLowerCase() === emailLower
    );

    if (exists) {
      return { ok: false, error: 'Já existe uma conta cadastrada com este e-mail.' };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      cpf: userData.cpf.trim(),
      email: emailLower,
      phone: userData.phone.trim(),
      address: userData.address.trim(),
      neighborhood: userData.neighborhood.trim(),
      city: userData.city.trim(),
      cep: userData.cep.trim(),
      complement: (userData.complement || '').trim(),
      password: userData.password,
      newsletter: Boolean(userData.newsletter),
    };

    const nextUsers = [...users, newUser];
    saveJson(USERS_KEY, nextUsers);
    saveJson(CURRENT_USER_KEY, newUser);
    setUser(newUser);

    return { ok: true, user: newUser };
  }

  function login(emailOrLogin, password) {
    const users = readJson(USERS_KEY, []);
    const target = String(emailOrLogin || '').trim().toLowerCase();

    const found = users.find(
      (item) =>
        item.email.toLowerCase() === target ||
        item.name.toLowerCase() === target
    );

    if (!found) {
      return {
        ok: false,
        error: 'Usuário não encontrado. Crie sua conta primeiro.',
      };
    }

    if (found.password !== password) {
      return { ok: false, error: 'Senha incorreta.' };
    }

    saveJson(CURRENT_USER_KEY, found);
    setUser(found);
    return { ok: true, user: found };
  }

  function loginSocialDemo(provider) {
    const emailLower = `cliente.${provider.toLowerCase()}@dripstore.com`;
    const users = readJson(USERS_KEY, []);
    let account = users.find((item) => item.email.toLowerCase() === emailLower);

    if (!account) {
      account = {
        id: Date.now(),
        name: 'Francisco Antonio Pereira',
        cpf: '123.485.913-35',
        email: emailLower,
        phone: '(85) 5555-5555',
        address: 'Rua João Pessoa, 333',
        neighborhood: 'Centro',
        city: 'Fortaleza, Ceará',
        cep: '43388-000',
        complement: '',
        password: 'social-login',
        newsletter: true,
      };
      saveJson(USERS_KEY, [...users, account]);
    }

    saveJson(CURRENT_USER_KEY, account);
    setUser(account);
    return { ok: true, user: account };
  }

  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }

  function updateProfile(updatedFields) {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    const users = readJson(USERS_KEY, []);
    const nextUsers = users.map((item) =>
      item.id === user.id ? updatedUser : item
    );

    saveJson(USERS_KEY, nextUsers);
    saveJson(CURRENT_USER_KEY, updatedUser);
    setUser(updatedUser);
  }

  function createOrder(orderDetails) {
    const newOrder = {
      id: `DS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'Produto em trânsito',
      userEmail: user ? user.email : orderDetails.customer.email,
      ...orderDetails,
    };

    const nextOrders = [newOrder, ...orders];
    saveJson(ORDERS_KEY, nextOrders);
    setOrders(nextOrders);
    setLastOrder(newOrder);
    return newOrder;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        lastOrder,
        registerUser,
        login,
        loginSocialDemo,
        logout,
        updateProfile,
        createOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
