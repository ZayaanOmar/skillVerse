import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css'; //importing css style file
const RoleSelection = () => {
    {/* Creating navigation to switch pages */}
    const navigate = useNavigate();
    return (
        <main className='role-selection'>
            <section className='role-body'>
                <p>Welcome to <em>SkillVerse</em>! We're excited to have you on board</p>
                <h1>Quick question, Are you a ... ?</h1>
                <section className='roles-container'>
                    <section className='client-description' onClick={() => navigate("/client/home")}>
                        <h2>Client</h2>
                        <p>A client is someone looking to hire a person</p>
                    </section>
                    <section className='freelancer-description' onClick={() => navigate("/freelancer/home")}>
                        <h2>Freelancer</h2>
                        <p>A freelancer is a person looking to be of service</p>
                    </section>
                </section>
            </section>
        </main>
    );
};

export default RoleSelection;