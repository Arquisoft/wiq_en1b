import React from 'react';
import '../../custom.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Footer() {
    const [t, i18n] = useTranslation("global");

    return (
        <footer className="footer-container">
            <div></div>
                <a href="http://wiqen1b.serveminecraft.net:8000/api-doc/" className="API" target="_blank" rel="noopener noreferrer">
                    <p className='link-text'>{t("footer.API")}</p>
                </a>
                  
                    <Link to="/about" className="about">
                        <p className='link-text'>{t("footer.about")}</p>
                    </Link>
                    
                    <a href="https://arquisoft.github.io/wiq_en1b/" className="ARC" target="_blank" rel="noopener noreferrer">
                        <p className='link-text'>{t("footer.ARC")}</p>
                     </a>
                     <div></div>

        </footer>
    );
}

export default Footer;
