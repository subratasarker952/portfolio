import React from 'react'

const Footer = () => {
    return (
        <footer className="text-center py-6 text-sm text-gray-600 bg-gray-100">
            <div className="flex justify-center space-x-6 mb-2">
                <a href="https://github.com/subratasarker952" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">GitHub</a>
                <a href="https://linkedin.com/in/subratasarker952" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">LinkedIn</a>
                <a href="https://twitter.com/subratasarker952" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">Twitter</a>
                <a href="https://facebook.com/subratasarker952" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">Facebook</a>
            </div>
            &copy; {new Date().getFullYear()} Subrata Sarker. All rights reserved.
        </footer>
    )
}

export default Footer
