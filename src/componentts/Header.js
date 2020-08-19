import React from 'react'

const Header = ({ selectedCategory }) => {
    return (
        <>
            <h1>Hangman</h1>
            <p>Find the hidden word - enter a letter</p>
            <p>{`Category: ${selectedCategory}`}</p>
        </>
    )
}

export default Header;
