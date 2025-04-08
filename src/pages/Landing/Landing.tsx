import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import './index.css'


const StarRating = () => {

    return (
        <div>{
            Array.from({ length: 5 }, (_, index) => (
                <span 
                    key={index} style={{ color: 'var(--main-bg-green)' }} 
                    className='fa-solid fa-star'></span>
            ))}
        </div>
    );
}

export const LandingPage = () => {

    const navigate = useNavigate()

    interface Plan {
        name: string
        price?: string
        description: string
        features: string[]
    }

    interface Sections {
        title: string,
        options: string[]
    }

    const PlanPrices: Plan[] = [
        {
            name: 'Free',
            description: 'Perfect for individuals and small projects.',
            features: ['Up to 1 project', 'Basic analytics', '24-hour support', '1GB storage']
        },
        {
            name: 'Starter',
            price: '$2.49',
            description: 'Ideal for growing teams and businesses.',
            features: [
                'Up to 5 projects', 'Advanced analytics', 'Priority support', '10GB storage', 'Custom integrations'
            ]
        },
        {
            name: 'Professional',
            description: 'For large organizations with complex needs.',
            price: '$6.49',
            features: [
                'Unlimited everything', 'Advanced analytics', 'Dedicated account manager', '24/7 phone support',
                'Custom development'
            ]
        }
    ]

    const FooterSections: Sections[] = [
        {
            title: 'Product',
            options: ['Features', 'Prices', 'Integrations', 'Changelog']
        },
        {
            title: 'Resources',
            options: ['Documentation', 'Guides', 'Support', 'API']
        },
        {
            title: 'Company',
            options: ['About', 'Blog', 'Careers', 'Press']
        },
        {
            title: 'Contact',
            options: ['hello@minimal.com', '123 Market St, San Francisco']
        }
    ]

    return (
        <div className='land-index'>
            <div className='land-navbar'>
                <div className='land-nav-logo'>
                    Mind
                    <i className="fa-solid fa-money-bill-wave" />
                    Money
                </div>
                <div>.</div>
                <div><Button handleClick={() => navigate('/login')} label="Get Started" /></div>
            </div>

            <section className='land-hero'>
                <div className="land-box">
                    <h1>A minimal solution for your maximum potential</h1>
                    <h2>Streamline your workflow with our intuitive platform designed for modern teams.</h2>
                    <div className='land-box-buttons'>
                        <Button label='Start for free' />
                        <Button label='Learn more' variant='outlined' />
                    </div>
                </div>
                <div className='land-image'>

                    {/* 
                        <div
                        style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',
                        }}
                    />
                    */}
                </div>
            </section>
            <section className='land-features'>
                <h2>Designed for the way you work</h2>
                <h3>Our platform offers powerful features that help you accomplish more with less effort.</h3>
                <div className='land-row'>
                    <div className='land-card'>
                        <i className='land-card-icon fa-solid fa-bolt' />
                        <div className='land-card-title'>
                            Lightning Fast
                        </div>
                        <p>Experience unparalleled speed with our optimized platform,
                            designed to save you time and boost productivity.</p>
                    </div>
                    <div className='land-card'>
                        <i className='land-card-icon fa-solid fa-shield' />
                        <div className='land-card-title'>
                            Secure by Default
                        </div>
                        <p>Experience unparalleled speed with our optimized platform,
                            designed to save you time and boost productivity.</p>
                    </div>
                    <div className='land-card'>
                        <i className='land-card-icon fa-solid fa-circle-check' />
                        <div className='land-card-title'>
                            Effortless Integration
                        </div>
                        <p>Experience unparalleled speed with our optimized platform,
                            designed to save you time and boost productivity.</p>
                    </div>
                </div>
            </section>
            <section className='land-features bg-yellow'>
                <h2>Loved by teams worldwide</h2>
                <h3>Don't just take our word for it — hear what our customers have to say.</h3>
                <div className='land-row'>
                    <div className='land-card'>
                        <StarRating />
                        <p>"This platform has completely transformed how our team collaborates.
                            We've seen a 40% increase in productivity since implementing it."</p>
                        <div style={{ fontSize: 15 }} >
                            <b style={{ fontSize: 15 }}>Sarah Johnson</b><br></br>
                            Product Manager at TechCorp
                        </div>
                    </div>
                    <div className='land-card'>
                        <StarRating />
                        <p>"The intuitive interface and powerful features make this the perfect solution for our growing team.
                            Customer support has been exceptional."</p>
                        <div style={{ fontSize: 15 }} >
                            <b style={{ fontSize: 15 }}>Michael Chen</b><br></br>
                            CTO at StartupX
                        </div>
                    </div>
                </div>
            </section>
            <section className='land-features'>
                <h2>Simple, transparent pricing</h2>
                <h3>Choose the plan that's right for you and start
                    your 14-day free trial today.</h3>
                <div className='land-row'>
                    {PlanPrices.map((plan, index) => (
                        <div className='land-card' key={index}>
                            <div className='land-card-big-title'>{plan.name}</div>
                            {plan.price && <div>
                                <b>{`${plan.price}`}</b> /month
                            </div>}
                            <p style={{ color: '#aaa', fontSize: 14 }}>{plan.description}</p>
                            <div className='land-card-features'>
                                {plan.features.map((feature, indexFeature) => (
                                    <div className='price-feature' key={indexFeature}>
                                        <i className="fa-regular fa-circle-check" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <Button label='Start free trial' variant='outlined' />
                        </div>
                    ))}
                </div>
            </section>
            <section className='land-footer'>
                <div className='land-footer-options'>
                    {FooterSections.map((section, index) => (
                        <div className='land-footer-item' key={index}>
                            <span className='land-footer-title'>{section.title}</span>
                            {section.options.map((option, indexSection) => (
                                <span className='land-footer-option' key={indexSection}>{option}</span>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='land-footer-cookies'>
                    <div>© 2025 Minimal. All rights reserved.</div>
                    <div className='land-footer-cookies-right'>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookies</span>
                    </div>
                </div>
            </section>
        </div>
    )
}