import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Layout padrão compartilhado entre todas as páginas da loja
function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
