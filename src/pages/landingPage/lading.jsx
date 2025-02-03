import React from 'react';
import styles from './lading.module.css';
import Navbar from '../../components/navegacao/navBar';

const LandingPage = () => {
  return (
    <div className={styles.landing_page}>
      {/* Seção de Header */}
       <Navbar />
     

      {/* Seção Hero (Introdução) */}
      <section className={styles.hero} id="home">
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>Descubra os Melhores Pontos Turísticos do Brasil</h1>
          <p className={styles.hero_description}>Explore destinos incríveis com informações detalhadas sobre locais, cidades e estados. Cadastre e busque pontos turísticos de forma fácil e rápida.</p>
          <a href="/home" className={styles.cta_button}>Pontos Turisticos</a>
        </div>
      </section>

      {/* Seção Funcionalidades */}
      <section className={styles.features} id="features">
        <h2 className={styles.features_title}>Funcionalidades do Sistema</h2>
        <div className={styles.features_list}>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>Cadastro Simples</h3>
            <p className={styles.feature_description}>Cadastre pontos turísticos com nome, descrição e localização de forma simples e rápida.</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>Busca Avançada</h3>
            <p className={styles.feature_description}>Encontre pontos turísticos pelo nome, descrição ou localização com nossa busca intuitiva.</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>Listagem Paginada</h3>
            <p className={styles.feature_description}>Visualize os pontos turísticos de maneira organizada com paginação e filtros.</p>
          </div>
        </div>
      </section>

      {/* Seção de Contato
      <section className={styles.contact} id="contact">
        <h2 className={styles.contact_title}>Entre em Contato</h2>
        <p className={styles.contact_description}>Se tiver alguma dúvida ou sugestão, entre em contato conosco!</p>
        <a href="mailto:contato@minhaempresa.com" className={styles.cta_button}>Enviar Email</a>
      </section> */}

      {/* Rodapé */}
      <footer className={styles.footer}>
        <p className={styles.footer_text}>&copy; 2025 BrasilTour. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
