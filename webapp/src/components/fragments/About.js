import React from 'react';
import { useTranslation } from "react-i18next";
import '../../custom.css';

function About() {    
    const t = useTranslation("global").t;

    const imageNames = ["person1.jpg", "person2.jpg", "person3.jpg", "person4.jpg", "person5.jpg", "person6.jpg"];

    return (
        <div>
            <h1>{t("about.hello")}</h1>
            <h2>{t("about.team")}</h2>
            <ul className="person-list">
                {imageNames.map((imageName, index) => (
                    <li key={index} className="person-item">
                        <img src={`/${imageName}`} alt={`Person ${index + 1}`} className="person-image" />
                        {t(`about.name${index + 1}`)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default About;
