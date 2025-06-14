"use client";

import "./pricing.css"

export default function Pricing() {

    const tiers = [
    {
        name: "Essencial",
        id: "tier-basico",
        href: "#",
        priceMonthly: "Grátis",
        description: "Ideal para quem está começando e quer explorar as funcionalidades essenciais.",
        features: [
            "Acesso Abalos sísmicos em tempo real",
            "Abalos sísmicos dos últimos 30 dias",
            "Acesso ao Globo Sísmico",
        ],
        featured: false,
    },
    {
        name: "Premium",
        id: "tier-premium",
        href: "#", 
        priceMonthly: "R$ 19,90",
        description: "Aumente seu alcance com dados sísmicos detalhados ",
        features: [
            "Tudo no plano Essencial",
            "Dados sísmicos detalhados",
            "Notificações em tempo real",
        ],
        featured: true,
    },
];

    return (
        <div className="pricing-page">
            <div className="pricing-page-header">
                <h2 className="pricing-page-subtitle">Assinaturas</h2>
                <p className="pricing-page-title">
                    Escolha o plano ideal para você
                </p>
            </div>
            <p className="pricing-page-description">
                Alertas em tempo real, dados profissionais e monitoramento feito para você. Escolha seu plano e tenha o poder da informação sísmica em suas mãos.
            </p>
            <div className="pricing-page-grid">
                {tiers.map((tier, tierIdx) => (
                    <div
                        key={tier.id}
                        className={`pricing-tier ${
                            tier.featured ? "featured" : ""
                        } ${tierIdx === 0 ? "first" : "other"}`}
                    >
                        <h3
                            id={tier.id}
                            className={`pricing-tier-name ${
                                tier.featured ? "featured" : ""
                            }`}
                        >
                            {tier.name}
                        </h3>
                        <p className="pricing-tier-price">
                            <span
                                className={`pricing-tier-price-amount ${
                                    tier.featured ? "featured" : ""
                                }`}
                            >
                                {tier.priceMonthly}
                            </span>
                            <span
                                className={`pricing-tier-price-interval ${
                                    tier.featured ? "featured" : ""
                                }`}
                            >
                                
                            </span>
                        </p>
                        <p
                            className={`pricing-tier-description ${
                                tier.featured ? "featured" : ""
                            }`}
                        >
                            {tier.description}
                        </p>
                        <ul
                            role="list"
                            className={`pricing-tier-features ${
                                tier.featured ? "featured" : ""
                            }`}
                        >
                            {tier.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="pricing-tier-feature"
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={tier.href}
                            aria-describedby={tier.id}
                            className={`pricing-tier-button ${
                                tier.featured ? "featured" : ""
                            }`}
                        >
                            Get started today
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
 }