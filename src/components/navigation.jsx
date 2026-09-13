import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'
import hamburgerPlate from '../assets/hamburger-plate.svg'

export default function Navigation() {
    return (
        <nav>
            <NavLink to="/" className="logo">
                <img src={logoMark} alt="Logo" />
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/appstate">AppState</NavLink>
            <NavLink to="/portfolio" className="important">Portfolio</NavLink>
        </nav>
    )
}