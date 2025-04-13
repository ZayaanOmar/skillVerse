import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css'; //importing css style file
const RoleSelection = () => {
    
    const navigate = useNavigate();
    return (
        <main className='role-selection'>
            <section className='role-body'>
                <p>Welcome to <em>SkillVerse</em>! We're excited to have you on board</p>
                <h1>Quick question, Are you a ... ?</h1>
                <section className='roles-container'>
                    <section className='client-description' onClick={() => navigate("/client/home")}>
                        <h2>Client</h2>
                        <p>Find your dream freelancer — fast, easy, and Wi-Fi ready</p>
                    </section>
                    <section className='freelancer-description'  onClick={() => navigate("/freelancer/home")}>
                        <h2>Freelancer</h2>
                        <p>Join the marketplace that gets you paid and praised</p>
                    </section>
                </section>
            </section>
        </main>
    );
};

export default RoleSelection;